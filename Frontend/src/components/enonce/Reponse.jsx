import React, {useState} from "react";
import {Button, Input, makeStyles, MenuItem, Select} from "@material-ui/core";
import PropagateLoader from "react-spinners/PropagateLoader";
import ChoixUnite from '../unite/ChoixUnite'
import SlideBar from './SlideBarMarge'

import { useSelector, useDispatch } from "react-redux";
import { handleChangeCat, handleChangeForm, handleChangeUnite} from '../../slice/EnoncesSlice'
import { selectActualiseFormule, selectFormule } from "../../slice/FormulesSlice";

export default function Reponse (props) {

    const useStyles = makeStyles((theme) => ({
        divReponse: {
            marginTop : 10,
            display : "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "0 1%",
            border : "solid 1px",
            borderColor : theme.palette.primary.light,
            borderRadius : 3,
            padding : "1%"
        },
        select: {
            width : 200,
            maxHeight : "38px !important",
            top : 26
        },
        divUniteMarge: {
            height : 40,
            position : "relative",
            bottom : 10,
            margin : "auto",
            gridColumn: 3
        },
        affichageUnite: {
            textAlign : "center",
            position : "relative",
            bottom : 10
        },
        divMarge: {
            gridColumn: 4
        },
        buttonAjouterUnite: {
            maxWidth: "350px",
            maxHeight: "36px",
            display : "block",
            backgroundColor: theme.palette.primary.light
        }
    }));
    const classes = useStyles();

    const catForm = useSelector(selectFormule);
    const actualise = useSelector(selectActualiseFormule);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    return (
        <div key={props.indexReponse} className={classes.divReponse}>
                <Select className={classes.select} value={props.element.selectCat} onChange={e => dispatch(handleChangeCat({idQuestion : props.indexQuestion, idReponse : props.indexReponse, value : e.target.value}))} input={<Input/>}>
                    {!actualise ? <PropagateLoader size={15} color={"rgb(7, 91, 114)"} css={{margin : "30px auto", display : "flex", justifyContent : "center"}}/> :
                        catForm.map((item, index) => <MenuItem key={index} value={index}>{item.nom}</MenuItem>)}
                </Select>
                {props.element.selectCat === "" ? null 
                :<>
                    <Select className={classes.select} value={props.element.selectForm} onChange={e =>dispatch(handleChangeForm({idQuestion : props.indexQuestion, idReponse : props.indexReponse, value : e.target.value}))} input={<Input/>}>
                        {catForm[props.element.selectCat].tabFormule.map((item, index) => <MenuItem key={index} value={item.nomFormule}>{item.nomFormule}</MenuItem>)}
                    </Select>
                </>
            }
            <div className={classes.divUniteMarge}>
                <Button variant="contained" className={classes.buttonAjouterUnite} onClick={() => setOpen(true)}>Choisir les unités</Button>
                <p className={classes.affichageUnite}>Affichage unité</p>
            </div>
            <ChoixUnite open={open} handleClose={() => setOpen(false)} unite={props.element.unite} setTabUnite={e => dispatch(handleChangeUnite({idQuestion : props.indexQuestion, idReponse : props.indexReponse, tabUnite : e}))}/>
            <div className={classes.divMarge}>
                <SlideBar key={props.indexReponse} indexQuestion={props.indexQuestion} indexReponse={props.indexReponse}/>
            </div>
        </div>
    );
}
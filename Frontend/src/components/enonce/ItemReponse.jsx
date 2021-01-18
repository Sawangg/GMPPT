import React, {useCallback, useState} from "react";
import {Button, Input, makeStyles, MenuItem, Select} from "@material-ui/core";
import PropagateLoader from "react-spinners/PropagateLoader";

import {afficherUnites} from '../unite/UniteFunctions';
import ChoixUnite from '../unite/ChoixUnite'
import SlideBar from './SlideBarMarge'

import { useSelector, useDispatch } from "react-redux";
import { handleChangeCat, handleChangeForm, handleChangeUnite, selectReponse} from '../../slice/EnoncesSlice'
import { selectActualiseFormule, selectCategorieFormule } from "../../slice/FormulesSlice";

const Reponse = ({indexReponse, indexQuestion}) => {

    const useStyles = makeStyles((theme) => ({
        divReponse: {
            marginTop : 20,
            display : "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "0 1%",
            border : "solid 1px",
            borderColor : theme.palette.primary.light,
            borderRadius : 3,
            padding : "2% 1% 2% 2%"
        },
        select: {
            width : 200,
            maxHeight : "38px !important",
            top : 26
        },
        divUniteMarge: {
            height : 40,
            position : "relative",
            margin : "auto",
            gridColumn: 3,
            marginLeft : "15%"
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
            display : "block",
            backgroundColor: theme.palette.primary.light
        }
    }));
    const classes = useStyles();

    const actualise = useSelector(selectActualiseFormule);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const element = useSelector(selectReponse(indexQuestion, indexReponse));
    const tabCatForm = useSelector(selectCategorieFormule);

    const changeCat = useCallback ((e) => {
        dispatch(handleChangeCat({idQuestion : indexQuestion, idReponse : indexReponse, value : e.target.value, formule1 : tabCatForm[e.target.value].tabFormule[0].nomFormule}))
    }, [dispatch, indexQuestion, indexReponse, tabCatForm]);

    const changeForm = useCallback ((e) => {
        dispatch(handleChangeForm({idQuestion : indexQuestion, idReponse : indexReponse, value : e.target.value}))
    }, [dispatch, indexQuestion, indexReponse]);

    return (
        <div key={indexReponse} className={classes.divReponse}>
            <Select className={classes.select} value={element.selectCat} onChange={e => changeCat(e)} input={<Input/>}>
                    {!actualise ? <PropagateLoader size={15} color={"rgb(7, 91, 114)"} css={{margin : "30px auto", display : "flex", justifyContent : "center"}}/> 
                    : tabCatForm.map((item, index) => <MenuItem key={index} value={index}>{item.nom}</MenuItem>)}
            </Select>
            <Select className={classes.select} value={element.selectForm} onChange={e => changeForm(e)} input={<Input/>}>
                {tabCatForm[element.selectCat] === undefined ? null : tabCatForm[element.selectCat].tabFormule.map((item, index) => <MenuItem key={index} value={item.nomFormule}>{item.nomFormule}</MenuItem>)} 
            </Select>
            <div className={classes.divUniteMarge}>
                <Button variant="contained" className={classes.buttonAjouterUnite} onClick={() => setOpen(true)}>Choisir les unités</Button>
                <p style={{textAlign : "center"}}>{afficherUnites(element.unite)}</p>
            </div>
            <ChoixUnite open={open} handleClose={() => setOpen(false)} unite={element.unite} setTabUnite={e => dispatch(handleChangeUnite({idQuestion : indexQuestion, idReponse : indexReponse, tabUnite : e}))}/>
            <div className={classes.divMarge}>
                <SlideBar key={indexReponse} indexQuestion={indexQuestion} indexReponse={indexReponse}/>
            </div>
        </div>
    );
}

export default React.memo(Reponse);
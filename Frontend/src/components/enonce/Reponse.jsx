import React, {useState} from "react";
import { Button, Input, MenuItem, Select } from "@material-ui/core";
import PropagateLoader from "react-spinners/PropagateLoader";
import ChoixUnite from '../unite/ChoixUnite'
import SlideBar from './SlideBarMarge'

import { useSelector, useDispatch } from "react-redux";
import { handleChangeCat, handleChangeForm, handleChangeUnite} from '../../slice/EnoncesSlice'
import { selectActualiseFormule, selectFormule } from "../../slice/FormulesSlice";

export default function Reponse (props) {

    const catForm = useSelector(selectFormule);
    const actualise = useSelector(selectActualiseFormule);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    return (
        <div key={props.indexReponse} style={{marginTop : 30, boxShadow : "0px 8px 20px -5px rgba(0,0,0,0.69)", padding : "3%", display : "grid", gridTemplateColumns: "200px 200px 1fr 1fr", gap: "0px 40px"}}>
                <Select style={{width : 200}} value={props.element.selectCat} onChange={e => dispatch(handleChangeCat({idQuestion : props.indexQuestion, idReponse : props.indexReponse, value : e.target.value}))} input={<Input/>}>
                    {!actualise ? <PropagateLoader size={15} color={"rgb(7, 91, 114)"} css={{margin : "30px auto", display : "flex", justifyContent : "center"}}/> :
                        catForm.map((item, index) => <MenuItem key={index} value={index}>{item.nom}</MenuItem>)}
                </Select>
                {props.element.selectCat === "" ? null 
                :<>
                    <Select style={{width : 200}} value={props.element.selectForm} onChange={e =>dispatch(handleChangeForm({idQuestion : props.indexQuestion, idReponse : props.indexReponse, value : e.target.value}))} input={<Input/>}>
                        {catForm[props.element.selectCat].tabFormule.map((item, index) => <MenuItem key={index} value={item.nomFormule}>{item.nomFormule}</MenuItem>)}
                    </Select>
                </>
            }
            <div style={{height : 40, position : "relative", bottom : 10, margin : "auto", gridColumn: 3}}>
                <Button onClick={() => setOpen(true)}>Choisir les unités</Button>
                <p style={{textAlign : "center", position : "relative", bottom : 10}}>Affichage unité</p>
            </div>
            <ChoixUnite open={open} handleClose={() => setOpen(false)} unite={props.element.unite} setTabUnite={e => dispatch(handleChangeUnite({idQuestion : props.indexQuestion, idReponse : props.indexReponse, tabUnite : e}))}/>
            <div style={{gridColumn: 4}}>
                <SlideBar key={props.indexReponse} indexQuestion={props.indexQuestion} indexReponse={props.indexReponse}/>
            </div>
        </div>
    );

}
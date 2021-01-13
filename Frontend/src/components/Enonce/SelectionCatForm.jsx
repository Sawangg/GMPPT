import React from "react";
import { Button, Input, MenuItem, Select } from "@material-ui/core";
import PropagateLoader from "react-spinners/PropagateLoader";

import { useSelector, useDispatch } from "react-redux";
import { selectActualise, selectFormule, selectEnregistre, getCategoriesFormules } from "../../slice/FormulesSlice";
import {addReponse, selectTabReponse, handleChangeCat, handleChangeForm} from '../../slice/EnoncesSlice'
import useConstructor from "../use/useContructor";

export default function SelectionCatForm(props) {

    const catForm = useSelector(selectFormule);
    const actualise = useSelector(selectActualise);
    const isEnregistre = useSelector(selectEnregistre);
    const tab = useSelector(selectTabReponse(props.id))
    const dispatch = useDispatch();

    useConstructor(() => {
        if (!isEnregistre) dispatch(getCategoriesFormules(props.idModele))
    })

    const addElem = () =>{
        dispatch(addReponse(props.id))
    }

    const displayElem = (elem, id) =>{
        return (
            <div key={id} style={{marginTop : 30, boxShadow : "0px 8px 20px -5px rgba(0,0,0,0.69)", padding : "2% 0", display : "flex", justifyContent : "space-around"}}>
                    <Select style={{width : 200}} value={elem.selectCat} onChange={e => dispatch(handleChangeCat({idQuestion : props.id, idReponse : id, value : e.target.value}))} input={<Input/>}>
                        {!actualise ? <PropagateLoader size={15} color={"rgb(7, 91, 114)"} css={{margin : "30px auto", display : "flex", justifyContent : "center"}}/> :
                            catForm.map((item, index) => <MenuItem key={index} value={item}>{item.nom}</MenuItem>)}
                    </Select>
                    {elem.selectCat === "" ? null 
                    :<>
                        <Select style={{width : 200}} value={elem.selectForm} onChange={e =>dispatch(handleChangeForm({idQuestion : props.id, idReponse : id, value : e.target.value}))} input={<Input/>}>
                            {elem.selectCat.tabFormule.map((item, index) => <MenuItem key={index} value={item}>{item.nomFormule}</MenuItem>)}
                        </Select>
                    </>
                }
                <p>Unité ici</p>
            </div>
        )
    }


    return (
        <div style={{width : "48vw"}}>
            <Button onClick={() => addElem()}>Ajouter</Button>
            {tab.map((elem, index) => (
                displayElem(elem, index)
            ))}
        </div>
    )
}
import React, {useState} from "react";
import { Button } from "@material-ui/core";
import useConstructor from "../use/useContructor";
import Reponse from './Reponse';

import { useSelector, useDispatch } from "react-redux";
import { selectEnregistre, getCategoriesFormules } from "../../slice/FormulesSlice";
import {addReponse, selectTabReponse } from '../../slice/EnoncesSlice'

export default function SelectionCatForm(props) {
    const isEnregistre = useSelector(selectEnregistre);
    const tab = useSelector(selectTabReponse(props.id))
    const dispatch = useDispatch();

    useConstructor(() => {
        if (!isEnregistre) dispatch(getCategoriesFormules(props.idModele))
    })

    const addElem = () =>{
        dispatch(addReponse(props.id))
    }

    return (
        <div style={{width : "48vw"}}>
            <Button onClick={() => addElem()}>Ajouter</Button>
            {tab.map((elem, index) => (
                <Reponse key={index} element={elem} indexReponse={index} indexQuestion={props.id}/>
            ))}
        </div>
    )
}

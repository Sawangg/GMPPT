import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectModele } from "../slice/ModeleSlice";
import { selectActualise, selectFormule, getCategoriesFormules } from "../slice/FormulesSlice";
import { Input, MenuItem, Select } from "@material-ui/core";
import PropagateLoader from "react-spinners/PropagateLoader";
import useConstructor from "./use/useContructor";

export default function SelectionCatForm(props) {
    const [select, setSelect] = useState("");
    const dispatch = useDispatch();
    const modele = useSelector(selectModele);
    const catForm = useSelector(selectFormule);
    const actualise = useSelector(selectActualise);

    useConstructor(() => {
        if (!actualise) dispatch(getCategoriesFormules(modele.idModeleSelectionne));
        console.log(catForm);
    });

    const handleChange = (event) => {
        setSelect(event.target.value);
        props.handleChange(event.target.value);
    }

    return (
        <div>
            <Select style={{width : 200}} value={select} onChange={handleChange} input={<Input/>}>
                {!actualise ? <PropagateLoader size={15} color={"rgb(7, 91, 114)"} css={{margin : "30px auto", display : "flex", justifyContent : "center"}}/> :
                    catForm.map(item => <MenuItem key={item.index} value={item.nom}>{item.nom}</MenuItem>)}
            </Select>
        </div>
    )
}
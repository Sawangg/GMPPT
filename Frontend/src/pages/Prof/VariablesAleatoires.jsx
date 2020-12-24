import React from 'react';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ItemVariablesAleatoire from '../../components/variable/ItemVariableAleatoire'

import { useDispatch } from "react-redux";
import { addVariable } from "../../slice/VariablesAleatoiresSlice";
import { useSelector } from "react-redux";
import { selectVariablesAleatoires } from "../../slice/VariablesAleatoiresSlice"
import { selectModele } from "../../slice/ModeleSlice"

import '../../styles/itemVariablesAleatoire.css'

export default function VariablesAleatoires() {

    const dispatch = useDispatch();
    const tab = useSelector(selectVariablesAleatoires);
    const modele = useSelector(selectModele);

    return (
        <>
        <Fab style={{marginLeft : "5%"}} size="small" color="primary" aria-label="add" onClick={(e => dispatch(addVariable()))}>
            <AddIcon />
        </Fab>
        {tab.map((item) => (
            <>
                <ItemVariablesAleatoire key={item.index} item={item}/>
            </>
        ))}
        </>
    )

}
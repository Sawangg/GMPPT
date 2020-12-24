import React from 'react';
import { TextField, Typography, Slider, Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';

import SlideBar from '../../components/SlideBarVariable'

import { useDispatch } from "react-redux";
import { addVariable, changeNom, removeVariable, changeModif, enregistre } from "../../slice/VariablesAleatoiresSlice";
import { useSelector } from "react-redux";
import { selectVariablesAleatoires } from "../../slice/VariablesAleatoiresSlice"
import { selectModele } from "../../slice/ModeleSlice"

import '../../styles/itemVariablesAleatoire.css'

export default function VariablesAleatoires() {

    const dispatch = useDispatch();
    const tab = useSelector(selectVariablesAleatoires);
    const modele = useSelector(selectModele);

    return (
        <div className="containerVariables">
            <Fab 
                //disabled={props.item.nom === "" ? true : false} 
                size="small" 
                color="primary" 
                aria-label="add" 
                onClick={e => console.log("coucou")}
            >
                <SaveIcon/>
            </Fab>
             <TextField 
                    multiline 
                    label="Nom de la variable" 
                    variant="outlined" 
                    size="small" 
                    // value={props.item.nom} 
                    // onChange={e => dispatch(changeNom({index : props.index, event : e.target.value}))}
                />
                <TextField 
                    multiline 
                    label="Valeur min" 
                    variant="outlined" 
                    size="small" 
                />
                <TextField 
                    multiline 
                    label="Valeur max" 
                    variant="outlined" 
                    size="small" 
                />
                <SlideBar/>
                <Fab 
                size="small" 
                color="secondary" 
                aria-label="add" 
                onClick={e => console.log("supp")}
                >
                    <DeleteIcon className="center" />
                </Fab>
            </div>
    )

}
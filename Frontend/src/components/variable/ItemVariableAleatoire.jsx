import React from 'react';
import { TextField, Fab, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';

import { useDispatch } from "react-redux";
import { changeNom, changeValeurMax, changeValeurMin } from "../../slice/VariablesAleatoiresSlice";

import SlideBar from './SlideBarVariable'

export default function ItemVariable(props){

    const dispatch = useDispatch();

    const displayModif = () =>{
        return (
            <>
                <Fab 
                    disabled={props.item.nom === "" ? true : false} 
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
                        value={props.item.nom}
                        onChange={e => dispatch(changeNom({index : props.item.index, event : e.target.value}))}
                    />
                <TextField 
                        multiline 
                        label="Valeur min" 
                        variant="outlined" 
                        size="small" 
                        value={props.item.valeurMin}
                        onChange={e => dispatch(changeValeurMin({index : props.item.index, event : e.target.value}))}
                    />
                <TextField 
                        multiline 
                        label="Valeur max" 
                        variant="outlined" 
                        size="small" 
                        value={props.item.valeurMax}
                        onChange={e => dispatch(changeValeurMax({index : props.item.index, event : e.target.value}))}
                    />
            </>
        )
    }

    const displayTxt = () =>{
        return (
            <>
                <Fab 
                    //disabled={props.item.nom === "" ? true : false} 
                    size="small" 
                    color="primary" 
                    aria-label="add" 
                    onClick={e => console.log("coucou")}
                >
                    <CreateIcon/>
                </Fab>
                <Typography>{props.item.nom} </Typography>
                <Typography>{props.item.valeurMin} </Typography>
                <Typography>{props.item.valeurMax} </Typography>
            </>
        )
    }

    return (
        <div className="containerVariables">
                    {displayModif()}
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
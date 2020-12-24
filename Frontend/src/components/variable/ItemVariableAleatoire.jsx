import React from 'react';
import { TextField, Fab, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { useDispatch } from "react-redux";
import { changeNom, changeValeurMax, changeValeurMin, changeModif, removeVariable } from "../../slice/VariablesAleatoiresSlice";

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
                    onClick={() => dispatch(changeModif(props.index))}
                >
                    <SaveIcon/>
                </Fab>
                <TextField 
                        multiline 
                        label="Nom de la variable" 
                        variant="outlined" 
                        size="small" 
                        value={props.item.nom}
                        onChange={e => dispatch(changeNom({index : props.index, event : e.target.value}))}
                    />
                <ArrowRightIcon fontSize="large"/>
                <TextField 
                        multiline 
                        label="Valeur min" 
                        variant="outlined" 
                        size="small" 
                        value={props.item.valeurMin}
                        onChange={e => dispatch(changeValeurMin({index : props.index, event : e.target.value}))}
                    />
                <TextField 
                        multiline 
                        label="Valeur max" 
                        variant="outlined" 
                        size="small" 
                        value={props.item.valeurMax}
                        onChange={e => dispatch(changeValeurMax({index : props.index, event : e.target.value}))}
                    />
                <SlideBar index={props.index}/>
            </>
        )
    }

    const displayTxt = () =>{
        return (
            <>
                <Fab 
                    size="small" 
                    aria-label="add" 
                    onClick={e => dispatch(changeModif(props.index))}
                >
                    <CreateIcon/>
                </Fab>
                <Typography>{props.item.nom} </Typography>
                <ArrowRightIcon fontSize="large"/>
                <Typography>Max :{props.item.valeurMin} </Typography>
                <Typography>Min :{props.item.valeurMax} </Typography>
                <Typography>Précision : 10^-{props.item.precision}</Typography>
            </>
        )
    }

    return (
        <div className="containerVariables">
                    {props.item.modif ? displayModif() : displayTxt()}
                    <Fab 
                    size="small" 
                    color="secondary" 
                    aria-label="add" 
                    onClick={() => dispatch(removeVariable(props.index))}
                    >
                        <DeleteIcon className="center" />
                    </Fab>
                </div>
    )

}
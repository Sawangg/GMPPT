import React from 'react';
import {TextField, Fab, Typography, makeStyles} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import DelayInput from '../InputAwait';
import SlideBar from './SlideBarVariable'

import { useDispatch } from "react-redux";
import { changeNom, changeMax, changeMin, changeModif } from "../../slice/VariablesAleatoiresSlice";

import '../../styles/itemVariablesAleatoire.css'

export default function ItemVariable(props){
    const useStyles = makeStyles((theme) => ({
        typo: {
            marginTop : 8
        },
        containerVariables: {
            display: "grid",
            gridTemplateColumns: "0.25fr 1fr 0.10fr 0.5fr 0.5fr 0.5fr 0.25fr",
            gridTemplateRows: "1fr",
            gap: "0px 30px",
            margin: "auto",
            width: "90%",
            marginTop: "3%"
        },
        center: {
            margin: "auto",
            display: "block",
        },
        fabDelete: {
            backgroundColor: theme.palette.error.main,
            "&:hover": {
                backgroundColor: theme.palette.error.dark
            },
            color: "white"
        },
        fabSave: {
            backgroundColor: theme.palette.primary.light,
        },
        fabModif: {
            backgroundColor: theme.palette.primary.light
        }
    }));
    const classes = useStyles();

    const dispatch = useDispatch();

    const displayModif = () =>{
        return (
            <>
                <Fab className={classes.fabSave} size="small" aria-label="add"
                    disabled={props.item.nom === "" || props.item.min > props.item.max} 
                    onClick={() => dispatch(changeModif(props.index))}
                >
                    <SaveIcon/>
                </Fab>
                <DelayInput
                    label="Nom variable"
                    delayTimeout={300}
                    value={props.item.nom}
                    onChange={e => dispatch(changeNom({index : props.index, event : e.target.value}))} 
                />
                <ArrowRightIcon fontSize="large"/>
                <DelayInput
                    label="Min"
                    delayTimeout={350}
                    value={props.item.min}
                    number={true}
                    onChange={e => dispatch(changeMin({index : props.index, event : e.target.value}))}
                />
                <DelayInput
                    label="Max"
                    delayTimeout={350}
                    value={props.item.max}
                    number={true}
                    onChange={e => dispatch(changeMax({index : props.index, event : e.target.value}))}
                />
                <SlideBar index={props.index}/>
            </>
        );
    }

    const displayTxt = () =>{
        return (
            <>
                <Fab className={classes.fabModif}
                    size="small" 
                    aria-label="add"
                    onClick={() => dispatch(changeModif(props.index))}
                >
                    <CreateIcon/>
                </Fab>
                <Typography className={classes.typo}>{props.item.nom}</Typography>
                <ArrowRightIcon fontSize="large"/>
                <Typography align="center">Min <br/>{props.item.min}</Typography>
                <Typography align="center">Max <br/>{props.item.max} </Typography>
                <Typography align="center">Précision <br/>10^{props.item.precision}</Typography>
            </>
        )
    }

    return (
            <div className={classes.containerVariables} id="containerVariables">
                {props.item.modif ? displayModif() : displayTxt()}
                <Fab className={classes.fabDelete}
                    disabled={props.length <= 1}
                    size="small" 
                    aria-label="add"
                    onClick={() => props.removeVariable()}
                >
                <DeleteIcon className={classes.center}/>
                </Fab>
            </div>
    );
}
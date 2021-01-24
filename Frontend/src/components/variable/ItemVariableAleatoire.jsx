import React, { useCallback } from 'react';
import {Fab, Typography, makeStyles} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import DelayInput from '../InputAwait';
import SlideBar from './SlideBarVariable'

import { useDispatch, useSelector } from "react-redux";
import { changeNom, changeMax, changeMin, changeModif, selectElement, removeVariable } from "../../slice/VariablesAleatoiresSlice";

const ItemVariable = ({index, length, onRemove}) => {
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
            marginTop: "3%",
            [theme.breakpoints.down('sm')]: {
                gap: "0px 12px",
                width: "95%",
                marginTop: "5%"
            }
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

    const item = useSelector(selectElement(index))

    const remove = useCallback (() => {
        dispatch(removeVariable(index));
        onRemove();
    }, [dispatch, index, onRemove])

    const change = useCallback (() => dispatch(changeModif(index)), [dispatch, index])

    const displayModif = () =>{
        return (
            <>
                <Fab className={classes.fabSave} size="small" aria-label="add"
                    disabled={item.nom === "" || parseFloat(item.min) > parseFloat(item.max)} 
                    onClick={() => change()}
                >
                    <SaveIcon/>
                </Fab>
                <DelayInput
                    label="Nom formule"
                    delay={300}
                    value={item.nom}
                    onChange={e => dispatch(changeNom({index : index, event : e}))} 
                />
                <ArrowRightIcon fontSize="large"/>
                <DelayInput
                    typeNumber={true}
                    label="Min"
                    delayTimeout={300}
                    value={item.min}
                    onChange={e => dispatch(changeMin({index : index, event : e}))}
                />
                <DelayInput
                    typeNumber={true}
                    label="Max"
                    delayTimeout={300}
                    value={item.max}
                    onChange={e => dispatch(changeMax({index : index, event : e}))}
                />
                <SlideBar index={index}/>
            </>
        );
    }

    const displayTxt = () =>{
        return (
            <>
                <Fab className={classes.fabModif}
                    size="small" 
                    aria-label="add"
                    onClick={() => change()}
                >
                    <CreateIcon/>
                </Fab>
                <Typography className={classes.typo}>{item.nom}</Typography>
                <ArrowRightIcon fontSize="large"/>
                <Typography align="center">Min <br/>{item.min}</Typography>
                <Typography align="center">Max <br/>{item.max} </Typography>
                <Typography align="center">Précision <br/>10^{item.precision}</Typography>
            </>
        )
    }

    return (
            <div className={classes.containerVariables}>
                {item.modif ? displayModif() : displayTxt()}
                <Fab className={classes.fabDelete}
                    disabled={length <= 1}
                    size="small" 
                    aria-label="add"
                    onClick={() => remove()}
                >
                <DeleteIcon className={classes.center}/>
                </Fab>
            </div>
    );
}

export default React.memo(ItemVariable);
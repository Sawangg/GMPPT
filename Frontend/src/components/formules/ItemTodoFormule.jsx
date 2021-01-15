import React from 'react';
import {Button, TextField, Typography, Fab, makeStyles} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import DelayInput from '../InputAwait';

import '../../styles/ItemTodoFormule.css'

import { changeNomFormule, changeFormule, changeModifFormule, changePositionFormule } from "../../slice/FormulesSlice"
import { useDispatch } from "react-redux";
import clsx from 'clsx'

export default function Item(props) {

    const useStyles = makeStyles((theme) => ({
        affichageFormule: {
            display: "flex",
        },
        nomForm: {
            width: "30%",
        },
        center: {
            display: "block",
            margin: "auto"
        },
        formule: {
            width : "40%",
            marginLeft : "2%"
        },
        buttonSave: {
            backgroundColor : theme.palette.primary.light,
        },
        typoNomFormule: {
            overflowWrap: "break-word",
            width: "30%"
        },
        typoFormule: {
            overflowWrap: "break-word",
            width : "40%",
            marginLeft : "2%"
        },
        buttonModif: {
            backgroundColor: theme.palette.primary.light
        },
        containerFormules: {
            display: "grid",
            gridTemplateColumns: "0.5fr 3.5fr 2fr 0.75fr 0.75fr",
            gridTemplateRows: "1fr",
            gap: "0px 15px",
            margin: "0px 1% 3%"
        },
        fabDelete: {
            color: "white",
            backgroundColor: theme.palette.error.main,
                "&:hover": {
                    backgroundColor: theme.palette.error.dark
                },
        },
        fabDownward: {
            marginLeft : "10%"
        }
    }));
    const classes = useStyles();

    const dispatch = useDispatch();
    const matches = useMediaQuery('(min-width:960px)');

    const changeModif = () =>{
        dispatch(changeModifFormule({indexCategorie :props.indexCategorie, indexFormule : props.index}))
    }

    const field = () => {
        return(
            <>
                <div className={classes.affichageFormule}>
                    <DelayInput
                        label="Nom formule"
                        delayTimeout={300}
                        value={props.item.nomFormule}
                        onChange={e => dispatch(changeNomFormule({indexCategorie :props.indexCategorie, indexFormule : props.index, event : e.target.value}))} 
                    />
                    <ArrowForwardIcon className={classes.center} />
                    <DelayInput
                        label="Formule"
                        delayTimeout={250}
                        value={props.item.formule}
                        onChange={e => dispatch(changeFormule({indexCategorie :props.indexCategorie, indexFormule : props.index, event : e.target.value}))}
                    />
                </div>
                <Button
                    className={clsx(classes.buttonSave, classes.center)}
                    variant="contained"
                    onClick={() => changeModif()}
                    disabled={props.item.nomFormule === "" || props.item.formule === ""}
                >
                    Enregistrer
                </Button>
            </>
        )
    }

    const txt = () =>{
        return (
            <>
                <div className={classes.affichageFormule}>
                    <Typography className={clsx(classes.typoNomFormule, classes.center)}>{props.item.nomFormule}</Typography>
                    <ArrowForwardIcon className={classes.center} />
                    <Typography className={clsx(classes.typoFormule, classes.center)}>{props.item.formule}</Typography>
                </div>
                <Button
                    className={clsx(classes.buttonModif, classes.center)}
                    variant="contained"
                    onClick={() => changeModif()}
                >
                    Modifier
                </Button>
            </>
        )
    }

    return (
        <div className={classes.containerFormules} id="containerFormules">

            <Fab
                className={clsx(classes.fabDelete, classes.center)}
                disabled={props.nb === 1}
                size="small"
                aria-label="add"
                onClick={() => props.remove()}
            >
                <DeleteIcon className={classes.center}/>
            </Fab>

            {props.item.modif ? field() : txt()}

            {matches ?
                <>
                    <Fab
                        color="primary"
                        variant='extended'
                        size='small'
                        onClick={e => dispatch(changePositionFormule({indexCategorie :props.indexCategorie, indexFormule : props.index, up : true}))}
                    >
                        <ArrowUpwardIcon/>
                    </Fab>
                    <Fab className={classes.fabDownward}
                        color="primary"
                        variant='extended'
                        size='small'
                        onClick={() => dispatch(changePositionFormule({indexCategorie :props.indexCategorie, indexFormule : props.index, up : false}))}
                    >
                        <ArrowDownwardIcon/>
                    </Fab>
                </>
                : null}
        </div>
    )

}
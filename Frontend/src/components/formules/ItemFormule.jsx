import React from 'react';
import {Button, Typography, Fab, makeStyles} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import DelayInput from '../InputAwait';

import '../../styles/ItemTodoFormule.css'

import { changeNomFormule, changeFormule, changeModifFormule, changePositionFormule, selectFormule, removeFormule } from "../../slice/FormulesSlice"
import { useDispatch, useSelector } from "react-redux";
import clsx from 'clsx'

const ItemFomrule = ({indexCategorie, indexFormule, length, onRemove}) => {

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

    const item = useSelector(selectFormule(indexCategorie, indexFormule));

    const changeModif = () =>{
        dispatch(changeModifFormule({indexCategorie : indexCategorie, indexFormule : indexFormule}))
    }

    const field = () => {
        return(
            <>
                <div className={classes.affichageFormule}>
                    <DelayInput
                        label="Nom formule"
                        delay={300}
                        value={item.nomFormule}
                        onChange={e => dispatch(changeNomFormule({indexCategorie :indexCategorie, indexFormule : indexFormule, event : e}))} 
                    />
                    <ArrowForwardIcon className={classes.center} />
                    <DelayInput
                        label="Formule"
                        delay={250}
                        value={item.formule}
                        onChange={e => dispatch(changeFormule({indexCategorie : indexCategorie, indexFormule : indexFormule, event : e}))}
                    />
                </div>
                <Button
                    className={clsx(classes.buttonSave, classes.center)}
                    variant="contained"
                    onClick={() => changeModif()}
                    disabled={item.nomFormule === "" || item.formule === ""}
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
                    <Typography className={clsx(classes.typoNomFormule, classes.center)}>{item.nomFormule}</Typography>
                    <ArrowForwardIcon className={classes.center} />
                    <Typography className={clsx(classes.typoFormule, classes.center)}>{item.formule}</Typography>
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
                disabled={length === 1}
                size="small"
                aria-label="add"
                onClick={() => {
                    dispatch(removeFormule({indexCategorie : indexCategorie, indexFormule : indexFormule}));
                    onRemove();
                }}
            >
                <DeleteIcon className={classes.center}/>
            </Fab>

            {item.modif ? field() : txt()}

            {matches ?
                <>
                    <Fab
                        color="primary"
                        variant='extended'
                        size='small'
                        onClick={e => dispatch(changePositionFormule({indexCategorie :indexCategorie, indexFormule : indexFormule, up : true}))}
                    >
                        <ArrowUpwardIcon/>
                    </Fab>
                    <Fab className={classes.fabDownward}
                        color="primary"
                        variant='extended'
                        size='small'
                        onClick={() => dispatch(changePositionFormule({indexCategorie : indexCategorie, indexFormule : indexFormule, up : false}))}
                    >
                        <ArrowDownwardIcon/>
                    </Fab>
                </>
                : null}
        </div>
    )

}

export default React.memo(ItemFomrule);
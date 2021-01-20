import React, {useCallback, useState} from 'react';
import {
    Button,
    Fab,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    makeStyles,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DelayInput from '../InputAwait';
import TodoListFormule from './TodoListFormule';

import { useDispatch, useSelector } from "react-redux";
import { changeModifCategorie, changeNom, removeCategorie, selectCategorie } from "../../slice/FormulesSlice";

const ItemCategorie = ({index, length}) => {

    const useStyles = makeStyles((theme) => ({
        fieldNomCategorie: {
            width : "30%",
        },
        textNomCategorie: {
            width : "30%",
            marginTop : "8px"
        },
        fabModif: {
            backgroundColor: theme.palette.primary.light,
        },
        divItemAccordeon: {
            display: "block",
            margin: "0 auto 2% auto",
            width: "70%",
            borderRadius: "3px",
            padding: "2% 3%",
            boxShadow: "0px 8px 20px -5px rgba(0,0,0,0.69)"
        },
        enteteItemAccordeon: {
            display : "flex",
            justifyContent : "space-between"
        },
        buttonDelete: {
            color: "white",
            backgroundColor: theme.palette.error.main,
            "&:hover": {
                backgroundColor: theme.palette.error.dark
            }
        },
        accordion: {
            marginTop : 15
        },
        accordionDetails: {
            display : "flex",
            flexDirection : "column"
        }
    }));
    const classes = useStyles();

    const [expanded, setExpanded] = useState(true);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const item = useSelector(selectCategorie(index))

    const change = useCallback(() => {
        dispatch(changeModifCategorie(index));
    }, [dispatch, index]);

    const remove = useCallback(() => {
        dispatch(removeCategorie(index)); 
        setOpen(false);
    }, [dispatch, index]);

    //Quand les champs sont a remplir
    const field = () => {
        return (
            <>
                <DelayInput
                    label="Nom Catégorie"
                    delayTimeout={250}
                    value={item.nom}
                    onChange={e => dispatch(changeNom({index : index, event : e}))} 
                />
                <Fab 
                    disabled={item.nom === ""} 
                    size="small" 
                    color="primary" 
                    aria-label="add" 
                    onClick={() => change()}
                >
                    <SaveIcon/>
                </Fab>
            </>
        )
    }

    //Quand les champs sont enregistrés
    const txt = () =>{
        return (
            <>
                <Typography className={classes.textNomCategorie}>{item.nom}</Typography>
                <Fab className={classes.fabModif}
                    size="small" 
                    aria-label="add"
                    onClick={() => change()}
                >
                    <CreateIcon/>
                </Fab>
            </>
        )
    }

    return (
        <div className={classes.divItemAccordeon}>

            <div className={classes.enteteItemAccordeon}>
                {item.modif ? field() : txt()}    
                <Button className={classes.buttonDelete}
                    disabled={length === 1} 
                    variant="contained"
                    onClick={e => setOpen(true)}
                >
                    Supprimer la catégorie
                </Button>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Suppression</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Voulez-vous vraiment supprimer la catégorie ?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="primary">Annuler</Button>
                        <Button onClick={() => remove()} color="primary" autoFocus>OK</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <Accordion className={classes.accordion} square expanded={expanded} onChange={() =>setExpanded(!expanded)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}/>
                <AccordionDetails className={classes.accordionDetails}>
                    <TodoListFormule indexCategorie={index}/>
                </AccordionDetails>
            </Accordion>
        </div>
    )

}

export default React.memo(ItemCategorie);
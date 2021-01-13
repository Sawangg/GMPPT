import React, {useState} from 'react';
import {
    Button,
    Fab,
    TextField,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    makeStyles
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TodoListFormule from './TodoListFormule'
import Dialogue from '../Dialogue'
import SlideBar from './SlideBarFormule'

import { useDispatch } from "react-redux";
import { changeModifCategorie, changeNom, removeCategorie } from "../../slice/FormulesSlice";

export default function Item(props) {

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
            margin: "2% auto",
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

    const field = () => {
        return (
            <>
                <TextField 
                    className={classes.fieldNomCategorie}
                    multiline 
                    label="Nom catégorie" 
                    variant="outlined" 
                    size="small" 
                    value={props.item.nom} 
                    onChange={e => dispatch(changeNom({index : props.index, event : e.target.value}))}
                />
                <Fab 
                    disabled={props.item.nom === "" ? true : false} 
                    size="small" 
                    color="primary" 
                    aria-label="add" 
                    onClick={() => dispatch(changeModifCategorie(props.index))}
                >
                    <SaveIcon/>
                </Fab>
            </>
        )
    }

    const txt = () =>{
        return (
            <>
                <Typography className={classes.textNomCategorie}>{props.item.nom}</Typography>
                <Fab className={classes.fabModif}
                    size="small" 
                    aria-label="add"
                    onClick={e => dispatch(changeModifCategorie(props.index))}
                >
                    <CreateIcon/>
                </Fab>
            </>
        )
    }

    return (
        <div className={classes.divItemAccordeon}>

            <div className={classes.enteteItemAccordeon}>
                {props.item.modif ? field() : txt()}    
                <Button className={classes.buttonDelete}
                    disabled={props.length === 1} 
                    variant="contained"
                    onClick={e => setOpen(true)}
                >
                    Supprimer la catégorie
                </Button>
                <Dialogue 
                    ok={() =>  dispatch(removeCategorie(props.index))} 
                    titre="Suppression" 
                    message="Voulez-vous vraiment supprimer la catégorie ?" 
                    open={open} 
                    handleClose={e => setOpen(false)}
                />
            </div>

            <Accordion className={classes.accordion} square expanded={expanded} onChange={() =>setExpanded(!expanded)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}/>
                <AccordionDetails className={classes.accordionDetails}>
                    <TodoListFormule index={props.index}/>
                    <SlideBar index={props.index}/>
                </AccordionDetails>
            </Accordion>
        </div>
    )

}
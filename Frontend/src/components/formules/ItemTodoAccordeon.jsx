import React, {useState} from 'react';
import { Button, Fab, TextField, Typography, Accordion, AccordionSummary, AccordionDetails  } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TodoListFormule from './TodoListFormule'
import Dialogue from '../Dialogue'

import { useDispatch } from "react-redux";
import { changeModifCategorie, changeNom, removeCategorie } from "../../slice/FormulesSlice";

import '../../styles/ItemTodoAccordeon.css'

export default function Item(props) {

    const [expanded, setExpanded] = useState(true);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const field = () => {
        return (
            <>
                <TextField 
                    className="fieldNomCategorie" 
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
                <Typography className="textNomCategorie">{props.item.nom}</Typography>
                <Fab 
                    size="small" 
                    color="secondary" 
                    aria-label="add" 
                    onClick={e => dispatch(changeModifCategorie(props.index))}
                >
                    <CreateIcon/>
                </Fab>
            </>
        )
    }

    return (
        <div className="divItemAccordeon">

            <div className="enteteItemAccordeon">
                {props.item.modif ? field() : txt()}    
                <Button 
                    disabled={props.length === 1} 
                    variant="contained"
                    color="secondary" 
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

            <Accordion style={{marginTop : 15}} square expanded={expanded} onChange={() =>setExpanded(!expanded)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}/>
                <AccordionDetails style={{display : "flex", flexDirection : "column"}}>
                    <TodoListFormule index={props.index}/>
                </AccordionDetails>
            </Accordion>
        </div>
    )

}
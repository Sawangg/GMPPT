import React, {useState} from 'react';
import { Button, Fab, TextField, Typography, Accordion, AccordionSummary, AccordionDetails  } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TodoListFormule from './TodoListFormule'
import Dialogue from './Dialogue'

import '../styles/ItemTodoAccordeon.css'

export default function Item(props) {

    const [expanded, setExpanded] = useState(true);

    const [open, setOpen] = React.useState(false);

    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="divItemAccordeon" key={props.item.index}>

        <div className="enteteItemAccordeon">
                    {props.item.modif ? <>
                    
                    <TextField className="fieldNomCategorie" multiline label="Nom catégorie" variant="outlined" size="small" value={props.item.nom} onChange={e => props.onChange(e)}/>
                    <Fab disabled={props.item.nom === "" ? true : false} size="small" color="primary" aria-label="add" onClick={e => props.changeModif()}>
                        <SaveIcon/>
                    </Fab>
                    
                    </>:<>

                    <Typography className="textNomCategorie">{props.item.nom}</Typography>
                    <Fab size="small" color="secondary" aria-label="add" onClick={e => props.changeModif()}>
                        <CreateIcon/>
                    </Fab>

                    </>}    

                    <Button disabled={props.nb === 1} variant="contained" color="secondary" onClick={e => handleClickOpen()} /*onClick={e => props.removeTodo()}*/>Supprimer la catégorie</Button>
                    <Dialogue ok={e => props.removeTodo()} titre="Suppression" message="Voulez-vous vraiment supprimer la catégorie ?" open={open} handleClose={e => handleClose()}/>
                </div>

                <Accordion style={{marginTop : 15}} square expanded={expanded} onChange={e =>setExpanded(!expanded)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}/>
                        <AccordionDetails style={{display : "flex", flexDirection : "column"}}>
                            <TodoListFormule changeTabFormule={e => props.changeTabFormule(e)} tab={props.item.tabFormule}/>
                        </AccordionDetails>
                </Accordion>
        </div>
    )

}
import React, {useState} from 'react';
import { Button, Fab, TextField, Typography, Accordion, AccordionSummary, AccordionDetails  } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TodoListFormule from './TodoListFormule'

import '../styles/ItemTodoAccordeon.css'

export default function Item(props) {

    const [expanded, setExpanded] = useState(true);

    return (
        <div className="divItemAccordeon" key={props.item.index}>

        <div className="enteteItemAccordeon">
                    {props.item.modif ? <>
                    
                    <TextField className="fieldNomCategorie" multiline label="Nom catégorie" variant="outlined" size="small" value={props.item.nom} onChange={e => props.onChange(e)}/>
                    <Fab size="small" color="primary" aria-label="add" onClick={e => props.changeModif()}>
                        <SaveIcon/>
                    </Fab>
                    
                    </>:<>

                    <Typography className="textNomCategorie">{props.item.nom}</Typography>
                    <Fab size="small" color="secondary" aria-label="add" onClick={e => props.changeModif()}>
                        <CreateIcon/>
                    </Fab>

                    </>}    

                    <Button variant="contained" color="secondary" onClick={e => props.removeTodo()}>Supprimer la catégorie</Button>
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
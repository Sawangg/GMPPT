import React, { useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TodoListFormule from './TodoListFormule'

export default function Accordeon() {
    
    const [expanded, setExpanded] = useState(true);

    return (
        <Accordion style={{marginTop : 15}} square expanded={expanded} onChange={e =>setExpanded(!expanded)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            </AccordionSummary>
            <AccordionDetails style={{display : "flex", flexDirection : "column"}}>
                <TodoListFormule/>
            </AccordionDetails>
        </Accordion>
    );

}
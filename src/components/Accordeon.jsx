import React, { useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TodoList from './TodoList'

export default function Accordeon(props) {
    
    const [expanded, setExpanded] = useState('panel');

    const handleChange = (panel) => (_event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Accordion style={{marginTop : 15}} square expanded={expanded === 'panel'} onChange={handleChange('panel')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            </AccordionSummary>
            <AccordionDetails style={{display : "flex", flexDirection : "column"}}>
                <TodoList/>
            </AccordionDetails>
        </Accordion>
    );

}
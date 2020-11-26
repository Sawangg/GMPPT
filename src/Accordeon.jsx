import React, {useState} from 'react'
import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function Accordeon(props){
    
    const [expanded, setExpanded] = useState('panel');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };

    return (
        <Accordion style={{marginTop : 15}} square expanded={expanded === 'panel'} onChange={handleChange('panel')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Formules Poids</Typography>
            </AccordionSummary>
            <AccordionDetails style={{display : "flex", flexDirection : "column"}}>
                {props.items}
            </AccordionDetails>
        </Accordion>
    );

}
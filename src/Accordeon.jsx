import React, {useState} from 'react'
import {Button, Accordion, AccordionSummary, AccordionDetails, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function Accordeon(props){
    
    const [expanded, setExpanded] = useState('panel');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };

    return (
        <Accordion style={{marginTop : 15}} square expanded={expanded === 'panel'} onChange={handleChange('panel')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{marginTop : 6}}>{props.nomCategorie}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{display : "flex", flexDirection : "column"}}>
                <Button style={{margin : "0px 50px", width : "250px"}} variant="outlined" color="primary"  onClick={props.ajoutFormule}>Ajouter des formules</Button>
                {props.items}
            </AccordionDetails>
        </Accordion>
    );

}
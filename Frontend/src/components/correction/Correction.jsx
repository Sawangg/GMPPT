import React from 'react';

import {ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, Typography,
    Button} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { selectEssais, selectReponsesJustes } from '../../slice/CorrectionSlice';

import CloseIcon from '@material-ui/icons/Close';

export default function ConsulterEtudiant(props) {

    const tabEssais = useSelector(selectEssais)

    const tabReponsesJustes = useSelector(selectReponsesJustes)

    const handleClick = () =>{

    }

    const nbQuestionsJustes = () =>{
        return "undefined"
    }

    const nbQuestions = () =>{
        return "undefined"
    }

    return(
        <div>
            <AppBar className="appBar">
                <Toolbar>
                    <IconButton onClick={props.handleClose} edge="start" color="inherit" aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" >
                        Etudiant : {props.etu.prenom + ' ' + props.etu.nom}
                    </Typography>
                </Toolbar>
            </AppBar>
            <List>
                {tabEssais.map((item) => (
                    <>
                        <ListItem button onClick={e => handleClick(item)}>
                            <ListItemText 
                                primary={"Essai du " + item.dateEssai} 
                                secondary={"Questions justes : " + nbQuestionsJustes() +  "/" + nbQuestions()}/>
                            <Button value="test"/>
                        </ListItem>

                        <Divider />
                    </>
                 ) )}
            </List>
        </div>
    )

}
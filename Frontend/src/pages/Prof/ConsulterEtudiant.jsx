import React from 'react';

import {ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, Typography,
    Button} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { selectEssais, selectReponsesJustes } from '../../slice/ConsulterSlice';

import CloseIcon from '@material-ui/icons/Close';

export default function Consulter(props){

    const tabEssais = useSelector(selectEssais)

    const etu = props.match.params.value

    const handleClick = () =>{

    }

    const nbQuestionsJustes = () =>{
        
    }

    const nbQuestions = () =>{
        return "undefined"
    }

    return(
        <div>
            {console.log(props)}
            <Typography variant="h6" >
                Etudiant : {etu.prenom + ' ' + etu.nom}
            </Typography>
            <List>
                <Divider />
                {tabEssais.map((item) => (
                    <>
                        <ListItem button onClick={e => handleClick(item)}>
                            <ListItemText 
                                primary={"Essai du " + item.dateEssai} 
                                secondary={"Questions justes : " + nbQuestionsJustes() +  "/" + nbQuestions()}/>
                        </ListItem>

                        <Divider />
                    </>
                 ) )}
            </List>
        </div>
    )
}
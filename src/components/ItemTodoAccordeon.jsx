import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';
import { Button, Fab, TextField, Typography } from '@material-ui/core';

import Accordeon from './Accordeon'

import '../styles/ItemTodoAccordeon.css'

export default function Item(props) {

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

            <Accordeon nom={props.item.nom} onChange={e => props.onChange(e)}/>
        </div>
    )

}
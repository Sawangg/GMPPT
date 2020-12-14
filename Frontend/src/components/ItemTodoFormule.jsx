import React from 'react';
import { Button, TextField, Typography, Fab } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import '../styles/ItemTodoFormule.css'

export default function Item(props) {

    const field = () =>{
        return(
            <>
                <div className="affichageFormule">
                    <TextField autoFocus className="nomFormule center" multiline label="Nom formule" variant="outlined" size="small" value={props.item.nomFormule} onChange={e => props.onChange(e, undefined)} />
                    <ArrowForwardIcon className="center" />
                    <TextField className="formule center" multiline label="formule" variant="outlined" size="small" value={props.item.formule} onChange={e => props.onChange(undefined, e)}/>
                </div>
                <Button className="buttonItem center ButtonEnregistrer" variant="contained" onClick={e => props.changeModif()}>Enregistrer</Button>
            </> 
        )
    }

    const txt = () =>{
        return (
            <>
                <div className="affichageFormule">
                    <Typography className="nomFormule typoFormule center">{props.item.nomFormule}</Typography>
                    <ArrowForwardIcon className="center" />
                    <Typography className="typoFormule formule center">{props.item.formule}</Typography>
                </div>
                <Button className="buttonItem center" variant="contained" onClick={e => props.changeModif()}>Modifier</Button>
            </>
        )
    }

    return (
        <div className="container">
            
            <Fab disabled={props.nb === 1} className="center" size="small" color="secondary" aria-label="add" onClick={e => props.removeTodo()}><DeleteIcon className="center" /></Fab>
            
            {props.item.modif ? field() : txt()}
                <Fab color="primary" variant='extended' size='small' onClick={e => props.changePosition(true)}><ArrowUpwardIcon/></Fab>
                <Fab style={{marginLeft : "10%"}} color="primary" variant='extended' size='small' onClick={e => props.changePosition(false)}><ArrowDownwardIcon/></Fab>
        </div>
    )
    
}
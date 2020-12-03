import React from 'react';
import { Button, TextField, Typography, Fab } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteIcon from '@material-ui/icons/Delete';

import '../styles/ItemTodoFormule.css'

export default function Item(props) {

    return (
        <div className="container" key={props.item.index}>
            
            {props.item.modif ? <>

                    <TextField className="center" multiline label="Nom formule" variant="outlined" size="small" value={props.item.nomFormule} onChange={e => props.onChange(e, undefined)} />
                    <ArrowForwardIcon className="center" />
                    <TextField className="center" multiline label="formule" variant="outlined" size="small" value={props.item.formule} onChange={e => props.onChange(undefined, e)}/>
                    <Button className="buttonItem center ButtonEnregistrer" variant="contained" onClick={e => props.changeModif()}>Enregistrer</Button>
            
            </> : <>

                    <Typography style={{marginTop : 8, overflowWrap: "break-word"}}>{props.item.formule}</Typography>
                    <ArrowForwardIcon className="center" />
                    <Typography style={{marginTop : 8, overflowWrap: "break-word"}}>{props.item.nomFormule}</Typography>
                    <Button className="buttonItem center" variant="contained" onClick={e => props.changeModif()}>Modifier</Button>
               
            </>}

                <Fab className="center" size="small" color="secondary" aria-label="add" onClick={e => props.removeTodo()}>
                    <DeleteIcon className="center" />
                </Fab>

        </div>
    )
    
}
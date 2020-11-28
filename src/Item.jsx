import React from 'react';
import {Button, TextField, Typography} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function Item(props){

    return (
        <>
        {props.modif ? <>
                <TextField className="center" multiline label="Variable" variant="outlined" size="small" value={props.variable} onChange={e => props.onChange(undefined, e)}/>
                <ArrowForwardIcon className="center" />
                <TextField className="center" multiline label="Nom formule" variant="outlined" size="small" value={props.nom} onChange={e => props.onChange(e, undefined)} />
                <Button className="buttonItem center" variant="contained" color="primary" onClick={e => props.changeModif()}>Enregistrer</Button>
            </> : <>
                <Typography style={{marginTop : 8, overflowWrap: "break-word"}}>{props.variable}</Typography>
                <ArrowForwardIcon className="center" />
                <Typography style={{marginTop : 8, overflowWrap: "break-word"}}>{props.nom}</Typography>
                <Button className="buttonItem center" variant="contained" onClick={e => props.changeModif()}>Modifier</Button>
            </>}
        </>
    )
    
}
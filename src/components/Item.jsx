import React from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function Item(props) {

    return (
        <>
            {props.modif ? <>
                    <TextField className="center" multiline label="Nom formule" variant="outlined" size="small" value={props.nomFormule} onChange={e => props.onChange(e, undefined)} />
                    <ArrowForwardIcon className="center" />
                    <TextField className="center" multiline label="formule" variant="outlined" size="small" value={props.formule} onChange={e => props.onChange(undefined, e)}/>
                    <Button className="buttonItem center" variant="contained" color="primary" onClick={e => props.changeModif()}>Enregistrer</Button>
            </> : <>
                    <Typography style={{marginTop : 8, overflowWrap: "break-word"}}>{props.formule}</Typography>
                    <ArrowForwardIcon className="center" />
                    <Typography style={{marginTop : 8, overflowWrap: "break-word"}}>{props.nomFormule}</Typography>
                    <Button className="buttonItem center" variant="contained" onClick={e => props.changeModif()}>Modifier</Button>
                </>}
        </>
    )
    
}
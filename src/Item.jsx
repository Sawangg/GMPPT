import React, {useState} from 'react';
import {Button, TextField, Typography} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function Item(){

    const [value, setValue] = useState({text : "", variable : "", modif : true})
    
    const onChange = (textEvent, variableEvent) =>{
        setValue({
            text : (typeof textEvent !== 'undefined') ? textEvent.target.value : value.text, 
            variable : (typeof variableEvent !== 'undefined') ? variableEvent.target.value : value.variable, 
            modif : value.modif
        });
    }

    const changeModif = () => {
        setValue({text : value.text, variable : value.variable, modif : !value.modif})
    }

    return (
        <>
        {value.modif ? <>
                <TextField className="center" multiline label="Variable" variant="outlined" size="small" value={value.variable} onChange={e => onChange(undefined, e)}/>
                <ArrowForwardIcon className="center" />
                <TextField className="center" multiline label="Nom formule" variant="outlined" size="small" value={value.text} onChange={e => onChange(e, undefined)} />
                <Button className="buttonItem center" variant="contained" color="primary" onClick={e => changeModif()}>Enregistrer</Button>
            </> : <>
                <Typography style={{marginTop : 8, overflowWrap: "break-word"}}>{value.variable}</Typography>
                <ArrowForwardIcon className="center" />
                <Typography style={{marginTop : 8, overflowWrap: "break-word"}}>{value.text}</Typography>
                <Button className="buttonItem center" variant="contained" onClick={e => changeModif()}>Modifier</Button>
            </>}
        </>
    )
    
}
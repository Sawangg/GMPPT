import React from 'react'
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Accueil(props){

    return(
        <div style={{position : "absolute", right : 30, top : 30}}>
             <Button variant="contained" color="secondary" startIcon={<ExitToAppIcon />} onClick={e => props.changeAuthentif()}>Déconnexion</Button>
        </div>
    )

}
import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Redirect } from "react-router-dom";

import { logout } from '../utils/api';

export default function Accueil() {

    const [deco, setDeco] = useState(false);

    const deconnexion = () =>{
        logout().then(() => {
            console.log("deco réussi");
            setDeco(true)
        }).catch(() => {
            console.log("deco echouée");
            setDeco(false)
        });
    }

    return (
        <div style={{position : "absolute", right : 30, top : 30}}>
            <Button variant="contained" color="secondary" startIcon={<ExitToAppIcon />} onClick={e => deconnexion()}>Déconnexion</Button>
            {deco ? <Redirect to='/login'/> : null}
        </div>
    );
}
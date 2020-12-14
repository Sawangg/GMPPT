import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Redirect } from "react-router-dom";

import Etapes from '../components/Etapes'
import DropFile from '../components/DropFile'

import { logout } from '../utils/api';

export default function Accueil() {

    const [deco, setDeco] = useState(false);

    const deconnexion = () =>{
        logout()
        .then(() => setDeco(true))
        .catch(() => setDeco(false));
    }

    return (
        <div>
            <Button  style={{position : "absolute", right : 30, top : 30}} variant="contained" color="secondary" startIcon={<ExitToAppIcon />} onClick={e => deconnexion()}>Déconnexion</Button>
            {deco ? <Redirect to='/'/> : null}
            <div>
                <Etapes/>
                <DropFile message="Mettre les photos en ligne"/>
            </div>
        </div>
    );
}
import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../utils/api';

export default function Accueil() {

    const [connect, setConnect] = useState(false);

    const deco = () =>{
        logout().then(data => {
            console.log("deco réussi");
            setConnect(true)
        }).catch(err => {
            console.log("deco echouée");
            setConnect(false)
        });
    }

    return (
        <div style={{position : "absolute", right : 30, top : 30}}>
            <Button variant="contained" color="secondary" startIcon={<ExitToAppIcon />} onClick={e => deco()}>Déconnexion</Button>
            {connect ? <Redirect to='/login'/> : null}
        </div>
    );
}
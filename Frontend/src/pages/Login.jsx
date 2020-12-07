import React, {useState} from 'react'
import { TextField, Button, IconButton } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { login } from '../utils/api.js';

import '../styles/Login.css'

export default function Login(){

    const [identifiant, setIdentifiant] = useState({login : "", mdp : "", showMdp : false})
    const [connect, setConnect] = useState(false);

    const changeIdentifiant = (login, mdp) => setIdentifiant({
        login : login !== undefined ? login.target.value : identifiant.login, 
        mdp : mdp !== undefined ? mdp.target.value : identifiant.mdp, 
        showMdp : identifiant.showMdp
    })

    const changeShowMdp = () => setIdentifiant({
        login : identifiant.login, 
        mdp : identifiant.mdp, 
        showMdp : !identifiant.showMdp
    })

    const connexion= () => {
        login(identifiant.login, identifiant.mdp)
        .then(() => {setConnect(true)})
        .catch(() => {setConnect(false)})
    } 

    return (
            <div id="divLogin">
                <div className="center">
                    <div className="fieldLogin">
                        <AccountCircleOutlinedIcon className="iconLogin"/>
                        <TextField size="small" label="Login" variant="outlined" required multiline value={identifiant.login} 
                        onChange={
                            e => changeIdentifiant(e, undefined)
                        }/>
                    </div>
                    <div className="fieldLogin">
                        <VpnKeyOutlinedIcon className="iconLogin"/>
                        <div>
                            <TextField label="Mot de passe" size="small" required type={identifiant.showMdp ? "text" : "password"}  variant="outlined" value={identifiant.mdp} 
                            onChange={
                                e => changeIdentifiant(undefined, e)
                            }/>
                            <IconButton onClick={e => changeShowMdp()}>{identifiant.showMdp ? <Visibility /> : <VisibilityOff />}</IconButton>
                        </div>
                    </div>
                </div>
                <Button id="buttonConnexion" variant="outlined" color="primary" onClick={e => connexion()}>Connexion</Button>
                {connect && <Redirect push to='/'/>}
            </div>
    )
}
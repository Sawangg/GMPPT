import React, {useState, useEffect} from 'react'
import { TextField, Button, IconButton } from '@material-ui/core';
import Redirect from "react-router-dom/Redirect";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { login } from '../utils/api.js';

import '../styles/Login.css'

export default function Login(){

    const [identifiant, setIdentifiant] = useState({login : "", mdp : "", showMdp : false})
    const [connect, setConnect] = useState(false);

    const changeLogin = (e) => setIdentifiant({login : e.target.value, mdp : identifiant.mdp, showMdp : identifiant.showMdp})

    const changeMdp = (e) => setIdentifiant({login : identifiant.login, mdp : e.target.value, showMdp : identifiant.showMdp})

    const changeShowMdp = () => setIdentifiant({login : identifiant.login, mdp : identifiant.mdp, showMdp : !identifiant.showMdp})

    const connexion = () =>{
        if (identifiant.mdp !=="" && identifiant.login !==""){
            // login(identifiant.login, identifiant.mdp).then(data => {
            //             console.log("connecté");
            //             setConnect(true)
            //         }).catch(err => {
            //             console.log("Mot de passe incorrecte");
            //             setConnect("false")
            //         });
            setConnect(true) //A enlever
        } 
    }

    //useEffect(() => {
    //     getUserDetails().then(data => {
    //         setConnect(true)
    //     }).catch(err => {
    //         setConnect("false")
    //     });
    // }, []);

    return (
            <div id="divLogin">
                <div className="center">
                    <div className="fieldLogin">
                        <AccountCircleOutlinedIcon className="iconLogin"/>
                        <TextField size="small" required multiline value={identifiant.login} onChange={e => changeLogin(e)} label="Login" variant="outlined"/>
                    </div>
                    <div className="fieldLogin">
                        <VpnKeyOutlinedIcon className="iconLogin"/>
                        <div>
                            <TextField label="Mot de passe" size="small" type={identifiant.showMdp ? "text" : "password"}  variant="outlined" value={identifiant.mdp} onChange={e => changeMdp(e)} required/>
                            <IconButton onClick={e => changeShowMdp()}>{identifiant.showMdp ? <Visibility /> : <VisibilityOff />}</IconButton>
                        </div>
                    </div>
                </div>
                <Button id="buttonConnexion" variant="outlined" color="primary" onClick={e => connexion()}>Connexion</Button>
                {connect ? <Redirect to='/'/> : null}
            </div>
    )
}
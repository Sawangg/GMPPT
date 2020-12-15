import React, {useState} from 'react'
import { TextField, Button, IconButton } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import PopUp from '../components/PopUp'
import Particules from '../components/ParticulesBackLogin'
import useConstructor from '../components/useContructor'

import { login, getUserDetails } from '../utils/api.js';

import '../styles/Login.css'

export default function Login(){

    useConstructor(() => {
        getUserDetails()
        .then((data) => setConnect({connect : true, isProf : data.data.isProf}))
        .catch(() => setConnect({connect : false, isProf : false}));
      });

    const [identifiant, setIdentifiant] = useState({login : "", mdp : "", showMdp : false, error : false})
    const [connect, setConnect] = useState({connect : false, isProf : false});
    const [openPopUp, setOpenPopUp] = useState(false);

    const changeIdentifiant = (login, mdp) => setIdentifiant({
        login : login !== undefined ? login.target.value : identifiant.login, 
        mdp : mdp !== undefined ? mdp.target.value : identifiant.mdp, 
        showMdp : identifiant.showMdp,
        error : false
    })

    const changeShowMdp = () => setIdentifiant({
        login : identifiant.login, 
        mdp : identifiant.mdp, 
        showMdp : !identifiant.showMdp
    })

    const connexion= () => {
        login(identifiant.login, identifiant.mdp)
        .then(() => 
            getUserDetails()
            .then((data) => setConnect({connect : true, isProf : data.data.isProf}))
            .catch(() => setConnect({connect : false, isProf : false}))
        )
        .catch(() => {
          setIdentifiant({
            login : identifiant.login, 
            mdp : identifiant.mdp, 
            showMdp : identifiant.showMdp,
            error : true
            })
          setOpenPopUp(true);
        })
    } 

    const connexionRedirection = () =>{
      return connect.connect && (connect.isProf ? <Redirect push to='/prof/home'/> : <Redirect push to='/etu/home'/>)
    }

    return (
            <div id="divLogin">
                
                <Particules/>

                <div id="backgroundLogin">
                    <div className="fieldLogin">
                        <AccountCircleOutlinedIcon className="iconLogin"/>
                        <TextField error={identifiant.error} autoFocus size="small" label="Login" variant="outlined" required 
                            value={identifiant.login} 
                            onChange={e => changeIdentifiant(e, undefined)}
                          />
                    </div>
                    <div className="fieldLogin">
                        <VpnKeyOutlinedIcon className="iconLogin"/>
                        <div>
                            <TextField error={identifiant.error} label="Mot de passe" size="small" required variant="outlined"
                            type={identifiant.showMdp ? "text" : "password"}   
                            value={identifiant.mdp} 
                            onChange={e => changeIdentifiant(undefined, e)}
                            />
                            <IconButton onClick={e => changeShowMdp()}>{identifiant.showMdp ? <Visibility /> : <VisibilityOff />}</IconButton>
                        </div>
                    </div>
                <Button id="buttonConnexion" variant="outlined" onClick={e => connexion()}>Connexion</Button>
                <PopUp severity="error" message="Identification invalide" open={openPopUp} handleClose={e => setOpenPopUp(false)}/>
                {connexionRedirection()}
            </div>
        </div>
    )
}
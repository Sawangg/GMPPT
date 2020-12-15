import React, {useState} from 'react'
import { TextField, Button } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

import PopUp from '../components/PopUp'
import Particules from '../components/ParticulesBackLogin'
import useConstructor from '../components/useContructor'
import InputPassword from '../components/InputPassword'

import { login, getUserDetails } from '../utils/api.js';

import '../styles/Login.css'

export default function Login(){

    const [identifiant, setIdentifiant] = useState({login : "", mdp : "", error : false})
    const [connect, setConnect] = useState({connect : false, isProf : false, reconnexion : true});
    const [openPopUp, setOpenPopUp] = useState(false);

    useConstructor(() => {
        getUserDetails()
        .then((data) => setConnect({connect : true, isProf : data.data.isProf, reconnexion : true}))
        .catch(() => setConnect({connect : false, isProf : false, reconnexion : false}));
      });

    const changeIdentifiant = (login, mdp) => setIdentifiant({
        login : login !== undefined ? login.target.value : identifiant.login, 
        mdp : mdp !== undefined ? mdp.target.value : identifiant.mdp, 
        showMdp : identifiant.showMdp,
        error : false
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
        if (connect.connect){
            return connect.isProf ? <Redirect push to='/prof/home'/> : <Redirect push to='/etu/home'/>
        }
        else {
            return null;
        }
    }

    const displayLogin = () =>{
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
                            <InputPassword error={identifiant.error} value={identifiant.mdp} onChange={e => changeIdentifiant(undefined, e)}/>
                        </div>
                    <Button id="buttonConnexion" variant="outlined" onClick={e => connexion()}>Connexion</Button>
                    <PopUp severity="error" message="Identification invalide" open={openPopUp} handleClose={e => setOpenPopUp(false)}/>
                </div>
            </div>
        )
    }

    return (
        <>
            {connect.reconnexion ? null : displayLogin()}
            {connexionRedirection()}
        </>
    )
}
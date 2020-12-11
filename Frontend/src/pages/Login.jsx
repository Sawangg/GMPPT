import React, {useState} from 'react'
import { TextField, Button, IconButton } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Particles from 'react-particles-js';

import PopUp from '../components/PopUp'

import { login } from '../utils/api.js';

import '../styles/Login.css'

export default function Login(){

    const [identifiant, setIdentifiant] = useState({login : "", mdp : "", showMdp : false})
    const [connect, setConnect] = useState(false);

    const [openPopUp, setOpenPopUp] = useState(false);
  
    const closePopUp = () => {
        setOpenPopUp(false);
    };

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
        .catch(() => {
          setConnect(false);
          setOpenPopUp(true);
        })
    } 

    return (
            <div id="divLogin">
                
                <Particles
                  style={{ position: "absolute", opacity : "0.6"}}
                  height="90%"
                  width="100%"
                  params={{
                    particles: {
                      color: {
                        value: "#000000"
                      },
                      line_linked: {
                        color: {
                          value: "#000000"
                        }
                      },
                      number: {
                        value: 50
                      },
                      size: {
                        value: 3
                      }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        }
                    }
                  }}
                />

                <div id="backgroundLogin">
                <div>
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
                <PopUp severity="error" message="Identification invalide" open={openPopUp} handleClose={e => closePopUp()}/>
            </div>
        </div>
    )
}
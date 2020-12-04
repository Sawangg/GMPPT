import React, {useState} from 'react'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { TextField, Button, OutlinedInput ,InputLabel, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function Login(props){

    const [identifiant, setIdentifiant] = useState({login : "", mdp : "", showMdp : false})

    const changeLogin = (e) => {
        setIdentifiant({login : e.target.value, mdp : identifiant.mdp, showMdp : identifiant.showMdp})
    }

    const changeMdp = (e) =>{
        setIdentifiant({login : identifiant.login, mdp : e.target.value, showMdp : identifiant.showMdp})
    }

    const changeShowMdp = () =>{
        setIdentifiant({login : identifiant.login, mdp : identifiant.mdp, showMdp : !identifiant.showMdp})
        console.log(identifiant.showMdp)
    }

    return (
        <div style={{marginTop : 50, display : "flex", flexDirection : "column"}}>
            <div style={{display : "flex", flexDirection : "column", height : "120px", margin : "auto"}}>
                <div style={{display : "flex"}}>
                    <AccountCircleOutlinedIcon style={{marginRight : 25, marginTop : 6}}/>
                    <TextField size="small" required multiline value={identifiant.login} onChange={e => changeLogin(e)} label="Login" variant="outlined"/>
                </div>
                <div style={{display : "flex", marginTop : 20}}>
                    <VpnKeyOutlinedIcon style={{marginRight : 25, marginTop : 6}}/>
                    <div>
                        <TextField label="Mot de passe" size="small" type={identifiant.showMdp ? "text" : "password"}  variant="outlined" value={identifiant.mdp} onChange={e => changeMdp(e)} required/>
                        <IconButton onClick={e => changeShowMdp()}>{identifiant.showMdp ? <Visibility /> : <VisibilityOff />}</IconButton>
                    </div>
                </div>
            </div>
            <Button style={{margin : "50px auto"}} variant="outlined" color="primary" onClick={e => {if (identifiant.mdp !=="" && identifiant.login !=="") props.changeAuthentif()}}>Connexion</Button>
        </div>
    )

}
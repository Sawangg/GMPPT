import React from 'react'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { TextField, Button } from '@material-ui/core';

export default function Login(){



    return (
        <div style={{display : "flex", flexDirection : "column"}}>
            <div style={{display : "flex", flexDirection : "column", height : "120px"}}>
                <div className="center">
                    <AccountCircleOutlinedIcon style={{marginRight : 25, marginTop : 6}}/>
                    <TextField multiline label="Login" variant="outlined" size="small"/>
                </div>
                <div style={{margin : "10px 10px"}} className="center" >
                    <VpnKeyOutlinedIcon style={{marginRight : 25, marginTop : 6}}/>
                    <TextField multiline label="Mot de passe" variant="outlined" size="small"/>
                </div>
            </div>
            <Button style={{margin : "50px auto"}} variant="outlined" color="primary">Connexion</Button>
        </div>
    )

}
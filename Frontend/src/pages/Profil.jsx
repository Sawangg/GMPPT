import React, { useState } from 'react';
import { Button, Typography} from '@material-ui/core';

import InputPassword from '../components/InputPassword';
import PopUp from '../components/PopUp';
import DropFile from '../components/DropFile'

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUserName, changePassword, setUserImage, getUserImage } from "../slice/UserSlice";

import '../styles/Profil.css'

import { setPwdUserAPI } from '../utils/api.js';

export default function Profile() {

    const user = useSelector(selectUserName);
    const dispatch = useDispatch();

    const [openPopUp, setOpenPopUp] = useState(false);
    const [password, setPassword] = useState({oldPassword : "", newPassword  :"", error : false});
    const [image, setImage] = useState("")

    const changePasswordAPI = () => {
        if(password.oldPassword === user.password) {
            setPwdUserAPI(user.name, password.newPassword)
            .then(() => {
                dispatch(changePassword(password.newPassword));
                setOpenPopUp(true);
            }).catch(() => {
                setPassword({oldPassword : password.oldPassword, newPassword : password.newPassword, error : true})
            });
        } else {
            setPassword({oldPassword : password.oldPassword, newPassword : password.newPassword, error : true})
        }
    }
    
    return (
        <div id="carteProfil">
            {(user.image === undefined || user.image === "") ? null : <div id="image" style={{width : 220, height : 520, backgroundImage : "url('"+user.image+"')"}}/>}
            <div style={{height : 520, width : "100%"}} className="center">
                <Typography style={{marginTop : "2%"}} align="center" gutterBottom variant="h2" component="h2">{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</Typography>
                <div id="dropPhotoProfil">
                    <DropFile typeFile='image/*' compressImage={true} changeFile={e => setImage(e)}  message="Importer une nouvelle image de profil"/>
                    <Button  
                        id="buttonEnvoyerImageProfil"
                        disabled={image === ""}
                        onClick={() => {
                            dispatch(setUserImage({name : user.name, image : image}));
                            dispatch(getUserImage(user.name));
                    }}>
                        Enregistrer l'image
                    </Button>
                </div>
                <div id="divPasswordChange">
                    <InputPassword label={"Mot de passe actuel"} error={password.error} 
                            onChange={e =>  setPassword({oldPassword : e.target.value, newPassword : password.newPassword, error : false})}
                    />
                    <InputPassword label={"Nouveau mot de passe"} error={password.error} 
                            onChange={e => setPassword({oldPassword : password.oldPassword, newPassword : e.target.value, error : false})}
                    />
                    <Button id="buttonChangePwd" size="small" color="primary" onClick={e => changePasswordAPI()}>Changer de mot de passe</Button>
                </div>           
                <PopUp severity="success" message="Changement de mot de passe réussi" open={openPopUp} handleClose={e => setOpenPopUp(false)}/>
            </div>
        </div>
        
    );
}
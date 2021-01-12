import React, { useState } from 'react';
import {Button, makeStyles, Typography} from '@material-ui/core';

import InputPassword from '../components/InputPassword';
import PopUp from '../components/PopUp';
import DropFile from '../components/DropFile'

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUserName, changePassword, setUserImage } from "../slice/UserSlice";

import '../styles/Profil.css'

import { setPwdUserAPI } from '../utils/api.js';

export default function Profile() {

    const useStyles = makeStyles((theme) => ({
        carteProfil: {
            display: "flex",
            width: "60%",
            margin: "auto",
            boxShadow: "-2px 5px 12px 4px rgba(0,0,0,0.62)",
        },
        imageProfil: {
            width : 220,
            height : 536,
            backgroundSize: "cover",
            backgroundPosition: "center"
        },
        wrapper: {
            height : 520,
            width : "100%",
            marginTop : "2%"
        },
        dropPhotoProfil: {
            width : "70%",
            margin : "auto"
        },
        buttonEnvoyerImageProfil: {
            display : "block",
            margin : "2% auto"
        },
        divPasswordChange: {
            display : "flex",
            flexDirection : "column",
            marginTop : "5%",
            marginLeft : "48px"
        },
        buttonChangePwd: {
            margin : "auto",
            marginTop : "1%",
            position: "relative",
            right : "24px",
            color: theme.palette.primary.main
        }
    }));

    const classes = useStyles();

    const user = useSelector(selectUserName);
    const dispatch = useDispatch();

    const [openPopUp, setOpenPopUp] = useState(false);
    const [password, setPassword] = useState({oldPassword : "", newPassword  :"", error : false});
    const [image, setImage] = useState("");

    const changePasswordAPI = () => {
        setPwdUserAPI(user.name, { oldPassword : password.oldPassword, newPassword : password.newPassword }).then(() => {
            dispatch(changePassword(password.newPassword));
            setOpenPopUp(true);
        }).catch(() => {
            setPassword({oldPassword : password.oldPassword, newPassword  : password.newPassword, error : true });
        });
    }
    
    return (
        <div className={classes.carteProfil} id="carteProfil">
            {(user.image === undefined || user.image === "") ? null : <div className={classes.imageProfil} style={{backgroundImage : "url('"+user.image+"')"}} id="image"/>}
            <div className={classes.wrapper}>
                <Typography align="center" gutterBottom variant="h2" component="h2">{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</Typography>
                <div className={classes.dropPhotoProfil}>
                    <DropFile typeFile='image/*' compressImage={true} changeFile={e => setImage(e)}  message="Importer une nouvelle image de profil"/>
                    <Button
                        className={classes.buttonEnvoyerImageProfil}
                        disabled={image === ""}
                        onClick={() => dispatch(setUserImage({name : user.name, image : image}))}
                    >
                        Enregistrer l'image
                    </Button>
                </div>
                <div className={classes.divPasswordChange} id="divPasswordChange">
                    <InputPassword label={"Mot de passe actuel"} error={password.error} 
                            onChange={e =>  setPassword({oldPassword : e.target.value, newPassword : password.newPassword, error : false})}
                    />
                    <InputPassword label={"Nouveau mot de passe"} error={password.error} 
                            onChange={e => setPassword({oldPassword : password.oldPassword, newPassword : e.target.value, error : false})}
                    />
                    <Button className={classes.buttonChangePwd} size="small" onClick={() => changePasswordAPI()}>Changer de mot de passe</Button>
                </div>           
                <PopUp severity="success" message="Changement de mot de passe réussi" open={openPopUp} handleClose={e => setOpenPopUp(false)}/>
            </div>
        </div>
    );
}
import React, { useState } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';

import InputPassword from '../components/InputPassword';
import PopUp from '../components/PopUp';
import DropFile from '../components/DropFile'

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUserName, setUserImage, deleteUserImage } from "../slice/UserSlice";

import { setPwdUserAPI } from '../utils/api.js';

export default function Profile() {

    const useStyles = makeStyles((theme) => ({
        carteProfil: {
            display: "flex",
            width: "60%",
            height: "max-content",
            margin: "0 auto 2% auto",
            boxShadow: "-2px 5px 12px 4px rgba(0,0,0,0.62)",
        },
        imageProfil: {
            width: 220,
            height: "100",
            backgroundSize: "cover",
            backgroundPosition: "center",
            [theme.breakpoints.down('sm')]: {
                display: "none"
            }
        },
        wrapper: {
            height: "100%",
            width: "100%",
        },
        dropPhotoProfil: {
            height: "40%",
            width: "100%",
            margin: "auto"
        },
        buttonEnvoyerImageProfil: {
            display: "block",
            margin: "3% auto"
        },
        hr: {
            width: "70%"
        },
        divPasswordChange: {
            width: "max-content",
            display: "flex",
            flexDirection: "column",
            margin: "2% auto",
        },
        buttonChangePwd: {
            margin: "2% auto",
        }
    }));

    const classes = useStyles();

    const user = useSelector(selectUserName);
    const dispatch = useDispatch();

    const [openPopUp, setOpenPopUp] = useState(false);
    const [password, setPassword] = useState({ oldPassword: "", newPassword: "", error: false });
    const [image, setImage] = useState("");

    const changePasswordAPI = () => {
        setPwdUserAPI(user.name, { oldPassword: password.oldPassword, newPassword: password.newPassword }).then(() => {
            setOpenPopUp(true);
        }).catch(() => {
            setPassword({ oldPassword: password.oldPassword, newPassword: password.newPassword, error: true });
        });
    }

    return (
        <div className={classes.carteProfil}>
            {(user.image === undefined || user.image === "") ? null : <div className={classes.imageProfil} style={{ backgroundImage: "url('" + user.image + "')" }} />}
            <div className={classes.wrapper}>
                <Typography align="center" gutterBottom variant="h2" component="h2">{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</Typography>
                <div className={classes.dropPhotoProfil}>
                    <DropFile typeFile='image/*' compressImage={true} changeFile={e => setImage(e)} message="Importer une nouvelle image de profil" />
                    <Button
                        className={classes.buttonEnvoyerImageProfil}
                        variant="contained"
                        color="primary"
                        disabled={image === ""}
                        onClick={() => dispatch(setUserImage({ name: user.name, image: image }))}
                    >
                        Enregistrer l'image
                    </Button>
                    <Button
                        className={classes.buttonEnvoyerImageProfil}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            dispatch(deleteUserImage()).then().catch();
                        }}
                    >
                        Supprimer l'image actuelle
                    </Button>
                </div>
                <hr className={classes.hr} />
                <div className={classes.divPasswordChange} id="divPasswordChange">
                    <InputPassword label={"Mot de passe actuel"} error={password.error}
                        onChange={e => setPassword({ oldPassword: e.target.value, newPassword: password.newPassword, error: false })}
                    />
                    <InputPassword label={"Nouveau mot de passe"} error={password.error}
                        onChange={e => setPassword({ oldPassword: password.oldPassword, newPassword: e.target.value, error: false })}
                    />
                    <Button className={classes.buttonChangePwd} variant="contained" color="primary" size="small" onClick={e => changePasswordAPI()}>Changer de mot de passe</Button>
                </div>
                <PopUp severity="success" message="Changement de mot de passe réussi" open={openPopUp} handleClose={e => setOpenPopUp(false)} />
            </div>
        </div>
    );
}
import React, { useState } from 'react';
import { Button, makeStyles, TextField, Typography } from '@material-ui/core';

import InputPassword from '../components/InputPassword';
import PopUp from '../components/PopUp';
import DropFile from '../components/DropFile';

import { useDispatch, useSelector } from "react-redux";
import { selectUserName, setUserImage, deleteUserImage } from "../slice/UserSlice";

import { setPwdUserAPI, addNewProfAPI } from '../utils/api.js';

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
        },
        rootNewProf: {
            display: "flex",
            width: "max-content",
            flexDirection: "column",
            margin: "2% auto 4%",
            alignItems: "center",
        },
        marginNewProf: {
            margin: "4px",
        }
    }));

    const classes = useStyles();

    const user = useSelector(selectUserName);
    const dispatch = useDispatch();

    const [popUp, setPopUp] = useState({ message: "", severity: "", open: false });
    const [password, setPassword] = useState({ oldPassword: "", newPassword: "", error: false });
    const [image, setImage] = useState("");
    const [prof, setProf] = useState({ username: "", password: "" });

    const changePasswordAPI = () => {
        setPwdUserAPI(user.name, { oldPassword: password.oldPassword, newPassword: password.newPassword }).then(() => {
            setPopUp({ message: "Changement de mot de passe réussi", severity: "success", open: true });
        }).catch(() => {
            setPassword({ oldPassword: password.oldPassword, newPassword: password.newPassword, error: true });
            setPopUp({ message: "Échec du changement de mot de passe", severity: "error", open: true });
        });
    }

    const addNewProf = () => {
        console.log(prof)
        addNewProfAPI(prof.username, prof.password).then(() => {
            setPopUp({ message: "Ajout d'un nouveau compte professeur réussi", severity: "success", open: true });
        }).catch(() => {
            setPopUp({ message: "Ajout d'un nouveau compte professeur échoué", severity: "error", open: true });
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
                        onClick={() => {
                            dispatch(setUserImage({ name: user.name, image: image })).then(() => {
                                setPopUp({ message: "L'image a été ajouté avec succès", severity: "success", open: true });
                            }).catch(() => {
                                setPopUp({ message: "Échec de l'ajout de l'image", severity: "error", open: true });
                            });
                        }}
                    >
                        Enregistrer l'image
                    </Button>
                    <Button
                        className={classes.buttonEnvoyerImageProfil}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            dispatch(deleteUserImage()).then(() => {
                                setPopUp({ message: "L'image a été suprimée avec succès", severity: "success", open: true });
                            }).catch(() => {
                                setPopUp({ message: "Échec de la suppression de l'image", severity: "error", open: true });
                            });
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
                    <Button className={classes.buttonChangePwd} variant="contained" color="primary" size="small" onClick={() => changePasswordAPI()}>Changer de mot de passe</Button>
                </div>
                {user.name === "root"
                    ?
                    <>
                        <hr className={classes.hr} />
                        <div className={classes.rootNewProf}>
                            <Typography align="center" gutterBottom variant="h5" component="h5">Création d'un nouveau compte professeur</Typography>
                            <TextField style={{ margin: "4px" }} label="Nom d'utilisateur" size="small" variant="outlined" onChange={e => setProf({ username: e.target.value, password: prof.password })} />
                            <InputPassword className={classes.marginNewProf} label={"Mot de passe"} onChange={e => setProf({ username: prof.username, password: e.target.value })} />
                            <Button className={classes.marginNewProf} variant="contained" color="primary" size="small" disabled={prof.username === "" || prof.password === ""} onClick={() => addNewProf()}>Ajouter le nouveau compte</Button>
                        </div>
                    </>
                    : null}
                <PopUp severity={popUp.severity} message={popUp.message} open={popUp.open} handleClose={() => setPopUp({ message: "", severity: "success", open: false })} />
            </div>
        </div>
    );
}
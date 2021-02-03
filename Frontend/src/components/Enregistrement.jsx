import React, {useState, useCallback, useEffect} from 'react';
import {Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent, Button } from '@material-ui/core';

import PopUp from './PopUp';
import useKeyPress from './use/useKeyPressCtrlS';
import useUnload from './use/useUnload';

import { useDispatch } from "react-redux";

const Enregistrement = ({isEnregistre, action, disabled}) => {

    const [openPopUp, setOpenPopUp] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

    const dispatch = useDispatch();
    const touche = useKeyPress();

    //ne pas quitter la page si pas enregistré dans la BD
    useUnload(!isEnregistre);

    useEffect(() => setOpenPopUp(true), [isEnregistre]);

    const envoyer = useCallback (() => {
        if (!isEnregistre && !disabled){
            dispatch(action)
            .then((e) => {
                if (e.meta.requestStatus === "rejected"){
                     if (e.error.message === "Request failed with status code 405") setOpenDialog(true);
                } 
            })
        }
    }, [dispatch, action, isEnregistre, disabled]);
        
    useEffect(() => {
        if (touche){
            envoyer();
        }
    }, [touche]); //ne pas ajouter envoyer ! sinon ca ne marche plus

     return (
         <>
            <PopUp
                severity={isEnregistre ? "success" : "warning"}
                message={isEnregistre ? "Enregistré" : "Enregistrer les modifications"}
                actionName={isEnregistre ? null : "Enregistrer"}
                action={() => {if (!isEnregistre) envoyer()}}
                disabled={disabled}
                open={openPopUp}
                handleClose={() => {if (isEnregistre) setOpenPopUp(false)}}
                pos="left"
            />
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Attention</DialogTitle>
                <DialogContent>
                      <DialogContentText>Après vérification, le sujet que vous voulez modifier est déja associé à une architecture, que voulez-vous faire ?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">Abandonner</Button>
                    <Button onClick={() => console.log("liaision supp à faire")} color="primary" autoFocus>Enregistrer et supprimer l'association</Button>
                </DialogActions>
            </Dialog>
         </>
     )
}

export default React.memo(Enregistrement);
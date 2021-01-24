import React, {useState, useCallback, useEffect} from 'react';
import {Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent, Button } from '@material-ui/core';

import PopUp from './PopUp';

import { useDispatch } from "react-redux";

const Enregistrement = ({isEnregistre, action}) => {

    const [openPopUp, setOpenPopUp] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => setOpenPopUp(true), [isEnregistre]);

    const envoyer = useCallback (() => {
        dispatch(action)
        .then((e) => {
            if (e.meta.requestStatus === "rejected"){
                if (e.error.message === "Request failed with status code 405") setOpenDialog(true);
            } 
        })
    }, [dispatch, action]) 

     return (
         <>
            <PopUp
                severity={isEnregistre ? "success" : "warning"}
                message={isEnregistre ? "Enoncé enregistré" : "Enregistrer les modifications"}
                actionName={isEnregistre ? null : "Enregistrer"}
                action={() => {if (!isEnregistre) envoyer()}}
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
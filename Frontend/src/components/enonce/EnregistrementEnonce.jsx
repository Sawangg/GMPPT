import React, {useState, useCallback, useEffect} from 'react';
import {Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent, Button } from '@material-ui/core';

import PopUp from '../PopUp';

import { useDispatch, useSelector } from "react-redux";
import { selectEnonce, selectEnregistreEnonce, setQuestions } from "../../slice/EnoncesSlice";
import { selectIdModeleSelectionne } from "../../slice/ModeleSlice";

const EnregistrementEnonce = () => {

    const [openPopUp, setOpenPopUp] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

    const dispatch = useDispatch();
    const isEnregistreEnonce = useSelector(selectEnregistreEnonce);
    const idModele = useSelector(selectIdModeleSelectionne);
    const enonce = useSelector(selectEnonce);

    useEffect(() => {
        setOpenPopUp(true)
    }, [isEnregistreEnonce])

    const envoyer = useCallback (() => {
        dispatch(setQuestions({ idModele : idModele, enonce : enonce.enonceContenu, tabQuestions : enonce.question }))
        .then((e) => {
            if (e.meta.requestStatus === "rejected"){
                if (e.error.message === "Request failed with status code 405") setOpenDialog(true);
            } 
        })
    }, [dispatch, idModele, enonce]) 

     return (
         <>
            <PopUp
                severity={isEnregistreEnonce ? "success" : "warning"}
                message={isEnregistreEnonce ? "Enoncé enregistré" : "Enregistrer les modifications"}
                actionName={isEnregistreEnonce ? null : "Enregistrer"}
                action={() => {if (!isEnregistreEnonce) envoyer()}}
                open={openPopUp}
                handleClose={() => {if (isEnregistreEnonce) setOpenPopUp(false)}}
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

export default React.memo(EnregistrementEnonce);
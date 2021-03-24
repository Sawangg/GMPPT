import React, { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent, Button } from '@material-ui/core';

import { getModelPromoAPI, desatributionSujetAPI } from "../utils/api";

import PopUp from './PopUp';
import useKeyPress from './use/useKeyPressCtrlS';
import useUnload from './use/useUnload';

import { useDispatch } from "react-redux";

const Enregistrement = ({ isEnregistre, action, disabled }) => {

    const [openPopUp, setOpenPopUp] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [listePromo, setListePromo] = useState([]);

    const dispatch = useDispatch();
    const touche = useKeyPress();

    //ne pas quitter la page si pas enregistré dans la BD
    useUnload(!isEnregistre);

    useEffect(() => setOpenPopUp(true), [isEnregistre]);

    const envoyer = useCallback(() => {
        if (!isEnregistre && !disabled) {
            dispatch(action).then((e) => {
                if (e.meta.requestStatus === "rejected") {
                    if (e.error.message === "Request failed with status code 405") {
                        if (listePromo.length === 0) {
                            getModelPromoAPI().then((d) => {
                                setListePromo(d.data);
                            });
                        }
                        setOpenDialog(true);
                    }
                }
            });
        }
    }, [dispatch, action, isEnregistre, disabled, listePromo]);

    const suppAsso = (e) => {
        desatributionSujetAPI(e.id_promo).then().catch();
        let tempTab = [...listePromo];
        tempTab.splice(listePromo.indexOf(e), 1);
        setListePromo(tempTab);
    }

    useEffect(() => {
        if (touche) {
            envoyer();
        }
    }, [touche, envoyer]); //ne pas ajouter envoyer ! sinon ca ne marche plus

    return (
        <>
            <PopUp
                severity={isEnregistre ? "success" : "warning"}
                message={isEnregistre ? "Enregistré" : "Enregistrer les modifications"}
                actionName={isEnregistre ? null : "Enregistrer"}
                action={() => { if (!isEnregistre) envoyer() }}
                disabled={disabled}
                open={openPopUp}
                handleClose={() => { if (isEnregistre) setOpenPopUp(false) }}
                pos="left"
            />
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Attention</DialogTitle>
                <DialogContent>
                    <DialogContentText>Le sujet est associé à une architecture, que voulez-vous faire ?</DialogContentText>
                    {listePromo.map((e, index) => (
                        <div key={index} style={{ display: "flex" }}>
                            <p style={{ margin: "auto 0" }}>{e.nom_promo}</p>
                            <Button onClick={() => suppAsso(e)} size="small" variant="contained" style={{ marginLeft: 20 }}>Supprimer l'association</Button>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">Abandonner</Button>
                    <Button onClick={() => {
                        envoyer();
                        setOpenDialog(false);
                    }} disabled={listePromo.length > 0} color="primary" autoFocus>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default React.memo(Enregistrement);
import React, { useState } from 'react';
import { LinearProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

import MenuProfil from '../../components/MenuProfil';
import { makeStyles } from "@material-ui/core";
import useConstructor from '../../components/use/useContructor';

import { useDispatch, useSelector } from "react-redux";
import { getSujet, selectSujetEnregistre, etudiantVariables, getModele3D, getEtudiantModele } from "../../slice/RepondreQuestionsSlice";
import { logoutUser } from "../../slice/UserSlice";

export default function Accueil(props) {

    const useStyles = makeStyles(() => ({
        divProgress: {
            width: "50%",
            margin: "auto"
        }
    }));

    const classes = useStyles();

    const dispatch = useDispatch();
    const isEnregistre = useSelector(selectSujetEnregistre);
    const [open, setOpen] = useState(false);

    useConstructor(() => {
        if (!isEnregistre) {
            dispatch(getEtudiantModele()).then(modele => {
                if (modele.payload[0] !== undefined) {
                    dispatch(getSujet(modele.payload[0].id_modele)).then((sujet) => {
                        dispatch(etudiantVariables(sujet.payload.id_auth));
                        dispatch(getModele3D(sujet.payload.id_auth));
                    });
                } else {
                    setOpen(true);
                }
            })
        }
    });

    return (
        <>
            <div>
                <MenuProfil info={props.info} />
            </div>
            <Dialog open={open} onClose={() => setOpen(true)}>
                <DialogTitle>Sujet non attribué</DialogTitle>
                <DialogContent>
                    <DialogContentText>Ton sujet n'a pas encore été attribué, contactes le professeur en cas de problème ou reviens plus tard</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => dispatch(logoutUser())} color="primary">Quitter</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
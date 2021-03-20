import React, { useState } from 'react';
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core';
import { CSVDownload  } from "react-csv";

import PopUp from '../PopUp';
import DropFile from '../DropFile';

import { etudiantNewAPI } from '../../utils/api';

export default function AjoutListeEtu({ open, setClose, selectPromo }) {

    const [excel, setExcel] = useState("");
    const [csvData, setCsvData] = useState([]);
    const [openPopUp, setOpenPopUp] = useState(false);

    const envoieExcel = () => {
        const data = new FormData();
        data.append('fileUploaded', excel);
        etudiantNewAPI(selectPromo, data).then(response => {                      
            let tab = [];
            response.data.forEach(elem => {
                tab.push({"Nom" : elem.nom, "Prenom" : elem.prenom, "Pseudo" : elem.username, "Mot de passe" : elem.pwd});
            })
            setCsvData(tab);
            setClose();
        }).catch(err => console.log(err));
        setOpenPopUp(true);
    };

    return (
        <>
        {csvData.length > 0 ? <CSVDownload data={csvData} separator={";"}></CSVDownload> : null}
        <Dialog open={open} onClose={() => setClose()}>
            <DialogTitle>Charger une promotion</DialogTitle>
            <DialogContent>
                <DialogContentText>Charger la liste excel de vos étudiants </DialogContentText>
                <DropFile typeFile='.xlsx' compressImage={false} changeFile={e => setExcel(e)} message="Charger la liste des étudiants de la promotion" />
                <PopUp severity="success" message="Etudiants ajoutés à la promotion" open={openPopUp} handleClose={() => setOpenPopUp(false)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setClose()} color="primary">Abandonner</Button>
                <Button disabled={excel === ""} onClick={() => envoieExcel()} color="primary" autoFocus>Charger</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}
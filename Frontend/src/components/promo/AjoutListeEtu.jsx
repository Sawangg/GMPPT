import React, {useState} from 'react'
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, DialogContentText, Select, InputLabel, Input, MenuItem, FormControl } from '@material-ui/core';

import PopUp from '../PopUp';
import DropFile from '../DropFile';

import { etudiantNewAPI } from '../../utils/api'

export default function AjoutListeEtu ({open, setClose, selectPromo}){

    const [excel, setExcel] = useState("");
    const [openPopUp, setOpenPopUp] = useState(false);

    const envoieExcel = () => {
        const data = new FormData();
        data.append('fileUploaded', excel);
        etudiantNewAPI(selectPromo, data).then(fichier => console.log(fichier)).catch((err) => console.log(err));
        setOpenPopUp(true);
    };

    return (
        <Dialog open={open} onClose={() => setClose()}>
            <DialogTitle>Charger une promotion</DialogTitle>
            <DialogContent>
                    <DialogContentText>Charger la liste excel de vos étudiants </DialogContentText>
                    <DropFile typeFile='.xlsx' compressImage={false} changeFile={e => setExcel(e)}  message="Charger la liste des étudiants de la promotion"/>
                    <PopUp severity="success" message="Etudiants ajoutés à la promotion" open={openPopUp} handleClose={() => setOpenPopUp(false)}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setClose()} color="primary">Abandonner</Button>
                <Button disabled={excel === ""} onClick={() => envoieExcel()} color="primary" autoFocus>Charger</Button>
            </DialogActions>
        </Dialog>
    )
}
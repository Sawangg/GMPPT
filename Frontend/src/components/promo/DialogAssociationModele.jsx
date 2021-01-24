import React, {useState} from 'react'
import {
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Select,
    InputLabel,
    Input,
    MenuItem,
    FormControl,
    makeStyles
} from '@material-ui/core';

import PopUp from '../PopUp';

import { selectModele } from "../../slice/ModeleSlice";
import { useSelector } from "react-redux";

import { attributionSujetAPI } from '../../utils/api'

export default function DialogAssociationModele({open, setClose, selectPromo}){
    const useStyles = makeStyles((theme) => ({
        formControl: {
            width: 200
        }
    }));
    const classes = useStyles();

    const modele = useSelector(selectModele);

    const [openPopUp, setOpenPopUp] = useState(false);
    const [selectionModele, setSelectionModele] = useState("");
    
    const envoieAttribution = () => {
        attributionSujetAPI(selectPromo, selectionModele);
        setSelectionModele("");
        setOpenPopUp(true);
    };

    return (
        <Dialog open={open} onClose={() => setClose()}>
            <DialogTitle>Association à un modèle</DialogTitle>
            <DialogContent>
                    <DialogContentText>Associer une promotion à un modéle (empechera par la suite de modifier le modèle) ?</DialogContentText>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Modèle selectionné</InputLabel>
                        <Select value={selectionModele} onChange={e => setSelectionModele(e.target.value)} input={<Input/>}>
                            {modele.tabName.map((element, index) => (
                                <MenuItem key={index} value={element.index}>{element.nom}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <PopUp severity="success" message="Association réussie" open={openPopUp} handleClose={() => setOpenPopUp(false)}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setClose()} color="primary">Abandonner</Button>
                <Button disabled={selectionModele === ""} onClick={() => envoieAttribution()} color="primary" autoFocus>Ok</Button>
            </DialogActions>
        </Dialog>
    )

}
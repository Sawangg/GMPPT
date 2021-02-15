import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    DialogContentText,
    Input,
    MenuItem,
    FormControl,
    Select,
    TextField,
    Fab,
    makeStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PropagateLoader from "react-spinners/PropagateLoader";

import { useDispatch, useSelector } from "react-redux";
import { getCategoriesFormules } from "../slice/FormulesSlice";
import { getAllVariables } from "../slice/VariablesAleatoiresSlice"
import { getSujet } from "../slice/EnoncesSlice";
import { getAllUnite } from '../slice/UniteSlice';
import { selectionnerModele, addNewModele, removeModele, selectModele, selectActualise} from "../slice/ModeleSlice";

//setClose pour fermer la PopUp (fonction)
//open pour connaitre l'état de la pop u (ouvert ou fermé)
//tard pour savoir si on autorise a selectionner plus tard le modèle
const SelectionModele = ({setClose, open, tard}) => {

    const useStyles = makeStyles((theme) => ({
        divNouveauModele: {
            display : "grid",
            gridTemplateColumns : "80% 20%",
            gridGap : "7%",
            marginTop : 30
        },
        fabAdd: {
            marginLeft : "5%"
        },
        form: {
            display : "flex",
            justifyContent : "center",
            marginBottom : 20
        },
        divSelectModele: {
            display : "grid",
            gridTemplateColumns : "80% 20%",
            gridGap : "7%",
            marginTop : 15
        },
        selectModele: {
            width : 200
        },
        menuItem: {
            color : theme.palette.primary.main
        },
        fabDelete: {
            margin: "5%",
            color: "white",
            backgroundColor: theme.palette.error.main,
            "&:hover": {
                backgroundColor: theme.palette.error.dark
            }
        },
        dialogActions: {
            marginBottom:"3%",
            justifyContent : "space-around"
        },
        buttonLater: {
            backgroundColor: theme.palette.primary.light
        }
    }));
    const classes = useStyles();

    const dispatch = useDispatch();
    const modele = useSelector(selectModele);
    const actualise = useSelector(selectActualise);

    const [select, setSelect] = useState(modele.idModeleSelectionne === null ? "" : modele.idModeleSelectionne);
    const [nouveauModele, setNouveauModele] = useState({etat : false, nom : "", error : false});
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleChange = (event) => {
        setSelect(event.target.value);
        event.target.value === "Créer nouveau modèle" 
            ? setNouveauModele({etat : true, nom : nouveauModele.nom, error : false}) 
            : setNouveauModele({etat : false, nom : nouveauModele.nom, error : false});
    };

    const choisirModele = () => {
        if (select.toString() !== modele.idModeleSelectionne.toString()) { //to string car pas même type quand recupere depuis le cache
            dispatch(selectionnerModele(select));
            dispatch(getCategoriesFormules(select));
            dispatch(getAllVariables(select));
            dispatch(getSujet(select));
            dispatch(getAllUnite());
        }
        setClose();
    }

    const onChangeNouveauModele = (e) => {
        setNouveauModele({etat : true, nom : e.target.value, error : false})
    }

    const addNouveauModele = () => {
        if (modele.tabName.includes(nouveauModele.nom)){
            setNouveauModele({etat : true, nom : nouveauModele.nom, error : true})
        } else {
            dispatch(addNewModele(nouveauModele.nom));
            setNouveauModele({etat : true, nom : "", error : false})
        }
    }

    const displayNouveauModele = () => {
        return (
            nouveauModele.etat 
            ? <div className={classes.divNouveauModele}>
                <TextField autoFocus size="small" label="Nom du modèle" variant="outlined" required 
                    error={nouveauModele.error} 
                    value={nouveauModele.nom} 
                    onChange={e => onChangeNouveauModele(e)}
                />
                <Fab className={classes.fabAdd}
                    size="small" color="primary" aria-label="add" 
                    disabled={nouveauModele.nom === "" ? true : false} 
                    onClick={() => addNouveauModele()}>
                    <AddIcon />
                </Fab>
            </div>
            : null
        );
    }

    return (
        <div>
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={() => setClose()}>
            <DialogTitle>Selection du modèle de sujet</DialogTitle>
            <DialogContent>
            <form className={classes.form}>
                <FormControl>
                <InputLabel>Modèle</InputLabel>
                <div className={classes.divSelectModele}>
                    <Select className={classes.selectModele} value={select} onChange={handleChange} input={<Input/>}>
                    <MenuItem className={classes.menuItem} value="Créer nouveau modèle">Créer nouveau modèle</MenuItem>
                    {!actualise ? <PropagateLoader size={15} color={"rgb(7, 91, 114)"} css={{margin : "30px auto", display : "flex", justifyContent : "center"}}/> : modele.tabName.map(item => <MenuItem key={item.index} value={item.index}>{item.nom}</MenuItem>)}
                    </Select>
                    <Fab className={classes.fabDelete} size="small" aria-label="delete"
                        disabled={select === "" || nouveauModele.etat}
                        onClick={() => setOpenConfirm(true)}
                    >
                        <DeleteIcon/>
                    </Fab>
                </div>
                {displayNouveauModele()}
                </FormControl>
            </form>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
            {tard ? <Button className={classes.buttonLater} variant="contained" onClick={() => setClose()}>Choisir plus tard</Button> : null}
            <Button disabled={select === "" || select === "Créer nouveau modèle" ? true : false} onClick={e => choisirModele()} variant="contained" color="primary">Ok</Button>
            </DialogActions>
        </Dialog>
        <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
            <DialogTitle>Suppression</DialogTitle>
            <DialogContent>
                <DialogContentText>Voulez-vous vraiment supprimer ce modèle ?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenConfirm(false)} color="primary">Annuler</Button>
                <Button onClick={() => dispatch(removeModele(select))} disabled={select === ""} color="primary" autoFocus>OK</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

export default React.memo(SelectionModele);
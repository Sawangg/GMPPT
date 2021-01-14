import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
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

import useConstructor from './use/useContructor'

import { useDispatch, useSelector } from "react-redux";
import { getCategoriesFormules } from "../slice/FormulesSlice";
import { getAllVariables } from "../slice/VariablesAleatoiresSlice"
import { getQuestions } from "../slice/EnoncesSlice";
import { selectionnerModele, addNewModele, removeModele, getModele, selectModele, selectActualise} from "../slice/ModeleSlice";

//setClose pour fermer la PopUp (fonction)
//open pour connaitre l'état de la pop u (ouvert ou fermé)
//tard pour savoir si on autorise a selectionner plus tard le modèle
export default function SelectionModele({setClose, open, tard}) {

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

    const [select, setSelect] = useState("");
    const [nouveauModele, setNouveauModele] = useState({etat : false, nom : "", error : false});

    const dispatch = useDispatch();
    const modele = useSelector(selectModele);
    const actualise = useSelector(selectActualise);

    useConstructor(() => {
        if (!actualise) dispatch(getModele())
    });

    const handleChange = (event) => {
        setSelect(event.target.value);
        event.target.value === "Créer nouveau modèle" 
            ? setNouveauModele({etat : true, nom : nouveauModele.nom, error : false}) 
            : setNouveauModele({etat : false, nom : nouveauModele.nom, error : false});
    };

    const choisirModele = () => {
        if (select !== modele.idModeleSelectionne) {
            dispatch(selectionnerModele(select));
            dispatch(getCategoriesFormules(select));
            dispatch(getAllVariables(select));
            dispatch(getQuestions(select));
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
                        onClick={() => dispatch(removeModele(select))}
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
        </div>
    );
}


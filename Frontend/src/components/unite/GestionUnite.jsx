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
import BounceLoader from "react-spinners/BounceLoader";

import useConstructor from '../use/useContructor'

export default function DialogSelect(props) {
    const useStyles = makeStyles((theme) => ({
        divNouvelleUnite: {
            display : "grid",
            gridTemplateColumns : "80% 20%",
            gridGap : "7%",
            marginTop : 30
        },
        fabAjouterUnite: {
            marginLeft : "5%"
        },
        form: {
            display : "flex",
            justifyContent : "center",
            marginBottom : 20
        },
        divSelectUnite: {
            display : "grid",
            gridTemplateColumns : "80% 20%",
            gridGap : "7%",
            marginTop : 15
        },
        selectUnite: {
            width : 200
        },
        menuItem: {
            color : theme.palette.primary.main
        },
        dialogActions: {
            justifyContent : "space-around"
        }
    }));
    const classes = useStyles();

    const [select, setSelect] = useState("");
    const [nouveauModele, setNouveauModele] = useState({etat : false, nom : "", error : false});

  /*useConstructor(() => {
    });*/

    const handleChange = (event) => {
        setSelect(event.target.value);
        event.target.value === "Créer nouveau modèle" 
            ? setNouveauModele({etat : true, nom : nouveauModele.nom, error : false}) 
            : setNouveauModele({etat : false, nom : nouveauModele.nom, error : false});
    };

    const choisirUnite = () =>{
        /*if (select !== modele.idModeleSelectionne){
            dispatch(selectionnerModele(select));
            dispatch(setTab(select));
            dispatch(getAllVariables(select))
        }
        props.setClose();*/
    }

    const onChangeNouveauModele = (e) =>{
        setNouveauModele({etat : true, nom : e.target.value, error : false})
    }

    const addNouvelleUnite = () =>{
        /*if (modele.tabName.includes(nouveauModele.nom)){
            setNouveauModele({etat : true, nom : nouveauModele.nom, error : true})
        } else {
            dispatch(addNewModele(nouveauModele.nom));
            setNouveauModele({etat : true, nom : "", error : false})
        }*/
    }

    const displayNouvelleUnite = () =>{
        return (
            nouveauModele.etat 
            ? <div className={classes.divNouvelleUnite}>
                <TextField autoFocus size="small" label="Nom du modèle" variant="outlined" required 
                    error={nouveauModele.error} 
                    value={nouveauModele.nom} 
                    onChange={e => onChangeNouveauModele(e)}
                />
                <Fab className={classes.fabAjouterUnite} size="small" color="primary" aria-label="add" onClick={e => addNouvelleUnite()}>
                    <AddIcon />
                </Fab>
            </div>
            : null
        )
    }

    return (
        <div>
        <Dialog disableBackdropClick disableEscapeKeyDown open={props.open} onClose={() => props.setClose()}>
            <DialogTitle>Gérer les unités</DialogTitle>
            <DialogContent>
            <form className={classes.form}>
                <FormControl>
                    <InputLabel>Unité</InputLabel>
                    <div className={classes.divSelectUnite}>
                        <Select className={classes.selectUnite} value={select} onChange={handleChange} input={<Input/>}>
                        <MenuItem className={classes.menuItem} value="Créer nouveau modèle">Ajouter unité</MenuItem>
                        </Select>
                        {/* {chargementSupp
                        ?<BounceLoader size={40} color={"rgb(7, 91, 114)"} css={{marginLeft : "5%", display : "block"}}/>
                        :<Fab style={{marginLeft : "5%"}} size="small" color="secondary" aria-label="delete"
                            disabled={select === "" || nouveauModele.etat}
                            onClick={() => dispatch(removeModele(select))}
                        >
                            <DeleteIcon/>
                        </Fab>
                        } */}
                    </div>
                    {displayNouvelleUnite()}
                </FormControl>
            </form>
            </DialogContent>
            <DialogActions classeName={classes.dialogActions}>
            {props.tard ? <Button onClick={() => props.setClose()} color="primary">Choisir plus tard</Button> : null}
            <Button disabled={select === "" || select === "Créer nouveau modèle" ? true : false} onClick={e => choisirUnite()} color="primary">Ok</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}


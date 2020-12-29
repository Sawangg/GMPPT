import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Input, MenuItem,FormControl, Select, TextField, Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PropagateLoader from "react-spinners/PropagateLoader";
import BounceLoader from "react-spinners/BounceLoader";

import useConstructor from './use/useContructor'

import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../slice/FormulesSlice";
import {getAllVariables } from "../slice/VariablesAleatoiresSlice"
import { selectionnerModele, addNewModele, removeModele, getModele, selectModele, selectActualise, selectChargementSupp} from "../slice/ModeleSlice";

export default function DialogSelect(props) {
  const [select, setSelect] = useState("");
  const [nouveauModele, setNouveauModele] = useState({etat : false, nom : "", error : false});

  const dispatch = useDispatch();
  const modele = useSelector(selectModele);
  const actualise = useSelector(selectActualise);
  const chargementSupp = useSelector(selectChargementSupp);

  useConstructor(() => {
        if (!actualise) dispatch(getModele())
    });

    const handleChange = (event) => {
        setSelect(event.target.value);
        event.target.value === "Créer nouveau modèle" 
            ? setNouveauModele({etat : true, nom : nouveauModele.nom, error : false}) 
            : setNouveauModele({etat : false, nom : nouveauModele.nom, error : false});
    };

    const choisirModele = () =>{
        if (select !== modele.idModeleSelectionne){
            dispatch(selectionnerModele(select));
            dispatch(setTab(select));
            dispatch(getAllVariables(select))
        }
        props.setClose();
    }

    const onChangeNouveauModele = (e) =>{
        setNouveauModele({etat : true, nom : e.target.value, error : false})
    }

    const addNouveauModele = () =>{
        if (modele.tabName.includes(nouveauModele.nom)){
            setNouveauModele({etat : true, nom : nouveauModele.nom, error : true})
        } else {
            dispatch(addNewModele(nouveauModele.nom));
            setNouveauModele({etat : true, nom : "", error : false})
        }
    }

    const displayNouveauModele = () =>{
        return (
            nouveauModele.etat 
            ? <div style={{display : "grid", gridTemplateColumns : "80% 20%", gridGap : "7%", marginTop : 30}} >
                <TextField autoFocus size="small" label="Nom du modèle" variant="outlined" required 
                    error={nouveauModele.error} 
                    value={nouveauModele.nom} 
                    onChange={e => onChangeNouveauModele(e)}
                />
                <Fab style={{marginLeft : "5%"}} size="small" color="primary" aria-label="add" onClick={e => addNouveauModele()}>
                    <AddIcon />
                </Fab>
            </div>
            : null
        )
    }

    return (
        <div>
        <Dialog disableBackdropClick disableEscapeKeyDown open={props.open} onClose={() => props.setClose()}>
            <DialogTitle>Selection du modèle de sujet</DialogTitle>
            <DialogContent>
            <form style={{display : "flex", justifyContent : "center", marginBottom : 20}}>
                <FormControl>
                <InputLabel>Modèle</InputLabel>
                <div style={{display : "grid", gridTemplateColumns : "80% 20%", gridGap : "7%", marginTop : 15}} >
                <Select style={{width : 200}} value={select} onChange={handleChange} input={<Input/>}>
                <MenuItem value="Créer nouveau modèle" style={{color : "#075b72"}}>Créer nouveau modèle</MenuItem>
                {!actualise ? <PropagateLoader size={15} color={"rgb(7, 91, 114)"} css={{margin : "30px auto", display : "flex", justifyContent : "center"}}/> : modele.tabName.map(item => <MenuItem key={item.index} value={item.index}>{item.nom}</MenuItem>)}
                </Select>

                {chargementSupp 
                ?<BounceLoader size={40} color={"rgb(7, 91, 114)"} css={{marginLeft : "5%", display : "block"}}/>
                :<Fab style={{marginLeft : "5%"}} size="small" color="secondary" aria-label="delete" 
                    disabled={select === "" || nouveauModele.etat}
                    onClick={() => dispatch(removeModele(select))}
                >
                    <DeleteIcon/>
                </Fab>
                }
                
                    </div>
                {displayNouveauModele()}
                </FormControl>
            </form>
            </DialogContent>
            <DialogActions style={{justifyContent : "space-around"}}>
            {props.tard ? <Button onClick={() => props.setClose()} color="primary">Choisir plus tard</Button> : null}
            <Button disabled={select === "" || select === "Créer nouveau modèle" ? true : false} onClick={e => choisirModele()} color="primary">Ok</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}


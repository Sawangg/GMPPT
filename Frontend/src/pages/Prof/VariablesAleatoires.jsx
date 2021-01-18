import React, { useState } from 'react';
import {Fab, makeStyles, Typography} from '@material-ui/core';
import CircleLoader from "react-spinners/CircleLoader";
import AddIcon from '@material-ui/icons/Add';

import ItemVariablesAleatoire from '../../components/variable/ItemVariableAleatoire'
import useConstructor from '../../components/use/useContructor'
import PopUp from '../../components/PopUp'
import useUnload from '../../components/use/useUnload';
import SelectionModele from '../../components/SelectionModele'
import EnregistrementVariableAleatoires from '../../components/variable/EnregistrementVariableAleatoires'

import { useDispatch, useSelector } from "react-redux";
import { selectActualise, selectEnregistre, addVariable, undoVariable, getAllVariables, selectTabLength } from "../../slice/VariablesAleatoiresSlice"
import { selectIdModeleSelectionne } from "../../slice/ModeleSlice"

import '../../styles/VariablesAleatoires.css'

export default function VariablesAleatoires() {

    const useStyles = makeStyles((theme) => ({
        hr: {
            width: "80%",
            marginBottom: "2%"
        },
        fab: {marginLeft: "3%"},
        divItemvariable: {
            boxShadow: "0px 8px 20px -5px rgba(0,0,0,0.69)",
            padding: "2% 3% 4% 3%",
            width: "80%",
            margin: "auto"
        }
    }));
    const classes = useStyles();

    //gerer pop up pour le undo lors de suppression
    const [openPopUpUndo, setOpenPopUpUndo] = useState(false);

    //gere la pop up de selection de modelee
    const [openModele, setOpenModele] = useState(false);

    const dispatch = useDispatch();

    const lengthTab = useSelector(selectTabLength);
    //savoir si les variables sont récupérées de la BD
    const isEnregistre = useSelector(selectEnregistre);
    //savoir si la recupération les données sont conectées à la BD
    const isActualise = useSelector(selectActualise)
    const idModele = useSelector(selectIdModeleSelectionne);

    useConstructor(() => {
        //si pas encore récupérées de la BD 
        if (!isEnregistre) {
            idModele === null ? setOpenModele(true) : dispatch(getAllVariables(idModele));
        }
    });

    //ne pas quitter la page si pas enregistré dans la BD
    useUnload(!isEnregistre);

    const undo = () =>{
        dispatch(undoVariable());
        setOpenPopUpUndo(false);
     }

    const displayVariable = () =>{
        return (
            <div>
                <Typography variant="h1">Variables aléatoires</Typography>
                <hr className={classes.hr}/>
                <Fab className={classes.fab}
                    disabled={lengthTab >= 75}
                    size="small"
                    color="primary"
                    aria-label="add"
                    onClick={() => dispatch(addVariable())}
                >
                    <AddIcon />
                </Fab>
                <div className={classes.divItemvariable} id="divItemvariable">
                    {/* EVITE DE FAIRE PASSER LE TABLEAU DE VARIABLE ET DE MODIFIER TOUTES LES VARIABLES A CHAQUE CHANGEMENT D'UNE */}
                    {Array(lengthTab).fill(0).map((_, index) => (
                        <ItemVariablesAleatoire onRemove={() => setOpenPopUpUndo(true)} length={lengthTab} key={index} index={index}/>
                    ))}
                <PopUp 
                    message="Variable supprimée" 
                    actionName="RETOUR" 
                    action={() => undo()} 
                    open={openPopUpUndo} 
                    handleClose={() => setOpenPopUpUndo(false)}
                    pos="right"
                />
                </div>
                <EnregistrementVariableAleatoires/>
            </div>
        )
    }

    return (
        idModele === null 
        ? <SelectionModele tard={false} setClose={() => setOpenModele(false)} open={openModele}/> 
        : isActualise ? displayVariable() : <CircleLoader size={50} color={"rgb(7, 91, 114)"} css={{margin : "auto", display : "flex", justifyContent : "center"}}/>
    );
}
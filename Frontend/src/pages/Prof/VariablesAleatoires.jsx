import React, {useState, useEffect} from 'react';
import {Fab, makeStyles, Typography} from '@material-ui/core';
import CircleLoader from "react-spinners/CircleLoader";
import AddIcon from '@material-ui/icons/Add';

import ItemVariablesAleatoire from '../../components/variable/ItemVariableAleatoire'
import useConstructor from '../../components/use/useContructor'
import PopUp from '../../components/PopUp'
import useUnload from '../../components/use/useUnload';
import SelectionModele from '../../components/SelectionModele'

import { useDispatch, useSelector } from "react-redux";
import { selectVariablesAleatoires, selectActualise, selectEnregistre, setVariables, addVariable, removeVariable, undoVariable, getAllVariables } from "../../slice/VariablesAleatoiresSlice"
import { selectModele } from "../../slice/ModeleSlice"

import '../../styles/VariablesAleatoires.css'

export default function VariablesAleatoires() {

    const [open, setOpen] = useState(false);
        
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
    //gerer pop up d'enregistrement pour la BD
    const [openPopUpSave, setOpenPopUpSave] = useState(true);

    const dispatch = useDispatch();

    const tableauVariables = useSelector(selectVariablesAleatoires);
    //savoir si les variables sont récupérées de la BD
    const isEnregistre = useSelector(selectEnregistre);
    //savoir si la recupération les données sont conectées à la BD
    const isActualise = useSelector(selectActualise)
    const modele = useSelector(selectModele);

    useConstructor(() => {
        //si pas encore récupérées de la BD 
        if (!isEnregistre) {
            modele.idModeleSelectionne === null ? setOpen(true) : dispatch(getAllVariables(modele.idModeleSelectionne));
        }
    });

    useEffect(() => {
        setOpenPopUpSave(true)
    }, [isEnregistre])

    //ne pas quitter la page si pas enregistré dans la BD
    useUnload(!isEnregistre);

    //supprimer une ligne de variables aléatoires
    const remove = (index) =>{
        dispatch(removeVariable(index));
        setOpenPopUpUndo(true);
    }

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
                    disabled={tableauVariables.length >= 75}
                    size="small"
                    color="primary"
                    aria-label="add"
                    onClick={() => dispatch(addVariable())}
                >
                    <AddIcon />
                </Fab>
                <div className={classes.divItemvariable} id="divItemvariable">
                    {tableauVariables.map((item, id) => (
                        <ItemVariablesAleatoire removeVariable={() => remove(id)} length={tableauVariables.length} key={id} index={id} item={item}/>
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
                <PopUp 
                    severity={isEnregistre ? "success" : "warning"} 
                    message={isEnregistre ? "Variables enregistrées" : "Enregistrer les modifications"} 
                    actionName={isEnregistre ? null : "Enregistrer"} 
                    action={() => isEnregistre ? null : dispatch(setVariables({tab : tableauVariables, idModele : modele.idModeleSelectionne}))} 
                    open={openPopUpSave} 
                    handleClose={() => {if (isEnregistre) setOpenPopUpSave(false)}}
                    pos="left"
                    disabled={tableauVariables.some(variables => variables.modif)}
                />
            </div>
        )
    }

    return (
        modele.idModeleSelectionne === null 
        ? <SelectionModele tard={false} setClose={() => setOpen(false)} open={open}/> 
        : isActualise ? displayVariable() : <CircleLoader size={50} color={"rgb(7, 91, 114)"} css={{margin : "auto", display : "flex", justifyContent : "center"}}/>
    );
}
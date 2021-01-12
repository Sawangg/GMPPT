import React, {useState, useEffect} from 'react';
import {Fab, makeStyles} from '@material-ui/core';
import CircleLoader from "react-spinners/CircleLoader";
import AddIcon from '@material-ui/icons/Add';

import ItemVariablesAleatoire from '../../components/variable/ItemVariableAleatoire'
import useConstructor from '../../components/use/useContructor'
import PopUp from '../../components/PopUp'
import useUnload from '../../components/use/useUnload';

import { useDispatch, useSelector } from "react-redux";
import { selectVariablesAleatoires, selectActualise, selectEnregistre, setVariables, addVariable, removeVariable, undoVariable, getAllVariables } from "../../slice/VariablesAleatoiresSlice"
import { selectModele } from "../../slice/ModeleSlice"

import '../../styles/VariablesAleatoires.css'

export default function VariablesAleatoires() {

    const useStyles = makeStyles((theme) => ({
        h1: {textAlign : "center"},
        fab: {marginLeft: "3%"},
        divItemvariable: {
            boxShadow: "0px 8px 20px -5px rgba(0,0,0,0.69)",
            padding: "2% 3% 4% 3%",
            width: "80%",
            margin: "auto"
        }
    }));
    const classes = useStyles();

    const [openPopUpUndo, setOpenPopUpUndo] = useState(false);
    const [openPopUpSave, setOpenPopUpSave] = useState(true);

    const dispatch = useDispatch();
    const tab = useSelector(selectVariablesAleatoires);
    const isEnregistre = useSelector(selectEnregistre);
    const actualise = useSelector(selectActualise)
    const modele = useSelector(selectModele);

    useEffect(() => {
        setOpenPopUpSave(true)
    }, [isEnregistre])

    useConstructor(() => {
        if (!isEnregistre) dispatch(getAllVariables(modele.idModeleSelectionne));
    });

    useUnload(!isEnregistre);

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
                <h1 className={classes.h1}>Creation des variables aléatoires</h1>
                <Fab className={classes.fab}
                    size="small"
                    color="primary"
                    aria-label="add"
                    onClick={() => dispatch(addVariable())}
                >
                    <AddIcon />
                </Fab>
                <div className={classes.divItemvariable} id="divItemvariable">
                    {tab.map((item, id) => (
                        <ItemVariablesAleatoire removeVariable={() => remove(id)} length={tab.length} key={id} index={id} item={item}/>
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
                    action={() => isEnregistre ? null : dispatch(setVariables({tab : tab, idModele : modele.idModeleSelectionne}))} 
                    open={openPopUpSave} 
                    handleClose={() => {if (isEnregistre) setOpenPopUpSave(false)}}
                    pos="left"
                />
            </div>
        )
    }

    return (
        actualise ? displayVariable() : <CircleLoader size={50} color={"rgb(7, 91, 114)"} css={{margin : "auto", display : "flex", justifyContent : "center"}}/>
    );
}
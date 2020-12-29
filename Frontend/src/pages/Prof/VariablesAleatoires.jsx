import React, {useState, useEffect} from 'react';
import { Fab  } from '@material-ui/core';
import CircleLoader from "react-spinners/CircleLoader";
import AddIcon from '@material-ui/icons/Add';

import ItemVariablesAleatoire from '../../components/variable/ItemVariableAleatoire'
import useConstructor from '../../components/use/useContructor'
import SelectionModele from '../../components/SelectionModele'
import PopUp from '../../components/PopUp'
import useUnload from '../../components/use/useUnload';

import { useDispatch, useSelector } from "react-redux";
import { selectVariablesAleatoires, selectActualise, selectEnregistre, setVariables, addVariable, removeVariable, undoVariable } from "../../slice/VariablesAleatoiresSlice"
import { selectModele } from "../../slice/ModeleSlice"

import '../../styles/VariablesAleatoires.css'

export default function VariablesAleatoires() {

    const [open, setOpen] = useState(false);
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
        if (modele.idModeleSelectionne === undefined){
            setOpen(true);
        }
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
                <h1 style={{textAlign : "center"}}>Creation des variables aléatoires</h1>
                <Fab style={{marginLeft: "3%"}}
                    size="small"
                    color="primary"
                    aria-label="add"
                    onClick={() => dispatch(addVariable())}
                >
                    <AddIcon />
                </Fab>
                <div id="divItemvariable">
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
                    message={isEnregistre ? "Formules enregistrées" : "Enregistrer les modifications"} 
                    actionName={!isEnregistre ? "Enregistrer" : null} 
                    action={() =>  !isEnregistre ? dispatch(setVariables({tab : tab, idModele : modele.idModeleSelectionne})) : null} 
                    open={openPopUpSave} 
                    handleClose={() => {if (isEnregistre) setOpenPopUpSave(false)}}
                    pos="left"
                />
            </div>
        )
    }

    return (
        modele.idModeleSelectionne === undefined 
        ? <SelectionModele tard={false} setClose={() => setOpen(false)} open={open}/> 
        : actualise ? displayVariable() : <CircleLoader size={50} color={"rgb(7, 91, 114)"} css={{margin : "auto", display : "flex", justifyContent : "center"}}/>
    );
}
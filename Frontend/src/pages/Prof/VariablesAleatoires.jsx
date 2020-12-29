import React, {useState} from 'react';
import { Fab, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CircleLoader from "react-spinners/CircleLoader";

import ItemVariablesAleatoire from '../../components/variable/ItemVariableAleatoire'
import useConstructor from '../../components/use/useContructor'
import SelectionModele from '../../components/SelectionModele'
import PopUp from '../../components/PopUp'

import { useDispatch, useSelector } from "react-redux";
import { selectVariablesAleatoires, selectActualise, selectEnregistre, setVariables, addVariable, removeVariable, undoVariable } from "../../slice/VariablesAleatoiresSlice"
import { selectModele } from "../../slice/ModeleSlice"

export default function VariablesAleatoires() {

    const [open, setOpen] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false);

    const dispatch = useDispatch();
    const tab = useSelector(selectVariablesAleatoires);
    const isEnregistre = useSelector(selectEnregistre);
    const actualise = useSelector(selectActualise)
    const modele = useSelector(selectModele);

    useConstructor(() => {
        if (modele.idModeleSelectionne === undefined){
            setOpen(true);
        }
    });

    const remove = (index) =>{
        dispatch(removeVariable(index));
        setOpenPopUp(true);
    }

    const undo = () =>{
        dispatch(undoVariable());
        setOpenPopUp(false);
     }

    const displayVariable = () =>{
        return (
            <div>
                <h1 style={{textAlign : "center"}}>Creation des variables aléatoires</h1>
                <Fab style={{marginLeft : "5%", marginBottom : "5%"}} size="small" color="primary" aria-label="add" onClick={(e => dispatch(addVariable()))}>
                    <AddIcon />
                </Fab>
                <Button variant="outlined" color={isEnregistre ? "primary" : "secondary"}
                    onClick={() => dispatch(setVariables({tab : tab, idModele : modele.idModeleSelectionne}))}
                    endIcon={isEnregistre 
                        ? <CheckCircleOutlineOutlinedIcon fontSize="large" style={{color : "green"}}/> 
                        : <HighlightOffOutlinedIcon fontSize="large"  style={{color : "red"}}/>
                    }
                >
                    Enregistrer
                </Button>
                {tab.map((item, id) => (
                    <ItemVariablesAleatoire removeVariable={() => remove(id)} length={tab.length} key={id} index={id} item={item}/>
                ))}
                <PopUp message="Variable supprimée" undo={() => undo()} open={openPopUp} handleClose={() => setOpenPopUp(false)}/>
            </div>
        )
    }

    return (
        modele.idModeleSelectionne === undefined 
        ? <SelectionModele tard={false} setClose={() => setOpen(false)} open={open}/> 
        : actualise ? displayVariable() : <CircleLoader size={50} color={"rgb(7, 91, 114)"} css={{margin : "auto", display : "flex", justifyContent : "center"}}/>
    );
}
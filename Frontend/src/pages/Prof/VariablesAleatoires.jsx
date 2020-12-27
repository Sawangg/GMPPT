import React, {useState} from 'react';
import { Fab, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

import ItemVariablesAleatoire from '../../components/variable/ItemVariableAleatoire'
import useConstructor from '../../components/use/useContructor'
import SelectionModele from '../../components/SelectionModele'

import { useDispatch, useSelector } from "react-redux";
import { addVariable, getAllVariables } from "../../slice/VariablesAleatoiresSlice";
import { selectVariablesAleatoires, selectActualise, setVariables } from "../../slice/VariablesAleatoiresSlice"
import { selectModele } from "../../slice/ModeleSlice"

export default function VariablesAleatoires() {

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const tab = useSelector(selectVariablesAleatoires);
    const isEnregistre = useSelector(selectActualise);
    const modele = useSelector(selectModele);

    useConstructor(() => {
        if (!isEnregistre && modele.idModeleSelectionne !== undefined){
            dispatch(getAllVariables(modele.idModeleSelectionne));
        }
        if (modele.idModeleSelectionne === undefined){
            setOpen(true);
        }
    });

    const displayVariable = () =>{
        return (
            <div>
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
                    <ItemVariablesAleatoire key={id} index={id} item={item}/>
                ))}
            </div>
        )
    }

    return (
        modele.idModeleSelectionne === undefined ? <SelectionModele tard={false} setOpen={e => setOpen(e)} open={open}/> : displayVariable()
    );
}
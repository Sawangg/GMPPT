import React, {useState} from 'react';
import { Fab, Button, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

import ItemVariablesAleatoire from '../../components/variable/ItemVariableAleatoire'
import useConstructor from '../../components/use/useContructor'
import SelectionModele from '../../components/SelectionModele'

import { useDispatch, useSelector } from "react-redux";
import { selectVariablesAleatoires, selectActualise, selectEnregistre, setVariables, addVariable } from "../../slice/VariablesAleatoiresSlice"
import { selectModele } from "../../slice/ModeleSlice"

export default function VariablesAleatoires() {

    const [open, setOpen] = useState(false);

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
                    <ItemVariablesAleatoire key={id} index={id} item={item}/>
                ))}
            </div>
        )
    }

    return (
        modele.idModeleSelectionne === undefined 
        ? <SelectionModele tard={false} setOpen={e => setOpen(e)} open={open}/> 
        : (actualise ? displayVariable() : <CircularProgress className="center"/>)
    );
}
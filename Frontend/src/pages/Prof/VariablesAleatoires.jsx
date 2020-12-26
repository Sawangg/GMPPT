import React, {useState} from 'react';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ItemVariablesAleatoire from '../../components/variable/ItemVariableAleatoire'
import useConstructor from '../../components/use/useContructor'
import SelectionModele from '../../components/SelectionModele'

import { useDispatch } from "react-redux";
import { addVariable } from "../../slice/VariablesAleatoiresSlice";
import { useSelector } from "react-redux";
import { selectVariablesAleatoires, selectActualise } from "../../slice/VariablesAleatoiresSlice"
import { selectModele } from "../../slice/ModeleSlice"

import '../../styles/itemVariablesAleatoire.css'

export default function VariablesAleatoires() {

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const tab = useSelector(selectVariablesAleatoires);
    const actualise = useSelector(selectActualise);
    const modele = useSelector(selectModele);

    useConstructor(() => {
        if (!actualise && modele.idModeleSelectionne !== undefined){
            // dispatch(setTab(modele.idModeleSelectionne));
        } 
        if (modele.idModeleSelectionne === undefined){
            setOpen(true);
        } 
    });

    const displayVariable = () =>{
        return (
            <>
                <Fab style={{marginLeft : "5%"}} size="small" color="primary" aria-label="add" onClick={(e => dispatch(addVariable()))}>
                    <AddIcon />
                </Fab>
                {tab.map((item, id) => (
                        <ItemVariablesAleatoire key={id} index={id} item={item}/>
                ))}
            </>
        )
    }

    return (
        modele.idModeleSelectionne === undefined ? <SelectionModele tard={false} setOpen={e => setOpen(e)} open={open}/> : displayVariable()
        
    )

}
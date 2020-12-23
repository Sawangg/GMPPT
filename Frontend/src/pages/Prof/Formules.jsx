import React, {useState} from 'react';
import {Fab, Button, CircularProgress} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

import Items from '../../components/formules/ItemTodoAccordeon'
import useConstructor from '../../components/use/useContructor'
import SelectionModele from '../../components/SelectionModele'
import useUnload from '../../components/use/useUnload';

import { useDispatch } from "react-redux";
import { addCategorie, setTab, enregistrerFormules } from "../../slice/FormulesSlice";
import { useSelector } from "react-redux";
import { selectFormule, selectActualise, selectEnregistre } from "../../slice/FormulesSlice"
import { selectModele } from "../../slice/ModeleSlice"

export default function TodoListAccordeon() {

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const tab = useSelector(selectFormule);
    const actualise = useSelector(selectActualise);
    const isEnregistre = useSelector(selectEnregistre);
    const modele = useSelector(selectModele);

    useConstructor(() => {
        if (!actualise && modele.idModeleSelectionne !== undefined){
            dispatch(setTab(modele.idModeleSelectionne));
        } 
        if (modele.idModeleSelectionne === undefined){
            setOpen(true);
        } 
    });
    
    useUnload(!isEnregistre);

    const addValue = () => {
        dispatch(addCategorie());
    }

    const displayFormule = () =>{
        return(
            <div>
                <h1 style={{textAlign : "center"}}>Creation des formules</h1>
                {!actualise ? <CircularProgress className="center"/> :
                <>
                <div style={{display : "flex"}}>
                    <Button variant="outlined" color={isEnregistre ? "primary" : "secondary"}
                        onClick={e => dispatch(enregistrerFormules({tab : tab, idModele : modele.idModeleSelectionne}))}
                        endIcon={isEnregistre 
                             ? <CheckCircleOutlineOutlinedIcon fontSize="large" style={{color : "green"}}/> 
                            : <HighlightOffOutlinedIcon fontSize="large"  style={{color : "red"}}/>
                        }
                    >
                        Enregistrer
                    </Button>
                    <Fab style={{marginLeft : "5%"}} size="small" color="primary" aria-label="add" onClick={(e => addValue())}>
                        <AddIcon />
                    </Fab>
                </div>
                {tab.map((i, id) => (
                <Items index={id} key={i.index} item={i} length={tab.length}/>
                ))}
                </>}
            </div>
        )
        
    } 

    return (
        modele.idModeleSelectionne === undefined ? <SelectionModele tard={false} setOpen={e => setOpen(e)} open={open}/> : displayFormule()
    );
}
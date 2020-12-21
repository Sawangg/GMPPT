import React, {useEffect} from 'react';
import {Fab, Button, CircularProgress} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

import Items from '../components/ItemTodoAccordeon'
import useConstructor from '../components/useContructor'

import { useDispatch } from "react-redux";
import { addCategorie, setTab, enregistrerFormules } from "../slice/FormulesSlice";
import { useSelector } from "react-redux";
import { selectFormule, selectActualise, selectEnregistre } from "../slice/FormulesSlice"

export default function TodoListAccordeon() {

    const dispatch = useDispatch();
    const tab = useSelector(selectFormule);
    const actualise = useSelector(selectActualise);
    const isEnregistre = useSelector(selectEnregistre);

    useConstructor(() => {
        if (!actualise){
            dispatch(setTab());
        }
    });

    const addValue = () => {
        dispatch(addCategorie());
    }

    const handleBeforeUnload = event => {
        if (!isEnregistre) event.preventDefault(); 
    }

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () =>  window.removeEventListener("beforeunload", handleBeforeUnload);
      }, [isEnregistre]);

    return (
        <div>
            <h1 style={{textAlign : "center"}}>Creation des formules</h1>
            {!actualise ? <CircularProgress className="center"/> :
            <>
            <Fab style={{marginLeft : "5%"}} size="small" color="primary" aria-label="add" onClick={(e => addValue())}>
                <AddIcon />
            </Fab>
            <div style={{display : "flex", marginTop : 30}}>
                <Button onClick={e => dispatch(enregistrerFormules(tab))}>Enregistrer</Button>
                {isEnregistre 
                    ? <CheckCircleOutlineOutlinedIcon fontSize="large" style={{color : "green"}}/> 
                    : <HighlightOffOutlinedIcon fontSize="large"  style={{color : "red"}}/>
                }
            </div>
            {tab.map((i, id) => (
            <Items index={id} key={i.index} item={i} length={tab.length}/>
            ))}
            </>}
        </div>
    );
}
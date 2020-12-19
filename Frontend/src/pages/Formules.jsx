import React from 'react';
import {Fab, Button, CircularProgress} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Items from '../components/ItemTodoAccordeon'
import useConstructor from '../components/useContructor'

import { formules, getFormules } from '../utils/api.js';

import { useDispatch } from "react-redux";
import { addCategorie, setTab } from "../slice/FormulesSlice";
import { useSelector } from "react-redux";
import { selectFormule, selectActualise } from "../slice/FormulesSlice"

export default function TodoListAccordeon() {

    const dispatch = useDispatch();
    const tab = useSelector(selectFormule);
    const actualise = useSelector(selectActualise);

    useConstructor(() => {
        if (!actualise){
            getFormules()
            .then((data) => dispatch(setTab(data.data)))
            .catch(() => null);
        }
    });

    const addValue = () => {
        dispatch(addCategorie());
    }

    return (
        <div>
            <h1 style={{textAlign : "center"}}>Creation des formules</h1>
            {!actualise ? <CircularProgress className="center"/> :
            <>
            <Fab style={{marginLeft : "5%"}} size="small" color="primary" aria-label="add" onClick={(e => addValue())}>
                <AddIcon />
            </Fab>
            <Button disabled={tab.some(e => e.modif === true)} onClick={e => formules(tab)}>Envoyer</Button>
            {tab.map((i, id) => (
            <Items index={id} key={i.index} item={i} length={tab.length}/>
            ))}
            </>}
        </div>
    );
}
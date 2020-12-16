import React from 'react';
import {Fab, Button, CircularProgress} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Items from '../components/ItemTodoAccordeon'
import useConstructor from '../components/useContructor'

import { formules } from '../utils/api.js';

import { useDispatch } from "react-redux";
import { addCategorie } from "../slice/FormulesSlice";
import { useSelector } from "react-redux";
import { selectFormule } from "../slice/FormulesSlice"

export default function TodoListAccordeon() {

    const dispatch = useDispatch();
    const tab = useSelector(selectFormule);

    // useConstructor(() => {
    //     getCategories()
    //     .then((data) => {
    //         let newArray = [];
    //         if (data.data.length === 0){
    //             newArray.push({nom : "", modif : true, index : 0, margeErreur : "5", tabFormule : []})
    //         } else {
    //         data.data.forEach(element => 
    //             newArray.push({nom : element.nom, modif : false, index : element.idx, margeErreur : element.margeErreur, tabFormule : []})
    //             );
    //         }
    //         setTab(newArray)
    //     })
    //     .catch(() => setTab([{nom : "", modif : true, index : 0, margeErreur : "5", tabFormule : []}]));
    // });

    const addValue = () => {
        dispatch(addCategorie());
    }

    return (
        <div>
            <h1 style={{textAlign : "center"}}>Creation des formules</h1>
            <Fab style={{marginLeft : "5%"}} size="small" color="primary" aria-label="add" onClick={(e => addValue())}>
                <AddIcon />
            </Fab>
            <Button disabled={tab.some(e => e.modif === true)} onClick={e => formules(tab)}>Envoyer</Button>
            {tab.map((i, id) => (
            <Items index={id} key={i.index} item={i} length={tab.length}/>
            ))}
        </div>
    );
}
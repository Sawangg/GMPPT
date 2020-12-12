import React, { useState } from 'react';
import {Fab, Button} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Items from '../components/ItemTodoAccordeon'

import { formules } from '../utils/api.js';


export default function TodoListAccordeon() {

    const [tab, setTab] = useState([{nom : "", modif : true, index : 0, tabFormule : []}]);

    const addValue = () => {
        setTab([...tab, {nom : "",  modif : true, index : tab.length === 0 ? 0 : tab[tab.length - 1].index + 1}]);
    }

    const changeTabFormule = (item, tabFormule) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        newTab[indexTab].tabFormule = tabFormule;
        setTab(newTab);
    }

    const onChange = (item, e) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        newTab[indexTab].nom = e.target.value;
        setTab(newTab);
    }

    const removeTodo = (item) => {
        if (tab.length > 1){
            const newTab = [...tab];
            let indexTab = tab.indexOf(item);
            newTab.splice(indexTab, 1);
            setTab(newTab);
        }
      };

    const changeModif = (item) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        newTab[indexTab].modif = !newTab[indexTab].modif;
        setTab(newTab);
    } 

    const displayTodo = () => {
        return tab.map((i) => (
            <Items nb={tab.length} key={i.index} item={i} removeTodo={e => removeTodo(i)} changeTabFormule={e => changeTabFormule(i, e)} onChange={e => onChange(i, e)} changeModif={e => changeModif(i)}/>
        ))
    }

    return (
        <div>
            <Fab style={{marginLeft : "5%"}} size="small" color="primary" aria-label="add" onClick={(e => addValue())}>
                <AddIcon />
            </Fab>
            <Button disabled={tab.some(e => e.modif === true)} onClick={e => formules(tab)}>Envoyer</Button>
            {displayTodo()}
        </div>
    );
}
import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Items from '../components/ItemTodoAccordeon'

export default function TodoListAccordeon() {

    const [tab, setTab] = useState([{nom : "", modif : true, index : 0}]);

    const addValue = (event) => {
        event.preventDefault(); // eviter de reloader la page 
        setTab([...tab, {nom : "",  modif : true, index : tab.length === 0 ? 0 : tab[tab.length - 1].index + 1}]);
    }

    const onChange = (item, e) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        newTab[indexTab] = {nom : e.target.value, modif: newTab[indexTab].modif, index : newTab[indexTab].index};
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
        newTab[indexTab] = {nom :  newTab[indexTab].nom, modif : !newTab[indexTab].modif, index : newTab[indexTab].index};
        setTab(newTab);
    } 

    const displayTodo = () => {
        return tab.map((i) => (
            <Items key={i.index} item={i} removeTodo={e => removeTodo(i)} onChange={e => onChange(i, e)} changeModif={e => changeModif(i)}/>
        ))
    }

    return (
        <div>
            <Fab style={{marginLeft : "5%"}} size="small" color="primary" aria-label="add" onClick={(e => addValue(e))}>
                <AddIcon />
            </Fab>
            {displayTodo()}
        </div>
    );
}
import React, {useState} from 'react';
import {Fab} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import Accordeon from './Accordeon'
import Item from './Item'

import './TodoList.css'

export default function TodoList(props){

    const [tab, setTab] = useState([{item : <Item/>, index : 0}])

    const addValue = (event) => {
        event.preventDefault(); //eviter de reloader la page 
        setTab([...tab, {item : <Item/>, index : tab.length === 0 ? 0 : tab[tab.length-1].index+1}])
    }

    const removeTodo = (item) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        newTab.splice(indexTab, 1);
        setTab(newTab);
      };

    const displayTodo = () =>{
        return tab.map((i) => (
            <div className="container" key={i.index}>
                {i.item}
                <Fab className="center" size="small" color="secondary" aria-label="add" onClick={e => removeTodo(i)}>
                    <DeleteIcon className="center" />
                </Fab>
            </div>
        ))
    }

    return (
        <Accordeon nomCategorie={props.nomCategorie} items={displayTodo()} ajoutFormule={(e => addValue(e))}/>
    );

} 
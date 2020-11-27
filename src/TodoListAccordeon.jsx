import React, {useState} from 'react';
import {Button, TextField} from '@material-ui/core';

import TodoList from './TodoList'

import './TodoList.css'

export default function TodoListAccordeon(){

    const [tab, setTab] = useState([])
    const [value, setValue] = useState({nom : "", index : 0})

    const addValue = (event) => {
        event.preventDefault(); //eviter de reloader la page 
        if (value.nom !== ""){
            setTab([...tab, {todo : <TodoList nomCategorie={value.nom} />, index : value.index}]);
            setValue({nom :"", index : value.index+1})
        }
    }

    const onChange = (e) =>{
        setValue({nom : e.target.value, index : value.index});
    }

    const removeTodo = (item) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        newTab.splice(indexTab, 1);
        setTab(newTab);
      };

    const displayTodo = () =>{
        return tab.map((item) => (
            <div className="todoList" key={item.index}>
                {item.todo}
                <Button style={{display : "flex", justifyContent : "space-around", marginTop : 40}} variant="contained" color="secondary" onClick={e => removeTodo(item)}>Supprimer</Button>
            </div>
        ))
    }

    return (
        <div style={{width : "100%"}}>
            <form noValidate autoComplete="off" style={{margin : 40}}>
                <TextField label="Nom de la catégorie" variant="outlined" size="small" value={value.nom} onChange={e => onChange(e)}/>
                <Button style={{marginLeft : 20}} variant="outlined" color="primary" onClick={(e => addValue(e))}>Ajouter catégorie de formule</Button>
            </form>
            {displayTodo()}
        </div>
    );

} 
import React, {useState} from 'react';
import {Button, TextField} from '@material-ui/core';

import TodoList from './TodoList'

import './TodoList.css'

export default function TodoListAccordeon(){

    const [tab, setTab] = useState([])
    const [value, setValue] = useState({nom : "", modif : false, index : 0})

    const addValue = (event) => {
        event.preventDefault(); //eviter de reloader la page 
        if (value.nom !== ""){
            setTab([...tab, <TodoList nomCategorie={value} />]);
            setValue({nom : "", modif : false, index : value.index+1})
        }
    }

    const onChange = (e) =>{
        setValue(e.target.value);
    }

    const displayTodo = () =>{
        return tab.map((item) => (
            <div class="todoList">
                {item}
                <div style={{display : "flex", justifyContent : "space-around", marginTop : 40}}>
                    <Button variant="outlined" color="primary">Terminer</Button>
                    <Button variant="contained" color="secondary">Supprimer</Button>
                </div>
            </div>
        ))
    }

    return (
        <div style={{width : "100%"}}>
            <div style={{margin : 40}}>
                <TextField label="Nom de la catégorie" variant="outlined" size="small" value={value.nom} onChange={e => onChange(e)}/>
                <Button style={{marginLeft : 20}} variant="outlined" color="primary" onClick={(e => addValue(e))}>Ajouter catégorie de formule</Button>
            </div>
            {displayTodo()}
        </div>
    );

} 
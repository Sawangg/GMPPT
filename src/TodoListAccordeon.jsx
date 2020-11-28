import React, {useState} from 'react';
import {Button, Fab, TextField, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';

import Accordeon from './Accordeon'

import './TodoList.css'

export default function TodoListAccordeon(){

    const [tab, setTab] = useState([{nom : "", modif : true, index : 0}])

    const addValue = (event) => {
        event.preventDefault(); //eviter de reloader la page 
        setTab([...tab, {nom : "",  modif : true, index : tab.length === 0 ? 0 : tab[tab.length-1].index+1}]);
    }

    const onChange = (item, e) =>{
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        newTab[indexTab] = {nom : e.target.value, modif: newTab[indexTab].modif, index : newTab[indexTab].index}
        setTab(newTab);
    }

    const removeTodo = (item) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        newTab.splice(indexTab, 1);
        setTab(newTab);
      };

      const changeModif = (item) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        newTab[indexTab] = {nom :  newTab[indexTab].nom, modif : !newTab[indexTab].modif, index : newTab[indexTab].index}
        setTab(newTab);
    } 

    const displayTodo = () =>{
        return tab.map((i) => (
            <div className="todoList" key={i.index}>
                <div style={{display : "flex", width : "80%", justifyContent : "space-between"}}>
                    {i.modif ? <>
                    <TextField style={{width : 200}} multiline label="Nom de la catégorie" variant="outlined" size="small" value={i.nom} onChange={e => onChange(i, e)}/>
                    <Fab size="small" color="primary" aria-label="add" onClick={e => changeModif(i)}>
                        <SaveIcon/>
                    </Fab>
                    </>
                    :
                    <>
                    <Typography style={{marginTop : 8, width : 200}}>{i.nom}</Typography>
                    <Fab size="small" color="secondary" aria-label="add" onClick={e => changeModif(i)}>
                        <CreateIcon/>
                    </Fab>
                    </>
                    }          
                    <Button style={{display : "flex", justifyContent : "space-around"}} variant="contained" color="secondary" onClick={e => removeTodo(i)}>Supprimer la catégorie</Button>
                </div>
                
                <Accordeon nom={i.nom} onChange={e => onChange(i, e)}/>
            </div>
        ))
    }

    return (
        <div style={{width : "100%"}}>
            <form noValidate autoComplete="off" style={{margin : 40}}>
                <Fab style={{marginLeft : 20}} size="small" color="primary" aria-label="add" onClick={(e => addValue(e))}>
                    <AddIcon />
                </Fab>
            </form>
            {displayTodo()}
        </div>
    );

} 
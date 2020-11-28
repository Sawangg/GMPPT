import React, {useState} from 'react';
import {Button, Fab} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import Item from './Item'

import './TodoList.css'

export default function TodoList(props){

    const [tab, setTab] = useState([{text : "", variable : "", modif : true, index : 0}])

    const ajoutFormule = (event) => {
        event.preventDefault(); //eviter de reloader la page 
        setTab([...tab, {text : "", variable : "", modif : true, index : tab.length === 0 ? 0 : tab[tab.length-1].index+1}]);
    }

    const removeTodo = (item) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        newTab.splice(indexTab, 1);
        setTab(newTab);
      };

      const onChange = (item, textEvent, variableEvent) =>{
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        newTab[indexTab] = {
            text : (typeof textEvent !== 'undefined') ? textEvent.target.value : newTab[indexTab].text, 
            variable : (typeof variableEvent !== 'undefined') ? variableEvent.target.value : newTab[indexTab].variable, 
            modif : newTab[indexTab].modif,
            index : newTab[indexTab].index
        }
        setTab(newTab);
    }

    const changeModif = (item) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        newTab[indexTab] = {text :  newTab[indexTab].text, variable :  newTab[indexTab].variable, modif : !newTab[indexTab].modif}
        setTab(newTab);
    }

    const displayItem = () =>{
        return tab.map((i) => (
                <div className="container" key={i.index}>
                    <Item nom={i.text} variable={i.variable} modif={i.modif} onChange={(t, v) => onChange(i, t, v)} changeModif={e => changeModif(i)}/>
                    <Fab className="center" size="small" color="secondary" aria-label="add" onClick={e => removeTodo(i)}>
                        <DeleteIcon className="center" />
                    </Fab>
                </div>
            ))
    }

    return (<div>
        <Button style={{margin : "0px 50px", width : "250px"}} variant="outlined" color="primary"  onClick={ajoutFormule}>Ajouter des formules</Button>
        {displayItem()}
    </div>)

} 
import React, {useState} from 'react';
import {Button, TextField, Typography, Fab} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteIcon from '@material-ui/icons/Delete';

import Accordeon from './Accordeon'

import './TodoList.css'

export default function TodoList(props){

    const [value, setValue] = useState({text : "", variable : "", modif : true, index : 0})
    const [tab, setTab] = useState([])

    const setIndexTab = (item) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        return { newTab, indexTab };
    }

    const onChange = (item, textEvent, variableEvent) =>{
        let { newTab, indexTab } = setIndexTab(item);
        newTab[indexTab] = {
            text : (typeof textEvent !== 'undefined') ? textEvent.target.value : tab[indexTab].text, 
            variable : (typeof variableEvent !== 'undefined') ? variableEvent.target.value : tab[indexTab].variable, 
            modif : tab[indexTab].modif, 
            index : tab[indexTab].index
        };
        setTab(newTab);
    }

    const addValue = (event) => {
        event.preventDefault(); //eviter de reloader la page 

        //permet de valider la case précedente
        if (tab.length > 0){
            const newTab = [...tab];
            newTab[tab.length-1] = {text : newTab[tab.length-1].text, variable : newTab[tab.length-1].variable, modif : false, index : newTab[tab.length-1].index}
            setTab([...newTab, value]);
        } else {
            setTab([...tab, value])
        }
        setValue({text : "", variable : "", modif : true, index : value.index+1})
    }

    const removeTodo = (item) => {
        let { newTab, indexTab } = setIndexTab(item);
        newTab.splice(indexTab, 1);
        setTab(newTab);
      };

    const changeModif = (item) => {
        let { newTab, indexTab } = setIndexTab(item);
        newTab[indexTab] = {text : newTab[indexTab].text, variable : newTab[indexTab].variable, modif : !newTab[indexTab].modif, index : newTab[indexTab].index}
        setTab(newTab);
    }

    const displayTodo = () =>{
        return tab.map((item) => (
            <div className="container" key={item.index}>
                {item.modif ? <>
                        <TextField className="center" multiline label="Variable" variant="outlined" size="small" value={item.variable} onChange={e => onChange(item, undefined, e)}/>
                        <ArrowForwardIcon className="center" />
                        <TextField className="center" multiline label="Nom formule" variant="outlined" size="small" value={item.text} onChange={e => onChange(item, e, undefined)} />
                        <Button className="buttonItem center" variant="contained" color="primary" onClick={e => changeModif(item)}>Enregistrer</Button>
                    </> : <>
                        <Typography style={{marginTop : 8, overflowWrap: "break-word"}}>{item.variable}</Typography>
                        <ArrowForwardIcon className="center" />
                        <Typography style={{marginTop : 8, overflowWrap: "break-word"}}>{item.text}</Typography>
                        <Button className="buttonItem center" variant="contained" onClick={e => changeModif(item)}>Modifier</Button>
                    </>}
                    <Fab className="center" size="small" color="secondary" aria-label="add" onClick={e => removeTodo(item)}>
                        <DeleteIcon className="center" />
                    </Fab>
            </div>
        ))
    }

    const checkAll = () =>{
        let check = false;
        tab.map((item) => (
            check = item.modif ? true : check
        ));
        return check;
    }

    return (
        <div>
            <Accordeon nomCategorie={props.nomCategorie} items={displayTodo()} ajoutFormule={(e => addValue(e))}/>
            <Button style={{display : "block", margin : "20px auto"}} variant="outlined" color="primary" disabled={checkAll()}>Terminer</Button>
        </div>
    );

} 
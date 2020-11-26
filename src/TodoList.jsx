import React, {useState} from 'react';
import {Button, TextField, Typography} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import Accordeon from './Accordeon'

import './TodoList.css'

export default function TodoList(props){

    const [value, setValue] = useState({text : "", variable : "", modif : true, index : 0})
    const [tab, setTab] = useState([])

    const styleCenter = {marginTop : 8};

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
            console.log(tab.length-1)
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
                        <TextField label="Variable" variant="outlined" size="small" value={item.variable} onChange={e => onChange(item, undefined, e)}/>
                        <ArrowForwardIcon style={styleCenter}/>
                        <TextField label="Nom formule" variant="outlined" size="small" value={item.text} onChange={e => onChange(item, e, undefined)} />
                        <Button className="buttonItem" variant="contained" color="primary" onClick={e => changeModif(item)}>Enregistrer</Button>
                    </> : <>
                        <Typography style={styleCenter}>{item.variable}</Typography>
                        <ArrowForwardIcon style={styleCenter}/>
                        <Typography style={styleCenter}>{item.text}</Typography>
                        <Button className="buttonItem" variant="contained" onClick={e => changeModif(item)}>Modifier</Button>
                    </>}
                <Button className="buttonItem" variant="contained" color="secondary" onClick={e => removeTodo(item)}>Supprimer</Button>
            </div>
        ))
    }

    return (
        <div>
            <Accordeon nomCategorie={props.nomCategorie} items={displayTodo()} ajoutFormule={(e => addValue(e))}/>
        </div>
    );

} 
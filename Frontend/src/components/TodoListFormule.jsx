import React, { useState } from 'react';
import {Button, CircularProgress} from '@material-ui/core';

import Item from './ItemTodoFormule'
import PopUp from './PopUp'
import useConstructor from './useContructor'

import { getFormules } from '../utils/api'

import '../styles/TodoListFormule.css'

export default function TodoListFormule(props) {

    const [tab, setTab] = useState(undefined)

    const [copyTab, setCopyTab] = useState();

    const [openPopUp, setOpenPopUp] = useState(false);

    useConstructor(() => {
        getFormules(props.index)
        .then((data) => {
            let newArray = [];
            if (data.data.length === 0){
                newArray.push({nomFormule : "", formule : "", modif : true, index : 0})
            } else {
            data.data.forEach(element => 
                newArray.push({nomFormule : element.nom, formule : element.contenu, modif : false, index : element.idx})
                );
            }
            setTab(newArray)
            setCopyTab([...newArray])
        })
        .catch(() => setTab([{nomFormule : "", formule : "", modif : true, index : 0}]));
    });
  
    const closePopUp = () => {
        setOpenPopUp(false);
    };

    const undo = () =>{
        setTab([...copyTab]);
        setOpenPopUp(false);
        props.changeTabFormule(copyTab);
    }

    const ajoutFormule = () => {
        if (tab.length !== 0){
            tab[tab.length-1].modif = false;
        }
        setTab([...tab, {nomFormule : "", formule : "", modif : true, index : tab.length === 0 ? 0 : tab[tab.length-1].index+1, margeErreur : "5"}]);
        props.changeTabFormule(tab);
    }

    const removeTodo = (item) => {
        if (tab.length > 1){
            setOpenPopUp(true);
            setCopyTab(tab);
            const newTab = [...tab];
            let indexTab = tab.indexOf(item);
            newTab.splice(indexTab, 1);
            setTab(newTab);
            props.changeTabFormule(newTab); //newTab car tab n'est pas actualisé assez rapidement
        }
    };

    const onChange = (item, nomFormuleEvent, formuleEvent) =>{
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        typeof nomFormuleEvent === 'undefined'
            ? newTab[indexTab].formule = formuleEvent.target.value
            : newTab[indexTab].nomFormule = nomFormuleEvent.target.value;
        setTab(newTab);
    };

    const changeModif = (item) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        newTab[indexTab].modif = !newTab[indexTab].modif;
        setTab(newTab);
        props.changeTabFormule(tab);
    };

    const changePosition = (item, up) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        let value = up ? -1 : 1;
        if ((up && indexTab > 0) || (!up && indexTab < tab.length-1)){
            let save = newTab[indexTab+value];
            save.index = save.index-value;
            newTab[indexTab].index = tab[indexTab].index+value;
            newTab[indexTab+value] = newTab[indexTab]
            newTab[indexTab] = save;
            setTab(newTab);
        }
    }

    const displayItem = () =>{
        return tab.map((i) => (
                <Item nb={tab.length} key={i.index} changePosition={e => changePosition(i, e)} item={i} removeTodo={e => removeTodo(i)} onChange={(t, v) => onChange(i, t, v)} changeModif={e => changeModif(i)}/>
        ));
    }

    return (
        <div>
            {tab === undefined ? <CircularProgress className="center"/> : displayItem()}
            <Button className="buttonAjouterFormule" variant="outlined" color="primary" onClick={e => ajoutFormule()}>Ajouter des formules</Button>
            <PopUp message="Formule supprimée" undo={e => undo()} open={openPopUp} handleClose={e => closePopUp()}/>
        </div>
    );
} 
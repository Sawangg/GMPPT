import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import Item from './ItemTodoFormule'
import PopUp from './PopUp'

import '../styles/TodoListFormule.css'

import { getFormules } from '../utils/api.js';

export default function TodoListFormule() {

    //console.log(getFormules());

    const [tab, setTab] = useState([{nomFormule : "", formule : "", modif : true, index : 0}])

    const [copyTab, setCopyTab] = useState([...tab]);

    const [openPopUp, setOpenPopUp] = useState(false);
  
    const closePopUp = () => {
        setOpenPopUp(false);
    };

    const undo = () =>{
        setTab([...copyTab]);
        setOpenPopUp(false);
    }

    const ajoutFormule = (event) => {
        event.preventDefault(); // eviter de reloader la page 
        if (tab.length !== 0) tab[tab.length-1] =  {nomFormule :  tab[tab.length-1].nomFormule, formule : tab[tab.length-1].formule, modif : false, index : tab[tab.length-1].index}
        setTab([...tab, {nomFormule : "", formule : "", modif : true, index : tab.length === 0 ? 0 : tab[tab.length-1].index+1}]);
    }

    const removeTodo = (item) => {
        if (tab.length > 1){
            setOpenPopUp(true);
            setCopyTab(tab);
            const newTab = [...tab];
            let indexTab = tab.indexOf(item);
            newTab.splice(indexTab, 1);
            setTab(newTab);
        }
    };

    const onChange = (item, nomFormuleEvent, formuleEvent) =>{
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        newTab[indexTab] = {
            nomFormule : (typeof nomFormuleEvent !== 'undefined') ? nomFormuleEvent.target.value : newTab[indexTab].nomFormule, 
            formule : (typeof formuleEvent !== 'undefined') ? formuleEvent.target.value : newTab[indexTab].formule, 
            modif : newTab[indexTab].modif,
            index : newTab[indexTab].index
        }
        setTab(newTab);
    };

    const changeModif = (item) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        newTab[indexTab] = {nomFormule :  newTab[indexTab].nomFormule, formule :  newTab[indexTab].formule, modif : !newTab[indexTab].modif, index : tab[indexTab].index}
        setTab(newTab);
    };

    const changePosition = (item, up) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        let value = up ? -1 : 1;
        if ((up && indexTab > 0) || (!up && indexTab < tab.length-1)){
            let save = newTab[indexTab+value];
            save = {nomFormule :  save.nomFormule, formule :  save.formule, modif : save.modif, index : save.index-value}
            newTab[indexTab] =  {nomFormule :  newTab[indexTab].nomFormule, formule :  newTab[indexTab].formule, modif : newTab[indexTab].modif, index : tab[indexTab].index+value}
            newTab[indexTab+value] = newTab[indexTab]
            newTab[indexTab] = save;
            setTab(newTab);
        }
    }

    const displayItem = () =>{
        return tab.map((i) => (
                <Item key={i.index} changePosition={e => changePosition(i, e)} item={i} removeTodo={e => removeTodo(i)} onChange={(t, v) => onChange(i, t, v)} changeModif={e => changeModif(i)}/>
        ));
    }

    return (
        <div>
            {displayItem()}
            <Button className="buttonAjouterFormule" variant="outlined" color="primary" onClick={ajoutFormule}>Ajouter des formules</Button>
            <PopUp message="Formule supprimée" undo={e => undo()} open={openPopUp} handleClose={e => closePopUp()}/>
        </div>
    );
} 
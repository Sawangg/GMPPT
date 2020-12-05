import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import Item from './ItemTodoFormule'

import '../styles/TodoListFormule.css'

export default function TodoListFormule() {

    const [tab, setTab] = useState([{nomFormule : "", formule : "", modif : true, index : 0}])

    const ajoutFormule = (event) => {
        event.preventDefault(); // eviter de reloader la page 
        if (tab.length !== 0) tab[tab.length-1] =  {nomFormule :  tab[tab.length-1].nomFormule, formule : tab[tab.length-1].formule, modif : false, index : tab[tab.length-1].index}
        setTab([...tab, {nomFormule : "", formule : "", modif : true, index : tab.length === 0 ? 0 : tab[tab.length-1].index+1}]);
    }

    const removeTodo = (item) => {
        if (tab.length > 1){
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

    const displayItem = () =>{
        return tab.map((i) => (
                <Item item={i} removeTodo={e => removeTodo(i)} onChange={(t, v) => onChange(i, t, v)} changeModif={e => changeModif(i)}/>
        ));
    }

    return (
        <div>
            {displayItem()}
            <Button className="buttonAjouterFormule" variant="outlined" color="primary" onClick={ajoutFormule}>Ajouter des formules</Button>
        </div>
    );
} 
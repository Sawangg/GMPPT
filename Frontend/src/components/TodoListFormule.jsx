import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import Item from './ItemTodoFormule'
import PopUp from './PopUp'

import '../styles/TodoListFormule.css'

export default function TodoListFormule(props) {

    const [tab, setTab] = useState([{nomFormule : "", formule : "", modif : true, index : 0}])

    const [copyTab, setCopyTab] = useState([...tab]);

    const [openPopUp, setOpenPopUp] = useState(false);
  
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
        setTab([...tab, {nomFormule : "", formule : "", modif : true, index : tab.length === 0 ? 0 : tab[tab.length-1].index+1}]);
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
            {displayItem()}
            <Button className="buttonAjouterFormule" variant="outlined" color="primary" onClick={e => ajoutFormule()}>Ajouter des formules</Button>
            <PopUp message="Formule supprimée" undo={e => undo()} open={openPopUp} handleClose={e => closePopUp()}/>
        </div>
    );
} 
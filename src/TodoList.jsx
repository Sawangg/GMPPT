import React, {useState} from 'react';

import './TodoList.css'

export default function TodoList(){

    const [value, setValue] = useState({text : "", variable : "", modif : true, index : 0})
    const [tab, setTab] = useState([])

    const setIndexTab = (item) => {
        const newTab = [...tab];
        let indexTab = tab.indexOf(item);
        return { newTab, indexTab };
    }

    const onChangeValue = (event, item) => {
        let { newTab, indexTab } = setIndexTab(item);
        newTab[indexTab] = {text : event.target.value, variable : tab[indexTab].variable, modif : tab[indexTab].modif, index : tab[indexTab].index};
        setTab(newTab);
    }

    const onChangeVariable = (event, item) => {
        let { newTab, indexTab } = setIndexTab(item);
        newTab[indexTab] = {text : tab[indexTab].text, variable : event.target.value, modif : tab[indexTab].modif, index : tab[indexTab].index};
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
                        <input className="variableInput" type="text" value={item.variable} onChange={e => onChangeVariable(e, item)} />
                        <p>=</p>
                        <input className="variableInput" type="text" value={item.text} onChange={e => onChangeValue(e, item)} />
                        <button className="boutonRouge" onClick={e => changeModif(item)}>Enregistrer</button>
                    </> : <>
                        <p>{item.variable}</p> <p>=</p> <p>{item.text}</p>
                        <button className="boutonRouge" onClick={e => changeModif(item)}>Modifier</button>
                    </>}
                <button className="boutonRouge" onClick={e => removeTodo(item)}>Supprimer</button>
            </div>
        ))
    }

    return (
        <div id="todoList">
            <button className="boutonBleu" onClick={e => addValue(e)}>Ajouter</button>
            {displayTodo()}
        </div>
    );

} 
import React, {useState} from 'react';

import './TodoList.css'

export default function TodoList(){

    const [value, setValue] = useState({text : "", variable : "", modif : true, index : 0})
    const [tab, setTab] = useState([])

    const onChangeValue = (event, item) => {
        const newTab = [...tab];
        var indexTab = tab.indexOf(item)
        newTab[indexTab] = {text : event.target.value, variable : tab[indexTab].variable, modif : tab[indexTab].modif, index : tab[indexTab].index};
        setTab(newTab);
    }

    const onChangeVariable = (event, item) => {
        const newTab = [...tab];
        var indexTab = tab.indexOf(item)
        newTab[indexTab] = {text : tab[indexTab].text, variable : event.target.value, modif : tab[indexTab].modif, index : tab[indexTab].index};
        setTab(newTab);
    }

    const addValue = (event) => {
        event.preventDefault(); //eviter de reloader la page 
        setTab([...tab, value])
        setValue({text : "", variable : "", modif : true, index : value.index+1})
    }

    const removeTodo = (item) => {
        const newTab = [...tab];
        var indexTab = tab.indexOf(item)
        newTab.splice(indexTab, 1);
        setTab(newTab);
      };

    const changeModif = (item) => {
        const newTab = [...tab];
        var indexTab = tab.indexOf(item)
        newTab[indexTab] = {text : newTab[indexTab].text, variable : newTab[indexTab].variable, modif : !newTab[indexTab].modif, index : newTab[indexTab].index}
        setTab(newTab);
    }

    const displayTodo = () =>{
        return tab.map((item) => {
            return (
                <div className="container" key={item.index}>
                    {item.modif ? 
                    <>
                        <input className="variableInput" type="text" value={item.variable} onChange={e => onChangeVariable(e, item)}/>
                        <p>=</p>
                        <input className="variableInput" type="text" value={item.text} onChange={e => onChangeValue(e, item)}/>
                        <button className="boutonRouge" onClick={e => changeModif(item)}>Enregistrer</button> 
                    </>
                    :
                    <>
                        <p>{item.variable}</p> <p>=</p> <p>{item.text}</p>
                        <button className="boutonRouge" onClick={e => changeModif(item)}>Modifier</button> 
                    </>
                    }
                <button className="boutonRouge" onClick={e => removeTodo(item)}>Supprimer</button>                   
                </div>
            )
        })
    }

    return (
        <div>
           <form>
               <div className="container">
                    <button className="boutonBleu" onClick={e => addValue(e)}>Ajouter</button>
                </div>
            </form>
            {displayTodo()}
        </div>
    );
} 
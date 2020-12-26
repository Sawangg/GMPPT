import React, { useState } from 'react';
import {Button} from '@material-ui/core';

import Reponse from './ItemReponse';

export default function Item(props) {
    const [reponsesTab, setTab] = useState([{value : "", unite : [{ id : 0, puissance : 1 }] }]);

    const addReponse = () =>{
            setTab([...reponsesTab, {value : "", unite : [{ id : 0, puissance : 1 }] }]);
    }

    const deleteReponse = (item) =>{
        if(reponsesTab.length > 1){
            let newTab = [...reponsesTab];
            let index = reponsesTab.indexOf(item);
            console.log(index);
            newTab.splice(index, 1);
            setTab(newTab);
        }
    }

    const handleChangeReponse = (event, index) =>{
        if(!isNaN(event.target.value)){
            let newTab = [...reponsesTab];
            newTab[index].value = event.target.value;
            setTab(newTab);
        }
    }

    const handleChangeUniteReponse = (index, unite) =>{
        let newTab = [...reponsesTab];
        newTab = [...reponsesTab];
        newTab[index].unite = unite;
        setTab(newTab);
    }

    const peutSupprimer = () =>{
        return reponsesTab.length > 1;
    }

    return(
       <div>
            {props.nbMaxReponses > 1 ?
                <Button variant="contained" 
                        className="ButtonAjouterReponse" 
                        color="primary"
                        onClick={addReponse} disabled={reponsesTab.length >= props.nbMaxReponses}>
                    Ajouter Réponse
                </Button>
            : null
            }
            <div className="liste_reponse">
                {reponsesTab.map((i, index) => (
                    <Reponse num={index} reponse={i} unites={props.unites}
                    addReponse={e => addReponse()} handleChangeReponse={handleChangeReponse} 
                    deleteReponse={e=>deleteReponse(e)} peutSupprimer={e => peutSupprimer()}
                    handleChangeUnite={handleChangeUniteReponse}/>
                ))}
            </div>
        </div>
    )

}
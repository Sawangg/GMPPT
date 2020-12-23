import React, { useState } from 'react';
import { TextField, Button, MenuItem} from '@material-ui/core';

import Reponse from './ItemReponse';

export default function Item(props) {
    const [reponsesTab, setTab] = useState([{value : ""}]);

    const [uniteReponses, setUnite] = useState({nom : "Sans-unite", abrv : " ", index : 0})

    const addReponse = () =>{
            setTab([...reponsesTab, {value : ""}]);
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

    const handleChangeUnite = (event) =>{
        let index = event.target.value;
        setUnite(props.unites[index]);
    }

    const peutSupprimer = () =>{
        return reponsesTab.length > 1;
    }

    const choisirUnite = () =>{
        return(<div className="alignement_horizontal">
            <p>Choisissez l'unité : </p>
                <TextField select value={uniteReponses.index} onChange={handleChangeUnite}>
                    {props.unites.map((i, index) => 
                    <MenuItem key={index} value={index} selected={index===0} >
                        {i.nom}
                    </MenuItem>)}
                </TextField>
        </div>)
    }

    return(
       <div>
            {choisirUnite()}
            {props.nbMaxReponses > 1 ?
                <Button variant="outline-primary" 
                        className="ButtonAjouterReponse" 
                        onClick={addReponse} disabled={reponsesTab.length >= props.nbMaxReponses}>
                    Ajouter Réponse
                </Button>
            : null
            }
            <div className="liste_reponse">
                {reponsesTab.map((i, index) => (
                    <Reponse num={index} reponse={i} unite={uniteReponses} addReponse={e => addReponse()} handleChangeReponse={handleChangeReponse}
                    deleteReponse={e=>deleteReponse(e)} peutSupprimer={e => peutSupprimer()}/>
                ))}
            </div>
        </div>
    )

}
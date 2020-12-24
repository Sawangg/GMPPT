import React, { useState } from 'react';
import {Button} from '@material-ui/core';

import Reponse from './ItemReponse';
import ChoixUnite from './ChoixUnite';

export default function Item(props) {
    const [reponsesTab, setTab] = useState([{value : ""}]);

    const [uniteReponses, setUnite] = useState([{ id : 0, puissance : 1 }]);

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

    const handleChangeUnite = (event, indTab) =>{
        let index = event.target.value;
        let newTab = [...uniteReponses];
        newTab[indTab].id = index;
        setUnite(newTab);
    }

    const peutSupprimer = () =>{
        return reponsesTab.length > 1;
    }

    const addPartieUnite = (index) =>{
        let newTab = [...uniteReponses];
        newTab.splice(index, 0, { id:0 , puissance : 1});
        setUnite(newTab);
    }

    const handlePuissance = (e, index) =>{
        let puis = e.target.value;
        if(!isNaN(puis)){
            if(puis === 0){
                puis = 1;
            }else{
                puis = parseInt(puis,10) ;
            }
            let newTab = [...uniteReponses];
            newTab[index].puissance = puis;
            setUnite(newTab);
        }
        
    }

    const deletePartieUnite = (index) =>{
        let newTab=[...uniteReponses];
        newTab.splice(index, 1);
        setUnite(newTab);
    }

    const choisirUnite = () =>{
        return(
            <>
                <p>Choisissez l'unité : </p>
                <div className="alignement_horizontal">
                    {uniteReponses.map((i, index) => 
                        <>
                        <ChoixUnite index={index} unite={i} unites={props.unites} 
                            handleChangeUnite={handleChangeUnite} addPartieUnite={addPartieUnite}
                            deletePartieUnite={deletePartieUnite} handlePuissance={handlePuissance} 
                            tabLength={uniteReponses.length} />
                        {index < uniteReponses.length-1 ? <b>.</b> : null}
                        </>
                    )}
                </div>
            </>
        )
    }

    return(
       <div>
            {choisirUnite()}
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
                    <Reponse num={index} reponse={i} unite={uniteReponses} unites={props.unites}
                    addReponse={e => addReponse()} handleChangeReponse={handleChangeReponse} 
                    deleteReponse={e=>deleteReponse(e)} peutSupprimer={e => peutSupprimer()}/>
                ))}
            </div>
        </div>
    )

}
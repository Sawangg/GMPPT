import React, { useState } from 'react';

import {Button} from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { addReponse } from '../../slice/RepondreQuestionsSlice'

import Reponse from './ItemReponse';

export default function Item(props) {

    const dispatch = useDispatch();

   /* const [reponsesTab, setTab] = useState([{value : "", unite : [{ id : 0, puissance : 1 }] }]);

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
    }*/

    const handleAddReponse = () =>{
        dispatch(addReponse(props.question.indexQuestion))
    }

    const listeReponses = () =>{
        return(
            <div>
                {props.question.nbMaxReponses > 1 ?
                    <Button variant="contained" 
                            className="ButtonAjouterReponse" 
                            color="primary"
                            onClick={handleAddReponse} 
                            disabled={props.question.tabReponses.length >= props.question.nbMaxReponses}
                            >
                        Ajouter Réponse
                    </Button>
                : null
                }
                <div className="liste_reponse">
                    {props.question.tabReponses.map((i, index) => (
                        <Reponse num={index} reponse={i} unites={props.unites} 
                            indexQuestion={props.question.indexQuestion}/>
                    ))}
                </div>
            </div>
        )
    }


    return (
        <div className="liste_questions" >
            <h2>Question {props.question.indexQuestion + 1}</h2>
            <p className="enonce">{props.question.enonce}</p>
            {listeReponses()}
        </div>
    )
    
}
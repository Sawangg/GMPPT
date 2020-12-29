import React from 'react';

import {Button} from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { addReponse } from '../../slice/RepondreQuestionsSlice'

import Reponse from './ItemReponse';

export default function Question(props) {

    const dispatch = useDispatch()

    //fonction pour ajouter une réponse (valeur vide) à cette question
    const handleAddReponse = () =>{
        dispatch(addReponse(props.question.indexQuestion))
    }

    //liste les différentes réponses
    const listeReponses = () =>{
        return(
            <div className="liste_reponse">

                {/* affichage des réponses une par une */}
                {props.question.tabReponses.map((i, index) => (
                    <Reponse num={index} reponse={i} unites={props.unites} 
                        indexQuestion={props.question.indexQuestion}/>
                ))}

            </div>
        )
    }


    return (
        <div className="liste_questions" >
            <h2>Question {props.question.indexQuestion + 1}</h2>

            {/* affichage énoncé de la question */ }
            <p className="enonce">{props.question.enonce}</p>

            {/* bouton ajouter réponse visible uniquement si la question attend plus d'une réponse */ }
            {props.question.nbMaxReponses > 1 ?
                <Button variant="contained" 
                        className="buttonAjouterReponse" 
                        color="primary"
                        onClick={handleAddReponse} 
                        //est disabled dès que la limte de réponses possibles est atteinte
                        disabled={props.question.tabReponses.length >= props.question.nbMaxReponses}
                        >
                    Ajouter Réponse
                </Button>
            : null
            }

            {listeReponses()}
        </div>
    )
    
}
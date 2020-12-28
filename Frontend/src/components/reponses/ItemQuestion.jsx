import React from 'react';

import {Button} from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { addReponse } from '../../slice/RepondreQuestionsSlice'

import Reponse from './ItemReponse';

export default function Item(props) {

    const dispatch = useDispatch()

    const handleAddReponse = () =>{
        dispatch(addReponse(props.question.indexQuestion))
    }

    const listeReponses = () =>{
        return(
            <div>
                {props.question.nbMaxReponses > 1 ?
                    <Button variant="contained" 
                            className="buttonAjouterReponse" 
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
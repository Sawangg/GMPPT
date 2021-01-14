import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Button, makeStyles } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { addReponse } from '../../slice/RepondreQuestionsSlice'

import Reponse from './ItemReponse';

export default function Question(props) {

    const useStyles = makeStyles((theme) => ({
        listeReponses: {
            display : "flex",
            flexDirection: "column",
            flexWrap : "wrap",
            rowGap : "30px",
            alignItems: "center"
        },
        listeQuestions: {
            marginBottom: "30px"
        },
        enonce: {
            margin : "20px 0px",
            fontSize : "18px"
        },
        buttonAjouterReponse: {
            margin : "20px 0px"
        }
    }));
    const classes = useStyles();

    const dispatch = useDispatch()

    //fonction pour ajouter une réponse (valeur vide) à cette question
    const handleAddReponse = () => {
        dispatch(addReponse(props.question.indexQuestion))
    }

    //liste les différentes réponses
    const listeReponses = () => {
        return (
            <div className={classes.listeReponses}>
                {/* affichage des réponses une par une */}
                {props.question.tabReponses.map((i, index) => (
                    <Reponse num={index} reponse={i} 
                        indexQuestion={props.question.indexQuestion}/>
                ))}
            </div>
        );
    }

    return (
        <div className={classes.listeQuestions} >
            <h2>Question {props.question.indexQuestion + 1}</h2>

            {/* affichage énoncé de la question */}
            <p className={classes.enonce}>{ReactHtmlParser(props.question.enonce)}</p>

            {/* bouton ajouter réponse visible uniquement si la question attend plus d'une réponse */ }
            {props.question.nbMaxReponses > 1 ?
                <Button variant="contained" 
                        className={classes.buttonAjouterReponse}
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
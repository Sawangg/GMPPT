import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Button, makeStyles } from '@material-ui/core';

import DelayInput from '../InputAwait';

import { useDispatch } from 'react-redux';
import { addReponse, changeJustification } from '../../slice/RepondreQuestionsSlice'

import Reponse from './ItemReponse';

export default function Question(props) {

    const useStyles = makeStyles((theme) => ({
        listeReponses: {
            display : "flex",
            flexDirection: "column",
            flexWrap : "wrap",
            rowGap : "30px",
            alignItems: "center",
        },
        listeQuestions: {
            boxShadow: "0px 8px 20px -5px rgba(0,0,0,0.69)",
            padding: "2% 3% 2% 3%",
        },
        enonce: {
            margin : "4% 0 0 8%",
            fontSize : "18px",

        },
        buttonAjouterReponse: {
            display : "block",
            margin : "20px auto"
        },
        hr: {
            border: "1px dashed",
            width : "50%",
            margin : "50px auto"
        },
        h2: {
            textAlign : "left",
            margin : "1%"
        },
    }));
    const classes = useStyles();

    const dispatch = useDispatch()

    //fonction pour ajouter une réponse (valeur vide) à cette question
    const handleAddReponse = () => {
        dispatch(addReponse(props.id))
    }

    //liste les différentes réponses
    const listeReponses = () => {
        return (
            <div className={classes.listeReponses}>
                {/* affichage des réponses une par une */}
                {props.question.tabReponses.map((i, index) => (
                    <Reponse key={index} num={index} reponse={i} 
                        indexQuestion={props.id}/>
                ))}
            </div>
        );
    }

    return (
        <>
            <hr className={classes.hr}/>
            <div className={classes.listeQuestions} >
                <h2 className={classes.h2}>Question {props.id+1} :</h2>
                {/* affichage énoncé de la question */}
                <div className={classes.enonce}>{ReactHtmlParser(props.question.enonce)}</div>

                <DelayInput
                    style = {{width : "100%", margin : "4% 0"}}
                    rows = {4}
                    label="Justification"
                    delayTimeout={300}
                    value={props.question.justification}
                    onChange={e => dispatch(changeJustification({indexQuestion : props.id, justif : e}))}
                />

                {listeReponses()}

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
            </div>
        </>
    )
    
}
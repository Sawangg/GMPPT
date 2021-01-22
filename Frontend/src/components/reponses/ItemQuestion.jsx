import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Button, makeStyles } from '@material-ui/core';

import DelayInput from '../InputAwait';

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
            alignItems: "center",
        },
        listeQuestions: {
            boxShadow: "0px 8px 20px -5px rgba(0,0,0,0.69)",
            padding: "2% 3% 4% 3%",
        },
        enonce: {
            margin : "4% 0 0 8%",
            fontSize : "18px",

        },
        buttonAjouterReponse: {
            display : "block",
            margin : "20px auto"
        }
    }));
    const classes = useStyles();

    const dispatch = useDispatch()

    //fonction pour ajouter une réponse (valeur vide) à cette question
    const handleAddReponse = () => {
        dispatch(addReponse(props.id))
    }

    const [just, setJust] = React.useState("")

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
            <hr style={{border: "1px dashed", width : "50%", margin : "50px auto"}}/>
            <div className={classes.listeQuestions} >
                <h2 style={{textAlign : "left", margin : "1%"}}>Question {props.id+1} :</h2>
                {/* affichage énoncé de la question */}
                <div className={classes.enonce}>{ReactHtmlParser(props.question.enonce)}</div>

                <DelayInput
                    style = {{width : "60%", margin : "4% 0"}}
                    rows = {4}
                    label="Justification"
                    delayTimeout={300}
                    value={just}
                    onChange={e => setJust(e)}
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
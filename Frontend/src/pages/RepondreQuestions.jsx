import React, { useState } from 'react';

import Items from '../components/ItemQuestion'

import '../styles/RepondreQuestions.css'

export default function RepondreQuestions(){
    const [questionsTab, setQuestionTab] = useState([{index : 0, enonce : "Voilà l'énonce de la question", 
    nbMaxReponses : 5}, {index : 1, enonce : "Autre exemple de question", 
    nbMaxReponses : 3}]);

    const [unitesTab, setUnitesTab] = useState([{index : 0, nom : "Kg"}, {index : 1, nom : "N"}]);

    const addQuestion = (enonce, nbMaxReponses) =>{
        setQuestionTab([...questionsTab, {index : questionsTab.length, enonce : enonce, nbMaxReponses:nbMaxReponses}]);
    }

    const displayQuestions = () => {
        return questionsTab.length === 0 ? <div>Pas de questions pour l'instant</div> 
        : questionsTab.map((i) => (
            <Items num={i.index} enonce={i.enonce} nbMaxReponses={i.nbMaxReponses} unites={unitesTab}/>
        ))
    }

    return(<div>
        {displayQuestions()}
    </div>);
}
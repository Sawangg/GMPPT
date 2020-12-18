import React, { useState } from 'react';

import Items from '../components/ItemQuestion'

import '../styles/RepondreQuestions.css'

export default function RepondreQuestions(){
    const [questionsTab, setQuestionTab] = useState([
        {index : 0, enonce : "Énoncé de question avec plusieus réponses", nbMaxReponses : 5, peutAjouter : true}, 
        {index : 1, enonce : "Autre énoncé de question avec plusieus réponses", nbMaxReponses : 3, peutAjouter : false},
        {index : 2, enonce : "Énoncé de question avec 1 réponse", nbMaxReponses : 1, peutAjouter : true}]);

    const [unitesTab, setUnitesTab] = useState([{index : 0, nom : "Sans unité", abrv : " "}, 
    {index : 1, nom : "Newton", abrv : "N"}, {index : 2, nom : "Kilogamme", abrv: "Kg"}]);

    const addQuestion = (enonce, nbMaxReponses, peutAjouter) =>{
        setQuestionTab([...questionsTab, 
            {index : questionsTab.length, enonce : enonce, nbMaxReponses:nbMaxReponses, peutAjouter : peutAjouter}]);
    }

    const displayQuestions = () => {
        return questionsTab.length === 0 ? <div>Pas de questions pour l'instant</div> 
        : questionsTab.map((i) => (
            <Items num={i.index} enonce={i.enonce} nbMaxReponses={i.nbMaxReponses} unites={unitesTab}/>
        ))
    }

    return(<div className="contenant">
        <h1>Répondre aux questions</h1>
        <h2>Sujet</h2>
        <p style={{textAlign : "justify"}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt leo est, in placerat ex cursus id. In malesuada scelerisque leo, ut pharetra ligula venenatis laoreet. Duis in elementum est. Ut aliquam diam ultrices, sagittis nibh sit amet, tincidunt ipsum. Aliquam ac mauris dignissim, porttitor urna in, lacinia urna. Donec rhoncus consectetur eros ac ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc commodo a enim ac ultricies. Vestibulum egestas molestie urna, in posuere odio tempus sit amet. Morbi facilisis sit amet dolor non ultrices. Donec dapibus commodo justo ac tempus. In hac habitasse platea dictumst. Curabitur ultricies iaculis lorem nec interdum. Etiam vel odio ligula. Suspendisse vestibulum nisi et risus posuere varius. In hac habitasse platea dictumst.
            Cras augue mi, porta at ante non, auctor venenatis ante. Duis malesuada elit eget bibendum convallis. Maecenas tempor quis nulla sed bibendum. Nam id lacinia nisl. Aenean ultricies rutrum arcu at vulputate. Donec eu elementum risus. Cras hendrerit cursus est ac lobortis. Aenean placerat turpis mollis auctor luctus. Nam eget imperdiet justo. Morbi egestas posuere lorem a lacinia.
            Fusce sed maximus nulla. In in tellus ac nibh gravida tincidunt. Quisque faucibus lobortis tellus, quis molestie dolor ornare at. Aliquam commodo commodo massa a posuere. Fusce ut massa sodales, elementum tortor at, interdum nisl. Donec rutrum leo quis ultrices ornare. Aenean eu aliquet augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi velit purus, pretium et ornare at, rutrum ac tortor. Sed arcu massa, aliquam sed turpis sit amet, tempor lacinia felis. Mauris magna dui, tempor ornare velit nec, congue molestie libero. Aenean ullamcorper iaculis consectetur. Vestibulum non elementum mi. Phasellus magna lectus, faucibus id nulla ac, finibus mattis diam. 
        </p>
        {displayQuestions()}
    </div>);
}
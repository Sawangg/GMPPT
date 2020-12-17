import React from 'react';

import ItemTodoReponse from './ListeTodoReponse'

export default function Item(props) {

    return (
        <div >
            <h2>Question {props.num + 1}</h2>
            <p className="enonce">{props.enonce}</p>
            <ItemTodoReponse unites={props.unites} nbMaxReponses={props.nbMaxReponses} />
        </div>
    )
    
}
import React, { useState } from 'react';
import { Button, TextField, Typography, Fab } from '@material-ui/core';

import ItemTodoReponse from './ListeTodoReponse'

export default function Item(props) {

    const [texFieldsReponses, setTab] = useState();

    return (
        <div className="contenant">
            <h1>Question {props.num + 1}</h1>
            <p>{props.enonce}</p>
            <ItemTodoReponse unites={props.unites} nbMaxReponses={props.nbMaxReponses} />
        </div>
    )
    
}
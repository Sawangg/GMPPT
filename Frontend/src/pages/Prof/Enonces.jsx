import MyEditor from "../../components/MyEditor";
import React, {useState} from "react";
import {Button} from "@material-ui/core";
import QuestionEnonce from "../../components/QuestionEnonce";

export default function Enonces() {

    const [enonce, setEnonce] = useState("");
    const [question, setQuestion] = useState([]);

    const sendContent = () => {
        console.log(enonce, question);
    };

    const handleChangeEnonce = (content) => {
        setEnonce(content);
    };

    const handleChangeQuestion = (content, index) => {
        let tempArray = [...question];
        tempArray[index].contenu = content;
        setQuestion(tempArray);
    };

    const addQuestion = () => {
        let tempArray = [...question, {contenu: "", index: question.length}];
        setQuestion(tempArray);
    };

    const deleteQuestion = (index) => {
        let tempArray = [...question];
        tempArray.splice(index, 1);
        setQuestion(tempArray);
    }

    return (
        <div>
            <div style={{width: "70%", margin: 'auto'}}>
                <h1 style={{textAlign: 'center'}}>Création de l'énoncé</h1>
                <MyEditor handleChange={e => handleChangeEnonce(e)}/>
            </div>
            {question.map((item, index) => {
                //Je mets à jour les index des questions à chaque fois, selon la map, pour qu'il n'y ait pas de "trous" dans mon tableau de questions
                item.index = index;
                return (
                    <div key={item.index} style={{}}>
                        <QuestionEnonce handleChange={e => handleChangeQuestion(e, item.index)}/>
                        <Button variant="contained" color="secondary" className="center"
                                onClick={() => deleteQuestion(item.index)}>X
                        </Button>
                    </div>
                )
            })}
            <Button variant="contained" color="primary" className="center" onClick={() => addQuestion()}>Ajouter une
                question</Button>
            <Button variant="contained" color="primary" className="center"
                    onClick={() => sendContent()}>Enregistrer</Button>
        </div>
    );
}
import MyEditor from "../../components/MyEditor";
import React, {useState} from "react";
import {Button} from "@material-ui/core";
import QuestionEnonce from "../../components/QuestionEnonce";

export default function Enonces() {

    const [enonce, setEnonce] = useState("");
    const [question, setQuestion] = useState([
        {contenu: "", index: 0},
        {contenu: "", index: 1},
        {contenu: "", index: 2}
    ]);

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

    return (
        <div>
            <div style={{width: "70%", margin: 'auto'}}>
                <h1 style={{textAlign: 'center'}}>Création de l'énoncé</h1>
                <MyEditor handleChange={e => handleChangeEnonce(e)}/>
                <Button onClick={() => sendContent()}>Enregistrer</Button>
            </div>
            {question.map((item) => {
                return <QuestionEnonce key={item.index} handleChange={e => handleChangeQuestion(e, item.index)}/>
            })}
            <Button className="center" onClick={() => addQuestion()}>Ajouter une question</Button>
        </div>
    );
}
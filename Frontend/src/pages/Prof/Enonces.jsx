import MyEditor from "../../components/MyEditor";
import React from "react";
import {Button} from "@material-ui/core";
import QuestionEnonce from "../../components/QuestionEnonce";
import {useDispatch, useSelector} from "react-redux";
import {
    addQuestion,
    deleteQuestion,
    handleChangeEnonce,
    handleChangeQuestion,
    selectEnonce
} from "../../slice/EnoncesSlice";

export default function Enonces() {

    const enonce = useSelector(selectEnonce);
    const dispatch = useDispatch();

    const sendContent = () => {
        console.log(enonce);
    };

    return (
        <div>
            <div style={{width: "70%", margin: 'auto'}}>
                <h1 style={{textAlign: 'center'}}>Création de l'énoncé</h1>
                <MyEditor handleChange={e => dispatch(handleChangeEnonce(e))}/>
            </div>
            {enonce.question.map((item, id) => {
                return (
                    <div key={id} style={{}}>
                        <QuestionEnonce value={item.contenu} handleChange={e => dispatch(handleChangeQuestion({contenu:e, index:id}))}/>
                        <Button className="center" variant="contained" color="secondary"
                                onClick={() => dispatch(deleteQuestion(id))}>X
                        </Button>
                    </div>
                )
            })}
            <Button variant="contained" color="primary" className="center" onClick={() => dispatch(addQuestion())}>Ajouter une
                question</Button>
            <Button variant="contained" color="primary" className="center"
                    onClick={() => sendContent()}>Enregistrer</Button>
        </div>
    );
}
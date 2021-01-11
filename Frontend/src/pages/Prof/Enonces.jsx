import MyEditor from "../../components/MyEditor";
import React, {useState} from "react";
import {Button} from "@material-ui/core";
import QuestionEnonce from "../../components/QuestionEnonce";
import {useDispatch, useSelector} from "react-redux";
import {
    addQuestion,
    deleteQuestion,
    handleChangeEnonce,
    handleChangeQuestion, handleChangeSelect, selectActualise,
    selectEnonce
} from "../../slice/EnoncesSlice";
import useConstructor from "../../components/use/useContructor";
import SelectionCatForm from "../../components/SelectionCatForm";
import {selectModele} from "../../slice/ModeleSlice";
import SelectionModele from "../../components/SelectionModele";
import CircleLoader from "react-spinners/CircleLoader";

export default function Enonces() {

    const [open, setOpen] = useState(false);

    const enonce = useSelector(selectEnonce);
    const dispatch = useDispatch();
    const modele = useSelector(selectModele);
    const actualise = useSelector(selectActualise);

    useConstructor(() => {
        if (modele.idModeleSelectionne === undefined){
            setOpen(true);
        }
    });

    const sendContent = () => {
        console.log(enonce);
    };

    const displayEnonce = () => {
            return (
                <div>
                    <div style={{width: "70%", margin: 'auto'}}>
                        <h1 style={{textAlign: 'center'}}>Création de l'énoncé</h1>
                        <MyEditor handleChange={e => dispatch(handleChangeEnonce(e))}/>
                    </div>
                    {enonce.question.map((item, id) => {
                        return (
                            <div key={id} style={{display: "flex"}}>
                                <QuestionEnonce value={item.contenu} handleChange={e => dispatch(handleChangeQuestion({contenu:e, index:id}))}/>
                                <Button className="center" variant="contained" color="secondary"
                                        onClick={() => dispatch(deleteQuestion(id))}>X
                                </Button>
                                <SelectionCatForm handleChange={e => dispatch(handleChangeSelect({reponse: e, index: id}))}/>
                            </div>
                        )
                    })}
                    <Button variant="contained" color="primary" className="center" onClick={() => dispatch(addQuestion())}>Ajouter une
                        question</Button>
                    <Button variant="contained" color="primary" className="center"
                            onClick={() => sendContent()}>Enregistrer</Button>
                </div>
            )
    }

    return (
        modele.idModeleSelectionne === undefined
            ? <SelectionModele tard={false} setClose={() => setOpen(false)} open={open}/>
            : actualise ? displayEnonce() : <CircleLoader size={50} color={"rgb(7, 91, 114)"} css={{margin : "auto", display : "flex", justifyContent : "center"}}/>
    );
}
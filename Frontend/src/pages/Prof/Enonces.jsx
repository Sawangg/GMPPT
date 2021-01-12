import MyEditor from "../../components/Enonce/MyEditor";
import React, { useState, useEffect } from "react";
import {Button, makeStyles} from "@material-ui/core";
import QuestionEnonce from "../../components/Enonce/QuestionEnonce";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, handleChangeEnonce, handleChangeQuestion, selectActualise, selectEnonce, setQuestions, selectEnregistre, getQuestions } from "../../slice/EnoncesSlice";
import useConstructor from "../../components/use/useContructor";
import SelectionCatForm from "../../components/Enonce/SelectionCatForm";
import { selectModele } from "../../slice/ModeleSlice";
import CircleLoader from "react-spinners/CircleLoader";
import PopUp from '../../components/PopUp';

export default function Enonces() {

    const useStyles = makeStyles((theme) => ({
        enonceSujet: {
            width: "70%",
            margin: 'auto'
        },
        h1: {
            textAlign: 'center'
        },
        divQuestion: {
            display: "flex"
        },
        buttonAddQuestion: {
            backgroundColor: theme.palette.primary.main,
                "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                },
            color: "white",
            display: "block",
            margin: "auto"
        }
    }));
    const classes = useStyles();

    const [openPopUp, setOpenPopUp] = useState(true);

    const enonce = useSelector(selectEnonce);
    const dispatch = useDispatch();
    const modele = useSelector(selectModele);
    const actualise = useSelector(selectActualise);
    const isEnregistre = useSelector(selectEnregistre);

    useConstructor(() => {
        if (!isEnregistre) dispatch(getQuestions(modele.idModeleSelectionne));
    });

    useEffect(() => {
        setOpenPopUp(true)
    }, [isEnregistre])

    const displayEnonce = () => {
        return (
            <div>
                <div className={classes.enonceSujet}>
                    <h1 className={classes.h1}>Création de l'énoncé</h1>
                    <MyEditor handleChange={e => dispatch(handleChangeEnonce(e))}/>
                </div>
                {enonce.question.map((item, id) => {
                    return (
                        <div key={id} className={classes.divQuestion}>
                            <QuestionEnonce id={id} value={item.contenu} handleChange={e => dispatch(handleChangeQuestion({contenu:e, index:id}))}/>
                            <SelectionCatForm index={id}/>
                        </div>
                    )
                })}
                <Button className={classes.buttonAddQuestion} variant="contained" onClick={() => dispatch(addQuestion())}>Ajouter une question</Button>
                <PopUp
                    severity={isEnregistre ? "success" : "warning"}
                    message={isEnregistre ? "Formules enregistrées" : "Enregistrer les modifications"}
                    actionName={isEnregistre ? null : "Enregistrer"}
                    action={() => {if (!isEnregistre) dispatch(setQuestions({ idModele : modele.idModeleSelectionne, enonce: "", tabQuestions : enonce.question }))}}
                    open={openPopUp}
                    handleClose={() => {if (isEnregistre) setOpenPopUp(false)}}
                    pos="left"
                />
            </div>
        );
    }

    return (
        actualise ? displayEnonce() : <CircleLoader size={50} color={"rgb(7, 91, 114)"} css={{margin : "auto", display : "flex", justifyContent : "center"}}/>
    );
}
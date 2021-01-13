import React, { useState, useEffect } from "react";
import {Button, makeStyles} from "@material-ui/core";
import CircleLoader from "react-spinners/CircleLoader";

import QuestionEnonce from "../../components/enonce/QuestionEnonce";
import useConstructor from "../../components/use/useContructor";
import SelectionCatForm from "../../components/enonce/SelectionCatForm";
import PopUp from '../../components/PopUp';
import SelectionModele from '../../components/SelectionModele'
import MyEditor from '../../components/enonce/MyEditor'

import { useDispatch, useSelector } from "react-redux";
import { selectModele, handleChangeEnonce } from "../../slice/ModeleSlice";
import { addQuestion, handleChangeQuestion, selectActualise, selectEnonce, selectEnregistre, getQuestions, setQuestions } from "../../slice/EnoncesSlice";

export default function Enonces() {

    const [open, setOpen] = useState(false);
  
    const useStyles = makeStyles((theme) => ({
        enonceSujet: {
            width: "70%",
            margin: 'auto'
        },
        h1: {
            textAlign: 'center'
        },
        divQuestion: {
            display: "flex",
            justifyContent : "space-around",
            marginTop : 40
        },
        buttonAddQuestion: {
            backgroundColor: theme.palette.primary.main,
                "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                },
            color: "white",
            display: "block",
            margin: "50px auto"
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
        if (!isEnregistre) {
            modele.idModeleSelectionne === null ? setOpen(true) : dispatch(getQuestions(modele.idModeleSelectionne));
            dispatch(handleChangeEnonce(modele.enonceSelectionne));
        }
    });

    useEffect(() => {
        setOpenPopUp(true)
    }, [isEnregistre])

    const displayEnonce = () => {
        return (
            <div>
                <div className={classes.enonceSujet}>
                    <h1 className={classes.h1}>Création de l'énoncé</h1>
                    <MyEditor value={modele.enonceSelectionne} handleChange={e => dispatch(handleChangeEnonce(e))}/>
                </div>
                {enonce.question.map((item, id) => {
                    return (
                        <div key={id} className={classes.divQuestion}>
                            <QuestionEnonce id={id} value={item.contenu} handleChange={e => dispatch(handleChangeQuestion({contenu:e, index:id}))}/>
                            <SelectionCatForm id={id} idModele={modele.idModeleSelectionne}/>
                        </div>
                    )
                })}
                <Button className={classes.buttonAddQuestion} variant="contained" onClick={() => dispatch(addQuestion())}>Ajouter une question</Button>
                <PopUp
                    severity={isEnregistre ? "success" : "warning"}
                    message={isEnregistre ? "Formules enregistrées" : "Enregistrer les modifications"}
                    actionName={isEnregistre ? null : "Enregistrer"}
                    action={() => {if (!isEnregistre) dispatch(setQuestions({ idModele : modele.idModeleSelectionne, enonce : modele.enonceSelectionne, tabQuestions : enonce.question }))}}
                    open={openPopUp}
                    handleClose={() => {if (isEnregistre) setOpenPopUp(false)}}
                    pos="left"
                />
            </div>
        );
    }

    return (
        modele.idModeleSelectionne === null 
        ? <SelectionModele tard={false} setClose={() => setOpen(false)} open={open}/> 
        : actualise ? displayEnonce() : <CircleLoader size={50} color={"rgb(7, 91, 114)"} css={{margin : "auto", display : "flex", justifyContent : "center"}}/>
    );
}
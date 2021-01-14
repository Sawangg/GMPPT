import React, { useState, useEffect } from "react";
import {Button, makeStyles, Fab, Typography} from "@material-ui/core";
import CircleLoader from "react-spinners/CircleLoader";
import DeleteIcon from '@material-ui/icons/Delete';

import QuestionEnonce from "../../components/enonce/QuestionEnonce";
import useConstructor from "../../components/use/useContructor";
import ListeReponses from "../../components/enonce/ListeReponses";
import PopUp from '../../components/PopUp';
import SelectionModele from '../../components/SelectionModele'
import MyEditor from '../../components/enonce/MyEditor'

import { useDispatch, useSelector } from "react-redux";
import { selectModele } from "../../slice/ModeleSlice";
import { addQuestion, removeQuestion, handleChangeEnonce, handleChangeQuestion, selectActualiseEnonce, selectEnonce, selectEnregistreEnonce, getQuestions, setQuestions } from "../../slice/EnoncesSlice";
import { getCategoriesFormules, selectEnregistreFormule } from "../../slice/FormulesSlice"

export default function Enonces() {

    const [open, setOpen] = useState(false);
  
    const useStyles = makeStyles((theme) => ({
        enonceSujet: {
            width: "70%",
            margin: 'auto'
        },
        divQuestion: {
            boxShadow : "0px 8px 20px -5px rgba(0,0,0,0.69)",
            width : "80%",
            margin : "40px auto",
            padding : "1% 2% 2% 2%"
        },
        divQuestionReponse: {
            marginTop : 60,
            display: "flex",
            justifyContent : "space-around",
            flexWrap : "wrap",
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
    const actualiseEnonce = useSelector(selectActualiseEnonce);
    const isEnregistreEnonce = useSelector(selectEnregistreEnonce);
    const isEnregistreFormule = useSelector(selectEnregistreFormule)

    useConstructor(() => {
        if (!isEnregistreEnonce) {
            if ( modele.idModeleSelectionne === null){
                setOpen(true);
            }
            if (!isEnregistreFormule) dispatch(getCategoriesFormules(modele.idModeleSelectionne));
            if (!isEnregistreEnonce) dispatch(getQuestions(modele.idModeleSelectionne));
        }
    });

    useEffect(() => {
        setOpenPopUp(true)
    }, [isEnregistreEnonce])

    const envoyer = () =>{
        dispatch(setQuestions({ idModele : modele.idModeleSelectionne, enonce : enonce.enonceContenu, tabQuestions : enonce.question }));
    }

    const displayEnonce = () => {
        return (
            <div>
                <div className={classes.enonceSujet}>
                    <Typography variant="h1">énoncé</Typography>
                    <MyEditor value={enonce.enonceContenu} handleChange={e => dispatch(handleChangeEnonce(e))}/>
                </div>
                {enonce.question.map((item, id) => {
                    return (
                        <div key={id} className={classes.divQuestion}>
                            <Fab style={{float : "right", marginLeft : 20}} size="small" aria-label="delete"
                                disabled={enonce.question.length === 1}
                                onClick={() => dispatch(removeQuestion(id))}
                            >
                                <DeleteIcon/>
                            </Fab>
                            <div className={classes.divQuestionReponse}>
                                <QuestionEnonce id={id} value={item.contenu} handleChange={e => dispatch(handleChangeQuestion({contenu:e, index:id}))}/>
                                <ListeReponses id={id} idModele={modele.idModeleSelectionne}/>
                            </div>
                        </div>
                    )
                })}
                <Button className={classes.buttonAddQuestion} variant="contained" onClick={() => dispatch(addQuestion())}>Ajouter une question</Button>
                <PopUp
                    severity={isEnregistreEnonce ? "success" : "warning"}
                    message={isEnregistreEnonce ? "Enoncé enregistré" : "Enregistrer les modifications"}
                    actionName={isEnregistreEnonce ? null : "Enregistrer"}
                    action={() => {if (!isEnregistreEnonce) envoyer()}}
                    open={openPopUp}
                    handleClose={() => {if (isEnregistreEnonce) setOpenPopUp(false)}}
                    pos="left"
                />
            </div>
        );
    }

    return (
        modele.idModeleSelectionne === null 
        ? <SelectionModele tard={false} setClose={() => setOpen(false)} open={open}/> 
        : actualiseEnonce ? displayEnonce() : <CircleLoader size={50} color={"rgb(7, 91, 114)"} css={{margin : "auto", display : "flex", justifyContent : "center"}}/>
    );
}
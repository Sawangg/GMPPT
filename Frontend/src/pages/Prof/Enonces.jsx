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
import useUnload from '../../components/use/useUnload';

import { useDispatch, useSelector } from "react-redux";
import { selectModele } from "../../slice/ModeleSlice";
import { addQuestion, removeQuestion, handleChangeEnonce, handleChangeQuestion, selectActualiseEnonce, selectEnonce, selectEnregistreEnonce, getSujet, setQuestions } from "../../slice/EnoncesSlice";
import { getCategoriesFormules, selectEnregistreFormule, selectFormule} from "../../slice/FormulesSlice"

export default function Enonces() {

    const [open, setOpen] = useState(false);
  
    const useStyles = makeStyles((theme) => ({
        hr: {
            width: "80%",
            marginBottom: "2%"
        },
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
            display: "block",
            margin: "50px auto"
        },
        fabDelete: {
            float : "right",
            marginLeft : 20,
            color: "white",
            backgroundColor: theme.palette.error.main,
            "&:hover": {
                backgroundColor: theme.palette.error.dark
            }
        }
    }));
    const classes = useStyles();

    const [openPopUp, setOpenPopUp] = useState(true);

    const enonce = useSelector(selectEnonce);
    const dispatch = useDispatch();
    const modele = useSelector(selectModele);
    const actualiseEnonce = useSelector(selectActualiseEnonce);
    const isEnregistreEnonce = useSelector(selectEnregistreEnonce);
    const isEnregistreFormule = useSelector(selectEnregistreFormule);
    const tabCatForm = useSelector(selectFormule);

    useConstructor(() => {
        if (!isEnregistreEnonce) {
            if ( modele.idModeleSelectionne === null){
                setOpen(true);
            }
            if (!isEnregistreFormule) dispatch(getCategoriesFormules(modele.idModeleSelectionne));
            if (!isEnregistreEnonce) dispatch(getSujet(modele.idModeleSelectionne));
        }
    });

    useEffect(() => {
        setOpenPopUp(true)
    }, [isEnregistreEnonce])

    useUnload(!isEnregistreEnonce);

    const displayEnonce = () => {
        return (
            <div>
                <Typography variant="h1">énoncé</Typography>
                <hr className={classes.hr}/>
                <div className={classes.enonceSujet}>
                    <MyEditor value={enonce.enonceContenu} handleChange={e => dispatch(handleChangeEnonce(e))}/>
                </div>
                {enonce.question.map((item, id) => {
                    return (
                        <div key={id} className={classes.divQuestion}>
                            <Fab className={classes.fabDelete} size="small" aria-label="delete"
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
                <Button className={classes.buttonAddQuestion} variant="contained" color="primary" onClick={() => dispatch(addQuestion(tabCatForm[0].tabFormule[0].nomFormule))}>Ajouter une question</Button>
                <PopUp
                    severity={isEnregistreEnonce ? "success" : "warning"}
                    message={isEnregistreEnonce ? "Enoncé enregistré" : "Enregistrer les modifications"}
                    actionName={isEnregistreEnonce ? null : "Enregistrer"}
                    action={() => {
                        if (!isEnregistreEnonce) dispatch(setQuestions({ idModele : modele.idModeleSelectionne, enonce : enonce.enonceContenu, tabQuestions : enonce.question }));
                    }}
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
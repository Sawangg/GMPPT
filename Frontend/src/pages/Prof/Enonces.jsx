import React, { useCallback, useState, useEffect } from "react";
import { Button, makeStyles, Fab, Typography } from "@material-ui/core";
import CircleLoader from "react-spinners/CircleLoader";
import DeleteIcon from '@material-ui/icons/Delete';

import QuestionEnonce from "../../components/enonce/QuestionEnonce";
import useConstructor from "../../components/use/useContructor";
import ListeReponses from "../../components/enonce/ListeReponses";
import SelectionModele from '../../components/SelectionModele';
import MyEditor from '../../components/enonce/EnTete';
import useUnload from '../../components/use/useUnload';
import EnregistrementEnonce from '../../components/enonce/EnregistrementEnonce';

import { useDispatch, useSelector } from "react-redux";
import { selectIdModeleSelectionne } from "../../slice/ModeleSlice";
import { addQuestion, removeQuestion, handleChangeEnonce, handleChangeQuestion, selectActualiseEnonce, selectTabQuestionLength, selectEnregistreEnonce, getSujet, selectContenuEnonce } from "../../slice/EnoncesSlice";
import { getCategoriesFormules, selectEnregistreFormule, selectPremiereFormule, selectChangement } from "../../slice/FormulesSlice";

export default function Enonces() {

    const [open, setOpen] = useState(false);

    const useStyles = makeStyles((theme) => ({
        hr: {
            width: "80%",
            marginBottom: "2%"
        },
        enonceSujet: {
            width: "70%",
            margin: "auto"
        },
        divQuestion: {
            boxShadow: "0px 8px 20px -5px rgba(0,0,0,0.69)",
            width: "80%",
            margin: "40px auto",
            padding: "1% 2% 2%"
        },
        divQuestionReponse: {
            marginTop: 40,
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
        },
        buttonAddQuestion: {
            display: "block",
            margin: "50px auto"
        },
        fabDelete: {
            float: "right",
            marginLeft: 20,
            color: "white",
            backgroundColor: theme.palette.error.main,
            "&:hover": {
                backgroundColor: theme.palette.error.dark
            }
        }
    }));

    const classes = useStyles();

    const dispatch = useDispatch();
    const idModele = useSelector(selectIdModeleSelectionne);
    const actualiseEnonce = useSelector(selectActualiseEnonce);
    const isEnregistreEnonce = useSelector(selectEnregistreEnonce);
    const isEnregistreFormule = useSelector(selectEnregistreFormule);
    const premierFormule = useSelector(selectPremiereFormule);
    const tabQuestionLength = useSelector(selectTabQuestionLength);
    const enTete = useSelector(selectContenuEnonce);
    const changementFormule = useSelector(selectChangement);

    useConstructor(() => {
        if (!isEnregistreEnonce) {
            if (idModele === null) {
                setOpen(true);
            }
            if (!isEnregistreFormule) dispatch(getCategoriesFormules(idModele));
            if (!isEnregistreEnonce) dispatch(getSujet(idModele));
        }
    });

    useEffect(() => {
        if (changementFormule) {
            dispatch(getCategoriesFormules(idModele));
        }
    }, [changementFormule, dispatch, idModele]);

    useUnload(!isEnregistreEnonce);

    const deleteQuestion = useCallback((index) => {
        dispatch(removeQuestion(index));
    }, [dispatch]);

    const displayEnonce = () => {
        return (
            <div>
                <Typography variant="h1">énoncé</Typography>
                <hr className={classes.hr} />
                <div className={classes.enonceSujet}>
                    <MyEditor value={enTete} handleChange={e => dispatch(handleChangeEnonce(e))} />
                </div>
                {Array(tabQuestionLength).fill(0).map((_, index) => (
                    <div key={index} className={classes.divQuestion}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p style={{ fontSize: "200%", margin: "auto 0" }}>Question {index + 1}</p>
                            <Fab className={classes.fabDelete} size="small" aria-label="delete"
                                disabled={tabQuestionLength === 1}
                                onClick={() => deleteQuestion()}
                            >
                                <DeleteIcon />
                            </Fab>
                        </div>
                        <div className={classes.divQuestionReponse}>
                            <QuestionEnonce index={index} handleChange={e => dispatch(handleChangeQuestion({ contenu: e, index: index }))} />
                            <ListeReponses index={index} idModele={idModele} />
                        </div>
                    </div>
                ))}
                <Button
                    disabled={tabQuestionLength >= 20}
                    className={classes.buttonAddQuestion}
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(addQuestion(premierFormule))}
                >
                    Ajouter une question
                </Button>
                <EnregistrementEnonce />
            </div>
        );
    }

    return (
        idModele === null
            ? <SelectionModele tard={false} setClose={() => setOpen(false)} open={open} />
            : actualiseEnonce ? displayEnonce() : <CircleLoader size={50} color={"rgb(7, 91, 114)"} css={{ margin: "auto", display: "flex", justifyContent: "center" }} />
    );
}
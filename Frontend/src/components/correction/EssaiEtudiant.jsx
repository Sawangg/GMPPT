import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';

import { Table, TableContainer, TableHead, TableRow, Paper, TableCell, TableBody, Typography, Collapse, Box, IconButton, DialogActions, Button, TextField, makeStyles } from '@material-ui/core';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { useDispatch, useSelector } from 'react-redux';
import { changeReponseJuste, selectEssaisWithID, changeCommentaire, changeNote, setCorrigeTrue, selectUneQuestionJuste, setAvisApplication } from '../../slice/ConsulterSlice';

const useStyles = makeStyles(() => ({
    boxReponses: {
        paddingBottom: 0,
        paddingTop: 0,
        backgroundColor: "#f2f2f2"
    },
    commentaire: {
        width: "100%"
    },
    noteTextField: {
        width: '30px'
    },
    noteInput: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
}));

export default function EssaiEtudiant(props) {
    const essai = useSelector(selectEssaisWithID(props.indexEssai));

    const dispatch = useDispatch();

    const [actualise, setActu] = useState(false);

    useEffect(() => {
        if (props.open) {
            if (!actualise) {
                dispatch(setAvisApplication());
                setActu(true);
            }
        }

    }, [actualise, dispatch, props.open]);


    const handleClose = () => {
        setActu(false);
        props.setOpen(false);
    }

    const appliquerCorrection = () => {
        dispatch(setCorrigeTrue(props.indexEssai));
        handleClose();
    }

    return (
        essai === undefined ?
            null :
            <Dialog
                open={props.open}
                maxWidth="md"
                fullWidth={true}
                onClose={handleClose}>
                <DialogTitle>
                    Essai du {moment(essai.dateEssai).format("DD/MM/YYYY")}
                </DialogTitle>

                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" />
                                    <TableCell align="center">Numéro Question</TableCell>
                                    <TableCell align="center">Réponses Justes</TableCell>
                                    <TableCell align="center">Réponses Attendues</TableCell>
                                    <TableCell align="center">Question Juste?</TableCell>
                                    <TableCell align="center"
                                        title="Attention, cette note est à titre indicatif et ne concerne que cet essai"
                                    >Votre Note</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {essai.tabQuestions.map((item, index) => {
                                    return (
                                        <Question question={item} indexQuestion={index} indexEssai={props.indexEssai} />
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>

                <DialogActions>
                    <Button onClick={appliquerCorrection}>Appliquer la correction</Button>
                    <Button onClick={handleClose}>Fermer</Button>
                </DialogActions>

            </Dialog>
    )
}

const IconeJuste = (props) => {
    return (
        props.juste
            ?
            <CheckIcon />
            :
            <ClearIcon />
    )
}

const Question = (props) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const questionCorrigee = useSelector(selectUneQuestionJuste(props.question.num));

    //s'occupe de changer le bouléen disant qu'une réponse est juste ou non d'après le prof
    const handleClickJuste = (indexQ, indexR) => {
        dispatch(changeReponseJuste({
            indexE: props.indexEssai,
            indexQ: indexQ,
            indexR: indexR
        }));
    }

    //s'occupe de changer le commentaire du prof sur une question
    const handleChangeCommentaire = (event) => {
        dispatch(changeCommentaire({
            indexE: props.indexEssai,
            indexQ: props.indexQuestion,
            commentaire: event.target.value
        }));
    }

    //s'occupe de changer la note
    const handleChangeNote = (event) => {
        dispatch(changeNote({
            indexE: props.indexEssai,
            indexQ: props.indexQuestion,
            note: event.target.value
        }));
    }

    //s'occupe de donner le nombre de réponses correctes dans cette question
    const nbReponsesJuste = () => {
        let nb = 0
        props.question.tabReponses.forEach(reponse => {
            if (reponse.justeProf) {
                nb++
            }
        });
        return nb;
    }

    //la flècle pour afficher plus ou moins d'information sur la question
    const collapseArrow = () => {
        return (
            <IconButton onClick={() => setOpen(!open)}>
                {
                    open
                        ?
                        <KeyboardArrowUpIcon />
                        :
                        <KeyboardArrowDownIcon />
                }
            </IconButton>
        );
    }

    const questionJuste = () => {
        return (
            <IconeJuste juste={
                props.question.tabReponses.length === questionCorrigee.tabReponses.length &&
                nbReponsesJuste() === questionCorrigee.tabReponses.length} />
        );
    }

    //bouton du prof pour dire si une réponse est juste ou non
    //paramètres : index de la question, index de la reponse, bool
    const boutonJustePourProf = (indexQ, indexR, juste) => {
        return (
            <IconButton onClick={e => handleClickJuste(indexQ, indexR)}>
                <IconeJuste juste={juste} />
            </IconButton>
        );
    }

    //affiche la zone où le professeur peut saisir son commentaire
    const commentaireProf = () => {
        return (
            <>
                <Typography variant="h6" padding={5}>Vos commentaires sur ce travail :</Typography>
                <TextField value={props.question.commentProf} onChange={handleChangeCommentaire}
                    multiline rows={4} variant="outlined" placeholder="Écrivez vos commentaires"
                    className={classes.commentaire} />
            </>
        );
    }

    const note = () => {
        return (
            <TextField className={classes.noteTextField} align="center"
                onChange={e => handleChangeNote(e)}
                value={props.question.note}
                InputProps={{
                    className: classes.noteInput
                }} 
            />
        );
    }

    return (
        <>
            <TableRow>
                {/* On affiche la fleche pour avoir plus/moins d'information */}
                <TableCell align="center">{collapseArrow()}</TableCell>
                {/* Numéro de la question */}
                <TableCell align="center">{props.indexQuestion + 1}</TableCell>
                {/* nombre de réponses justes dans la question */}
                <TableCell align="center">{nbReponsesJuste()}</TableCell>
                {/* nombre de réponses attendues */}
                <TableCell align="center">{questionCorrigee.tabReponses.length}</TableCell>
                {/* voit si la question est juste */}
                <TableCell align="center">{questionJuste()}</TableCell>
                {/* note */}
                <TableCell align="center">{note()}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={classes.boxReponses} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom >Contenu de la question</Typography>
                            {ReactHtmlParser(questionCorrigee.contenu)}
                            <Typography variant="h6" gutterBottom >Reponses</Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            Valeur donnée
                                    </TableCell>
                                        <TableCell align="center">
                                            Ecart avec la bonne valeur
                                    </TableCell>
                                        <TableCell align="center">
                                            Conseil de l'application
                                    </TableCell>
                                        <TableCell align="center">
                                            Votre avis
                                    </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.question.tabReponses.map((reponse, indexReponse) =>
                                        <TableRow>
                                            {/* Valeur donnée par l'étudiant */}
                                            <TableCell align="center" padding='none'>
                                                {reponse.value}
                                            </TableCell>
                                            {/* Ecart avec la valeur juste */}
                                            <TableCell align="center" padding='none'>
                                                {reponse.ecart}
                                            </TableCell>
                                            {/* l'avis de l'application pour savoir si la réponse est juste */}
                                            <TableCell align="center" padding='none'>
                                                <IconeJuste juste={reponse.justeApp} />
                                            </TableCell>
                                            {/* Réponse juste où non */}
                                            <TableCell align="center" padding='none'>
                                                {boutonJustePourProf(props.indexQuestion, indexReponse, reponse.justeProf)}
                                            </TableCell>
                                        </TableRow>)
                                    }
                                </TableBody>
                            </Table>
                            {
                                props.question.justif !== "" ?
                                    <>
                                        <Typography variant="h6" padding={5}>Justification de l'étudiant :</Typography>
                                        <p>{props.question.justif}</p>
                                    </>
                                    :
                                    <Typography variant="h6">Pas de justification de l'étudiant</Typography>
                            }

                            {commentaireProf()}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
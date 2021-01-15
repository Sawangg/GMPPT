import React, {useState} from "react";
import {Button, makeStyles, Accordion, AccordionSummary, AccordionDetails,} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropagateLoader from "react-spinners/PropagateLoader";

import Reponse from './Reponse';

import { useSelector, useDispatch } from "react-redux";
import { selectEnregistreFormule, selectFormule } from "../../slice/FormulesSlice";
import {addReponse, selectTabReponse, removeReponse } from '../../slice/EnoncesSlice'

export default function ListeReponses(props) {
    const useStyles = makeStyles((theme) => ({
        divListeReponses: {
            width : "100%",
            marginTop : "1%"
        },
        buttonAjouterReponse: {
            display : "block",
            marginBottom : "2%",
        },
        buttonSupprimerReponse: {
            color: "white",
            backgroundColor: theme.palette.error.main,
            "&:hover": {
                backgroundColor: theme.palette.error.dark,
            },
            "&:disabled": {
                backgroundColor: theme.palette.secondary.main,
            }
        },
        accordionDetails: {
            display : "flex",
            flexDirection : "column",
            justifyContent : "space-around"
        }
    }));
    const classes = useStyles();

    const isEnregistre = useSelector(selectEnregistreFormule);
    const tabReponse = useSelector(selectTabReponse(props.id))
    const [expanded, setExpanded] = useState(true);
    const tabCatForm = useSelector(selectFormule);

    const dispatch = useDispatch();

    return (
        <div className={classes.divListeReponses}>
            <Accordion square expanded={expanded} onChange={() =>setExpanded(!expanded)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>Réponses à la question {props.id+1}</AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        <Button variant="contained" className={classes.buttonAjouterReponse} color="primary" onClick={() => dispatch(addReponse({id : props.id, formule1 : tabCatForm[0].tabFormule[0].nomFormule}))}>Ajouter une réponse</Button>
                        {!isEnregistre ? <PropagateLoader size={15} color={"rgb(7, 91, 114)"} css={{margin : "30px auto", display : "flex", justifyContent : "center"}}/>  
                        :tabReponse.map((elem, index) => (
                            <div>
                                <Reponse key={index} tabCatForm={tabCatForm} element={elem} indexReponse={index} indexQuestion={props.id}/>
                                <Button className={classes.buttonSupprimerReponse} disabled={tabReponse.length === 1} onClick={() => dispatch(removeReponse({indexQuestion : props.id, indexReponse : index}))}>Supprimer la réponse</Button>
                            </div>
                        ))}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

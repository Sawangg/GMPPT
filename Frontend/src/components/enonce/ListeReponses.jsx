import React, {useState} from "react";
import {Button, makeStyles, Accordion, AccordionSummary, AccordionDetails,} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useConstructor from "../use/useContructor";
import Reponse from './Reponse';

import { useSelector, useDispatch } from "react-redux";
import { selectEnregistreFormule, getCategoriesFormules } from "../../slice/FormulesSlice";
import {addReponse, selectTabReponse, removeReponse } from '../../slice/EnoncesSlice'

export default function ListeReponses(props) {
    const useStyles = makeStyles((theme) => ({
        divListeReponses: {
            width : "100%",
            marginTop : "1%"
        },
        buttonAjouterReponse: {
            maxWidth: "350px",
            maxHeight: "36px",
            display : "block",
            marginBottom : "2%",
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main
        }
    }));
    const classes = useStyles();

    const isEnregistre = useSelector(selectEnregistreFormule);
    const tab = useSelector(selectTabReponse(props.id))
    const [expanded, setExpanded] = useState(true);
    const dispatch = useDispatch();

    useConstructor(() => {
        if (!isEnregistre) dispatch(getCategoriesFormules(props.idModele))
    })

    return (
        <div className={classes.divListeReponses}>
            <Accordion square expanded={expanded} onChange={() =>setExpanded(!expanded)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>Réponses à la question {props.id+1}</AccordionSummary>
                    <AccordionDetails style={{display : "flex", flexDirection : "column", justifyContent : "space-around"}}>
                        <Button variant="outlined" className={classes.buttonAjouterReponse} onClick={() => dispatch(addReponse(props.id))}>Ajouter une réponse</Button>
                        {tab.map((elem, index) => (
                            <div>
                                <Reponse key={index} element={elem} indexReponse={index} indexQuestion={props.id}/>
                                <Button disabled={tab.length === 1} onClick={() => dispatch(removeReponse({indexQuestion : props.id, indexReponse : index}))}>Supprimer la réponse</Button>
                            </div>
                        ))}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

import React, {useState} from "react";
import {Button, makeStyles, Accordion, AccordionSummary, AccordionDetails, Fab} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropagateLoader from "react-spinners/PropagateLoader";
import DeleteIcon from '@material-ui/icons/Delete';

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
        buttonSupprimerReponse: {
            color: "white",
            backgroundColor: theme.palette.error.main,
            "&:hover": {
                backgroundColor: theme.palette.error.dark,
            },
            "&:disabled": {
                backgroundColor: theme.palette.secondary.main,
            },
            position : "absolute",
            right : "2.5%",
        },
        accordionDetails: {
            display : "flex",
            flexDirection : "column",
            justifyContent : "space-around"
        }, 
        divReponse: {
            marginTop : 20
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
                        <Button 
                            disabled={tabReponse.length >= 10}
                            variant="contained" 
                            color="primary" 
                            onClick={() => dispatch(addReponse({id : props.id, formule1 : tabCatForm[0].tabFormule[0].nomFormule}))}
                            >
                                Ajouter une réponse
                        </Button>
                        {!isEnregistre ? <PropagateLoader size={15} color={"rgb(7, 91, 114)"} css={{margin : "30px auto", display : "flex", justifyContent : "center"}}/>  
                        :tabReponse.map((elem, index) => (
                            <div className={classes.divReponse}>
                                <Fab className={classes.buttonSupprimerReponse} size="small" aria-label="delete"
                                     disabled={tabReponse.length === 1}
                                     onClick={() => dispatch(removeReponse({indexQuestion : props.id, indexReponse : index}))}
                                >
                                    <DeleteIcon/>
                                </Fab>                                
                                <Reponse key={index} tabCatForm={tabCatForm} element={elem} indexReponse={index} indexQuestion={props.id}/>
                            </div>
                        ))}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

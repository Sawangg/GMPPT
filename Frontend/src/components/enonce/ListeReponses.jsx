import React, {useCallback, useState} from "react";
import {Button, makeStyles, Accordion, AccordionSummary, AccordionDetails, Fab} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropagateLoader from "react-spinners/PropagateLoader";
import DeleteIcon from '@material-ui/icons/Delete';

import Reponse from './ItemReponse';

import { useSelector, useDispatch } from "react-redux";
import { selectEnregistreFormule, selectPremiereFormule } from "../../slice/FormulesSlice";
import {addReponse, selectTabReponse, removeReponse, selectReponseLength } from '../../slice/EnoncesSlice'

const ListeReponses = ({index}) => {
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

    const dispatch = useDispatch();

    const isEnregistre = useSelector(selectEnregistreFormule);
    const tabReponse = useSelector(selectTabReponse(index))
    const [expanded, setExpanded] = useState(true);
    const tabReponseLength = useSelector(selectReponseLength(index));
    const premierFormule = useSelector(selectPremiereFormule);

    const add = useCallback (() => {
        dispatch(addReponse({id : index, formule1 : premierFormule}));
    }, [dispatch, index, premierFormule])

    const remove = useCallback ((indexReponse) => {
        dispatch(removeReponse({indexQuestion : index, indexReponse : indexReponse}));
    }, [dispatch, index])

    return (
        <div className={classes.divListeReponses}>
            <Accordion square expanded={expanded} onChange={() =>setExpanded(!expanded)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>Réponses à la question {index+1}</AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        <Button 
                            disabled={tabReponse.length >= 10}
                            variant="contained" 
                            color="primary" 
                            onClick={() => add()}
                            >
                                Ajouter une réponse
                        </Button>
                        {!isEnregistre ? <PropagateLoader size={15} color={"rgb(7, 91, 114)"} css={{margin : "30px auto", display : "flex", justifyContent : "center"}}/>  
                        :
                        Array(tabReponseLength).fill(0).map((_, indexReponse) => (
                            <div className={classes.divReponse}>
                                <Fab className={classes.buttonSupprimerReponse} size="small" aria-label="delete"
                                     disabled={tabReponse.length === 1}
                                     onClick={() => remove(indexReponse)}
                                >
                                    <DeleteIcon/>
                                </Fab>                                
                                <Reponse key={indexReponse} indexReponse={indexReponse} indexQuestion={index}/>
                            </div>
                        ))}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default React.memo(ListeReponses);

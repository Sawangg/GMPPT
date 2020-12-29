import React from 'react';
import {Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import LoopIcon from '@material-ui/icons/Loop';

import { useDispatch } from 'react-redux';
import { addPartieUnite, remettreAZero} from '../../slice/RepondreQuestionsSlice'

import Item from './ItemChoixUnite';

export default function ChoixUnite(props){

    const dispatch = useDispatch();

    const NB_MAX_PARTIES_UNITE = 6
    const MAX_WIDTH = "md"

    const handleAjouterUnite = () =>{
        dispatch(addPartieUnite({
            indexQuestion : props.indexQuestion,
            indexReponse : props.indexReponse
        }))
    }

    const handleRemettreAZero = () =>{
        dispatch(remettreAZero({
            indexQuestion : props.indexQuestion,
            indexReponse : props.indexReponse
        }))
    }

    return(
        <Dialog 
            open={props.open}
            maxWidth={MAX_WIDTH}
            fullWidth={true}
        >
            <DialogTitle className="alignement_horizontal">
                Choix de l'unité
            </DialogTitle>
            <DialogContent>
                <div className="alignement_horizontal">
                    {props.unite.map((i, index) => 
                        <>
                        <Item index={index} unite={i} unites={props.unites} tabLength={props.unite.length}
                        indexQuestion={props.indexQuestion} indexReponse={props.indexReponse} />
                        {index < props.unite.length-1 ? <b>.</b> : null}
                        </>
                    )}
                </div>
                <div className="alignement_horizontal">
                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={handleAjouterUnite}
                        disabled={props.unite.length >= NB_MAX_PARTIES_UNITE }
                    >
                        Ajouter Unite
                    </Button>
                    <IconButton size="small" color="primary" onClick={handleRemettreAZero} 
                        title="remettre à 0">
                        <LoopIcon/>
                    </IconButton>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={e=>props.handleClose("annuler")}>
                    Annuler
                </Button>
                <Button onClick={e=>props.handleClose("appliquer a tous")} 
                    title="appliquer l'unité à toutes les réponses de la question">
                    Appliquer à tous
                </Button>
                <Button onClick={e=>props.handleClose("appliquer")}>
                    Appliquer
                </Button>
            </DialogActions>
        </Dialog>
    )

}
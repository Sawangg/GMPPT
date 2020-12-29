import React from 'react';
import {Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import LoopIcon from '@material-ui/icons/Loop';

import { useDispatch } from 'react-redux';
import { addPartieUnite, remettreAZero} from '../../slice/RepondreQuestionsSlice'

import Item from './ItemChoixUnite';

export default function ChoixUnite(props){

    //Partie unité : 'Kg^3' est une partie d'unité de 'm^2.Kg^3'
    //caractérisé par un    id (identifiant de l'unité dans le tableau unites)
    //                      puissance

    const dispatch = useDispatch();

    const NB_MAX_PARTIES_UNITE = 6
    const MAX_WIDTH = "lg" //taille de la boite de dialogue

    //gère l'ajout d'une partie d'unité dans l'unité de la réponse
    const handleAjouterUnite = () =>{
        dispatch(addPartieUnite({
            indexQuestion : props.indexQuestion,
            indexReponse : props.indexReponse
        }))
    }

    //remete l'unité à [{id : 0, puissance : 1}], soit sans unité
    const handleRemettreAZero = () =>{
        dispatch(remettreAZero({
            indexQuestion : props.indexQuestion,
            indexReponse : props.indexReponse
        }))
    }

    return(
        <Dialog 
            open={props.open} //ouverture gérée dans ItemReponse
            maxWidth={MAX_WIDTH}
            fullWidth={false}
        >
            <DialogTitle className="alignement_horizontal">
                Choix de l'unité
            </DialogTitle>

            <DialogContent>
                <div className="alignement_horizontal"> 
                    {/* affiche un à un les différentes parties d'unités*/}
                    {props.unite.map((i, index) => 
                        <>
                        <Item index={index} unite={i} tabLength={props.unite.length}
                        indexQuestion={props.indexQuestion} indexReponse={props.indexReponse} />

                        {/* interserction avec des . entre les parties d'unité */}
                        {index < props.unite.length-1 ? <b>.</b> : null}
                        </>
                    )}
                </div>

                {/* boutons d'action dans la fenêtre */}
                <div className="alignement_horizontal">

                    {/* bouton ajout de partie d"unité */}
                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={handleAjouterUnite}
                        
                        //disabled si on atteint la limite de partie d'unité (6)
                        disabled={props.unite.length >= NB_MAX_PARTIES_UNITE }
                    >
                        Ajouter Unite
                    </Button>

                    {/* bouton pour remettre à zéro cette unité en entière */}
                    <IconButton size="small" color="primary" onClick={handleRemettreAZero} 
                        title="remettre à 0">
                        <LoopIcon/>
                    </IconButton>

                </div>
            </DialogContent>

            {/* boutons de fermeture de boite de dialogue */}
            <DialogActions>

                {/* bouton pour annuler la modification de l'unité */}
                <Button onClick={e=>props.handleClose("annuler")}>
                    Annuler
                </Button>

                {/* bouton pour appliquer à toutes les réponses de la question cette même unité */}
                <Button onClick={e=>props.handleClose("appliquer a tous")} 
                    title="appliquer l'unité à toutes les réponses de la question">
                    Appliquer à tous
                </Button>

                {/* bouton pour appliquer uniquement à cette réponse cette unité */}
                <Button onClick={e=>props.handleClose("appliquer")}>
                    Appliquer
                </Button>
                
            </DialogActions>
        </Dialog>
    )

}
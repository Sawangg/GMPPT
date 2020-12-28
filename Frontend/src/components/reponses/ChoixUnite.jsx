import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import _ from "lodash"

import { useDispatch } from 'react-redux';
import { addPartieUnite } from '../../slice/RepondreQuestionsSlice'

import Item from './ItemChoixUnite';

export default function ChoixUnite(props){

    const dispatch = useDispatch();

    const handleAjouterUnite = () =>{
        dispatch(addPartieUnite({
            indexQuestion : props.indexQuestion,
            indexReponse : props.indexReponse
        }))
    }

    return(
        <Dialog open={props.open}>
            <DialogTitle>
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
                <Button className="buttonAjouterUnite" onClick={handleAjouterUnite}>Ajouter Unite</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={e=>props.handleClose()}>
                    Appliquer
                </Button>
            </DialogActions>
        </Dialog>
    )

}
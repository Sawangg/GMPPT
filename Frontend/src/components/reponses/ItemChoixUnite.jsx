import React from 'react';
import {IconButton, TextField, MenuItem, InputAdornment} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { useDispatch } from 'react-redux';
import { changePartieUnite, deletePartieUnite, changePuissancePartieUnite } from '../../slice/RepondreQuestionsSlice'

export default function Item(props){

    const dispatch = useDispatch();

    //gère le changement d'unité par action sur le select
    const handleChangeUnite = (event) =>{
      dispatch(changePartieUnite({
          indexQuestion : props.indexQuestion, 
          indexReponse : props.indexReponse,
          indexUnite : props.index,
          value : event.target.value 
        }))
    }

    //gère la suppression de cette partie d'unité
    const handleDeleteUnite = () =>{
      dispatch(deletePartieUnite({
        indexQuestion : props.indexQuestion, 
        indexReponse : props.indexReponse,
        indexUnite : props.index
      }))
    }

    //gère le changement de la puissance au fur et à mesure que l'étudiant la tape
    //n'accepte que nombres entre -100 et 100
    const handleChangePuissance = (event) =>{
      dispatch(changePuissancePartieUnite({
        indexQuestion : props.indexQuestion, 
        indexReponse : props.indexReponse,
        indexUnite : props.index,
        value : event.target.value
      }))
    }

    //lorque l'on quitte le focus sur la puissance, s'assure que la puissance soit bonne
    //si valeur est égal à 0, ou à '-' ou à '', transforme en 1
    const handleBlurUnite = () =>{
      let pow = props.unite.puissance
      if(parseInt(pow) === 0 || pow === '-' || pow === ''){
        dispatch(changePuissancePartieUnite({
          indexQuestion : props.indexQuestion, 
          indexReponse : props.indexReponse,
          indexUnite : props.index,
          value : 1
        }))
      }
    }

    //affichage du bouton de suppression de partie d'unité
    const buttonDelete = () =>{
      return(
        <IconButton size="small" color="secondary" onClick={handleDeleteUnite} >
          <DeleteIcon/>
        </IconButton>
      )
    }

    // FONCTION A AMELIORER (+ de boutons)
    //affichage des boutons au dessus du choix d'une partie d'unité
    const buttons = () =>{
      return(
        <div className="button_gap">
          {/* n'affiche le bouton de suppression que si il y a plus d'une partie d'unité */}
          {props.tabLength > 1 ? buttonDelete() : null }
        </div>
      )
    }


    return(
      <div className="choix_input">
        {buttons()}

        {/* Select de l'unité */}
        <TextField select value={props.unite.id} onChange={handleChangeUnite}>
            {props.unites.map((i, index) => 
            <MenuItem key={index} value={index} >
                {i.nom}
            </MenuItem>)}
        </TextField>

        {/* affiche la modif de puissance que si n'est pas Sans unité */}
        {props.unite.id !== 0 ? 
        <>
        {/* modif puissance */}
        <TextField value={props.unite.puissance} className="puissance" 
            onChange={e=>handleChangePuissance(e)}
            onBlur={handleBlurUnite}
            InputProps={{ startAdornment: (
                    <InputAdornment position="start">
                      ^
                    </InputAdornment>
                    ),
                }} />
        </>
        : null }
      </div>

    )
}
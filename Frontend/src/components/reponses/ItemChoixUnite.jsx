import React from 'react';
import {IconButton, TextField, MenuItem, InputAdornment, makeStyles} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { useDispatch, useSelector } from 'react-redux';
import { changePartieUnite, deletePartieUnite, changePuissancePartieUnite, selectUnites } from '../../slice/RepondreQuestionsSlice'

export default function Item(props){

    const useStyles = makeStyles((theme) => ({
        buttonDelete: {
            color: theme.palette.error.main,
                "&:hover": {
                    color: theme.palette.error.dark,
                }
        },
        buttonGap: {
            display: "flex",
            justifyContent: "center",
            columnGap: "10px"
        },
        choixInput: {
            marginBottom : "10px"
        },
        puissance: {
            width: "40px"
        }
    }));
    const classes = useStyles();

    const dispatch = useDispatch();

    const unitesReference = useSelector(selectUnites)

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
        <IconButton className={classes.buttonDelete} size="small" color="secondary" onClick={handleDeleteUnite} >
          <DeleteIcon/>
        </IconButton>
      )
    }

    // FONCTION A AMELIORER (+ de boutons)
    //affichage des boutons au dessus du choix d'une partie d'unité
    const buttons = () =>{
      return(
        <div className={classes.buttonGap}>
          {/* n'affiche le bouton de suppression que si il y a plus d'une partie d'unité */}
          {props.tabLength > 1 ? buttonDelete() : null }
        </div>
      )
    }


    return(
      <div className={classes.choixInput}>
        {buttons()}

        {/* Select de l'unité */}
        <TextField select value={props.unite.id} onChange={handleChangeUnite}>
            {unitesReference.map((i, index) => 
            <MenuItem key={index} value={index} >
                {i.nom}
            </MenuItem>)}
        </TextField>

        {/* affiche la modif de puissance que si n'est pas Sans unité */}
        {props.unite.id !== 0 ? 
        <>
        {/* modif puissance */}
        <TextField value={props.unite.puissance} className={classes.puissance}
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
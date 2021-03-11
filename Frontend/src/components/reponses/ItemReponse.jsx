import React, { useState } from 'react';
import { Button, TextField, Fab, InputAdornment, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { useDispatch, useSelector } from "react-redux";
import { changeReponse, peutSupprimer, deleteReponse, setUnite } from '../../slice/RepondreQuestionsSlice';

import ChoixUnite from '../unite/ChoixUnite';
import { afficherUnites } from '../unite/UniteFunctions';

export default function Item(props) {

     const useStyles = makeStyles((theme) => ({
          buttonDelete: {
               color: "white",
               backgroundColor: theme.palette.error.main,
               "&:hover": {
                    backgroundColor: theme.palette.error.dark
               },
          },
          reponse: {
               margin: "5px 0px",
               display: "flex",
               alignItems: "center",
               columnGap: "10px"
          },
          inputAdornmentReponse: {
               width: "100px",
          }
     }));

     const classes = useStyles();

     //indique si la boite de dialogue choix unité est ouverte ou fermée
     const [choixUniteOpen, setOpen] = useState(false);

     const dispatch = useDispatch();

     //booléen qui autorise la suppression d'une réponse si il y a plus d'une réponse affiché
     const canDelete = useSelector(peutSupprimer(props.indexQuestion))

     //s'occupe de changer la réponse au fur et à mesure que l'étudiant la tape
     //s'assure que la réponse soit un nombre
     const handleChangeReponse = (value) => {
          dispatch(changeReponse({
               indexQuestion: props.indexQuestion,
               indexReponse: props.num,
               value: value
          }));
     }

     //dès que la réponse perd le focus, s'assure que la réponse ne puisse être un '-' tout seul
     const handleBlurReponse = () => {
          if (props.reponse.value === '-') {
               dispatch(changeReponse({
                    indexQuestion: props.indexQuestion,
                    indexReponse: props.num,
                    value: ''
               }));
          }
     }

     //gere la suppression de cette réponse
     const handleDeleteReponse = () => {
          dispatch(deleteReponse({
               indexQuestion: props.indexQuestion,
               indexReponse: props.num,
          }));
     }

     //s'occupe de fermer la boite de dialogue du choix de l'unité
     //et de s'occuper des différentes actions demandée par la boite à sa fermeture
     //paramètre : string (seul "annuler" ou "appliquer a tous" sont gérés)
     const handleClose = () => {
          //ferme la boite de dialogue
          setOpen(false);
     }

     //s'occupe de l'ouverture de la boite de dialogue choixUnité
     const handleOpen = () => {
          //ouvre la boite de dialogue
          setOpen(true);
     }

     //remplace le tableau d'unités de cette réponse
     const setUniteReponse = (tab) => {
          dispatch(setUnite({
               indexQuestion: props.indexQuestion,
               indexReponse: props.num,
               newTab: tab
          }));
     }

     //affiche le bouton pour supprimer cette réponse
     const buttonDelete = () => {
          return (
               <Fab className={classes.buttonDelete} size="small" aria-label="delete"
                    onClick={handleDeleteReponse}
               >
                    <DeleteIcon />
               </Fab>
          )
     }

     return (
          <div className={classes.reponse}>
               {/* input de la réponse */}
               <TextField label={"Reponse " + (props.num + 1)} variant="outlined" size="small"
                    value={props.reponse.value} onChange={e => handleChangeReponse(e.target.value)}
                    onBlur={handleBlurReponse}
                    InputProps={{ //affichage unité
                         endAdornment: (
                              <InputAdornment className={classes.inputAdornmentReponse} position="start">
                                   {afficherUnites(props.reponse.tabUnite)}
                              </InputAdornment>
                         ),
                    }} />

               {/* bouton pour changer l'unité (ouvre la boite de dialogue) */}
               <Button size="small" onClick={e => handleOpen()}>Unite</Button>

               {/* boite de dialogue pour changer l'unité */}
               <ChoixUnite open={choixUniteOpen} unite={props.reponse.tabUnite}
                    setTabUnite={setUniteReponse} handleClose={handleClose} />

               {/* affiche le bouton de suppression si il est possible de supprimer */}
               {canDelete ? buttonDelete() : null}
          </div>
     );
}
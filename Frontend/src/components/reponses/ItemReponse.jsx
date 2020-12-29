import React, { useState } from 'react';
import { Button, TextField, Fab,InputAdornment} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from "lodash"

import { useDispatch, useSelector } from "react-redux";
import { changeReponse, peutSupprimer, deleteReponse, changeUniteReponses, 
     changeUniteForAllReponses, removeIterationsOfSansUnite} from '../../slice/RepondreQuestionsSlice'

import ChoixUnite from './ChoixUnite';

export default function Item(props) {

     //indique si la boite de dialogue choix unité est ouverte ou fermée
     const [choixUniteOpen, setOpen] = useState(false);

     const [uniteCopie, setUnite] = useState([]);

     const dispatch = useDispatch();

     //booléen qui autorise la suppression d'une réponse si il y a plus d'une réponse affiché
     const canDelete = useSelector(peutSupprimer(props.indexQuestion))

     //s'occupe de changer la réponse au fur et à mesure que l'étudiant la tape
     //s'assure que la réponse soit un nombre
     const handleChangeReponse = (value) =>{
          dispatch(changeReponse({indexQuestion : props.indexQuestion, indexReponse : props.num, value : value}))
     }

     //dès que la réponse perd le focus, s'assure que la réponse ne puisse être un '-' tout seul
     const handleBlurReponse = () =>{
          if (props.reponse.value === '-'){
               dispatch(changeReponse({indexQuestion : props.indexQuestion, indexReponse : props.num, value : ''}))
          }
     }

     //gere la suppression de cette réponse
     const handleDeleteReponse = () =>{
          dispatch(deleteReponse({
               indexQuestion : props.indexQuestion,
                indexReponse : props.num,
          }))
     }

     //   FONCTION A AMELIORER
     //s'occupe de fermer la boite de dialogue du choix de l'unité
     //et de s'occuper des différentes actions demandée par la boite à sa fermeture
     //paramètre : string (seul "annuler" ou "appliquer a tous" sont gérés)
     const handleClose = (value) =>{

          //ferme la boite de dialogue
          setOpen(false);

          //enlève toutes les itérations de sans unité (id : 0) qui sont en trop dans l'unité de la réponse 
          dispatch(removeIterationsOfSansUnite({
               indexQuestion : props.indexQuestion,
               indexReponse : props.num
          }))

          
          switch(value){

          //remet l'unité à la valeur où elle était auparavant (stockée dans uniteCopie)
          case "annuler" : 
               dispatch(changeUniteReponses({
                    indexQuestion : props.indexQuestion,
                    indexReponse : props.num,
                    tab : _.cloneDeep(uniteCopie)
               }))
               break

          //met l'unité de cette réponse à toutes les réponses de la question
          case "appliquer a tous" :
               dispatch(changeUniteForAllReponses({
                    indexQuestion : props.indexQuestion,
                    tab : props.reponse.tabUnite
               }))
               break
          default : 

          }
     }

     //s'occupe de l'ouverture de la boite de dialogue choixUnité
     const handleOpen = () =>{

          //enregistre l'état initial de l'untité de la réponse
          setUnite([...props.reponse.tabUnite]);

          //ouvre la boite de dialogue
          setOpen(true);
     }

     //affiche l'unité en entière de la réponse (en mettant les puissances)
     const afficherUnite = () =>{
          return(
               props.reponse.tabUnite.map((i) => (
                    <var>
                         {props.unites[i.id].abrv} 
                         <sup> {i.puissance !== 1 && i.id !== 0 ? i.puissance : null } </sup>
                    </var>
                    )
               )
               
          )
     }

     //affiche le bouton pour supprimer cette réponse
     const buttonDelete = () =>{ return(
               <Fab size="small" color="secondary" aria-label="delete" 
                    onClick={handleDeleteReponse}
               >
                    <DeleteIcon />
               </Fab>
     )}

     return(
          <div className="reponse">
               {/* input de la réponse */}
               <TextField label={"Reponse " + (props.num + 1)} variant="outlined" size="small" 
               value={props.reponse.value} onChange={e => handleChangeReponse(e.target.value)}
               onBlur={handleBlurReponse}
               InputProps={{ //affichage unité
                    endAdornment: (
                         <InputAdornment className="inputAdornmentReponse" position="start">
                         {afficherUnite()}                               
                         </InputAdornment>
                    ),
               }} />

               {/* bouton pour changer l'unité (ouvre la boite de dialogue) */}
               <Button size="small" onClick={e=>handleOpen()}>Unite</Button>

               {/* boite de dialogue pour changer l'unité */}
               <ChoixUnite open={choixUniteOpen} unites={props.unites}
                    unite={props.reponse.tabUnite} handleClose={handleClose} 
                    indexQuestion={props.indexQuestion} indexReponse={props.num}/>

               {/* affiche le bouton de suppression si il est possible de supprimer */}
               {canDelete ? buttonDelete() : null}
          </div>
     )

}

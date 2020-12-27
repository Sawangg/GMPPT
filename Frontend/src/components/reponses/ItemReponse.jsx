import React, { useState } from 'react';
import { Button, TextField, Fab,InputAdornment} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { useDispatch, useSelector } from "react-redux";
import { changeReponse, peutSupprimer, deleteReponse, changeUniteReponse } from '../../slice/RepondreQuestionsSlice'

import ChoixUnite from './ChoixUnite';

export default function Item(props) {

     const [choixUniteOpen, setOpen] = useState(false);

     const [unite, setUnite] = useState([]);

     const dispatch = useDispatch();

     const canDelete = useSelector(peutSupprimer(props.indexQuestion))

     const handleChangeReponse = (value) =>{
          dispatch(changeReponse({indexQuestion : props.indexQuestion, indexReponse : props.num, value : value}))
     }

     const buttonDelete = () =>{ return(
               <Fab size="small" color="primary" aria-label="delete" 
                    onClick={e => dispatch(deleteReponse({indexQuestion : props.indexQuestion, indexReponse : props.num}))}
               >
                    <DeleteIcon />
               </Fab>
          )
     }

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

     const handleClose = () =>{
          dispatch(changeUniteReponse({indexQuestion : props.indexQuestion, indexReponse : props.num, newTab : unite}));
          setOpen(false);
     }

     const handleOpen = () =>{
          setUnite([...props.reponse.tabUnite]);
          setOpen(true);
     }

     return(<div className="reponse">
               <TextField label={"Reponse " + (props.num + 1)} variant="outlined" size="small" 
               value={props.reponse.value} onChange={e => handleChangeReponse(e.target.value)}
               InputProps={{
                    endAdornment: (
                         <InputAdornment position="start">
                         {afficherUnite()}                               
                         </InputAdornment>
                    ),
               }} />
               <Button size="small" onClick={e=>handleOpen()}>Unite</Button>

               {<ChoixUnite open={choixUniteOpen} unites={props.unites}
                    unite={unite} handleClose={handleClose} setUnite={setUnite}/>}

               {canDelete ? buttonDelete() : null
               }
          </div>)

}

import React, { useState } from 'react';
import { Button, TextField, Fab,InputAdornment} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ChoixUnite from './ChoixUnite';

export default function Item(props) {

     const [choixUniteOpen, setOpen] = useState(false);

     const [unite, setUnite] = useState([]);

     const buttonDelete = () =>{ return(
               <Fab size="small" color="primary" aria-label="delete" 
                    onClick={e => props.deleteReponse(props.reponse)}>
                    <DeleteIcon />
               </Fab>
          )
     }

     const afficherUnite = () =>{
          return(
               props.reponse.unite.map((i) => (
                    <var>
                         {props.unites[i.id].abrv} 
                         <sup> {i.puissance !== 1 && i.id !== 0 ? i.puissance : null } </sup>
                    </var>
                    )
               )
               
          )
     }

     const handleClose = () =>{
          props.handleChangeUnite(props.num, unite);
          setOpen(false);
     }

     const handleOpen = () =>{
          setUnite([...props.reponse.unite]);
          setOpen(true);
     }

     return(<div className="reponse">
               <TextField label={"Reponse " + (props.num + 1)} variant="outlined" size="small" 
               value={props.reponse.value} onChange={e => props.handleChangeReponse(e, props.num)}
               InputProps={{
                    endAdornment: (
                         <InputAdornment position="start">
                         {afficherUnite()}                               
                         </InputAdornment>
                    ),
               }} />
               <Button size="small" onClick={e=>handleOpen()}>Unite</Button>

               <ChoixUnite open={choixUniteOpen} unites={props.unites}
                    unite={unite} handleClose={handleClose} setUnite={setUnite}/>

               {props.peutSupprimer() ? buttonDelete() : null}
          </div>)

}

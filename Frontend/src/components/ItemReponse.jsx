import React, { useState } from 'react';
import { MenuItem, Select, TextField, Fab, InputLabel} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Item(props) {

     const buttonDelete = () =>{ return(
               <Fab size="small" color="primary" aria-label="delete" 
                    onClick={e => props.deleteReponse(props.index)}>
                    <DeleteIcon />
               </Fab>
          )
     }

   return(
          <div className="reponse">
               <TextField label="Reponse" variant="outlined" size="small" />
               <Select>
                    {props.unites.map((i) => 
                    <MenuItem value={i.nom} >
                         {i.nom}
                    </MenuItem>)}
               </Select>
               {props.peutSupprimer()? buttonDelete() : <></> }
        </div>)

}
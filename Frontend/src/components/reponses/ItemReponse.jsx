import React from 'react';
import { TextField, Input, Fab,InputAdornment} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Item(props) {

     const buttonDelete = () =>{ return(
               <Fab size="small" color="primary" aria-label="delete" 
                    onClick={e => props.deleteReponse(props.reponse)}>
                    <DeleteIcon />
               </Fab>
          )
     }

   return(<div className="reponse">
               <TextField label={"Reponse " + (props.num + 1)} variant="outlined" size="small" 
               value={props.reponse.value} onChange={e => props.handleChangeReponse(e, props.num)}
               InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        {props.unite.abrv}
                      </InputAdornment>
                    ),
                  }} />
               {props.peutSupprimer() ? buttonDelete() : null}
          </div>)

}

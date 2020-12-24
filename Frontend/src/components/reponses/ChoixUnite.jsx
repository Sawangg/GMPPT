import React from 'react';
import {IconButton, TextField, MenuItem, InputAdornment} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ChoixUnite(props){

    const buttonAdd = (index) =>{
      return(
        <IconButton size="small" color="primary" onClick={e=> props.addPartieUnite(index)} >
          <AddIcon/>
        </IconButton>
      )
    }

    const buttonDelete = () =>{
      return(
        <IconButton size="small" color="secondary" onClick={e=> props.deletePartieUnite(props.index)} >
          <DeleteIcon/>
        </IconButton>
      )
    }

    const buttons = () =>{
      return(
        <div className="button_gap">
          {buttonAdd(props.index)}
          {props.tabLength > 1 ? buttonDelete() : null }
          {buttonAdd(props.index + 1)}
        </div>
      )
    }


    return(
    <div className="choix_input">
        {buttons()}
        <TextField select value={props.unite.id} onChange={e=> props.handleChangeUnite(e, props.index)}>
            {props.unites.map((i, index) => 
            <MenuItem key={index} value={index} >
                {i.nom}
            </MenuItem>)}
        </TextField>
        {props.unite.id !== 0 ? 
        <>
        <TextField value={props.unite.puissance} className="puissance" onChange={e=>props.handlePuissance(e, props.index)}
            InputProps={{ startAdornment: (
                    <InputAdornment position="start">
                      ^
                    </InputAdornment>
                    ),
                }} />
        </>
        : null }
    </div>

      );
}
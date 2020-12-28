import React from 'react';
import {IconButton, TextField, MenuItem, InputAdornment} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { useDispatch } from 'react-redux';
import { changePartieUnite, deletePartieUnite, changePuissancePartieUnite } from '../../slice/RepondreQuestionsSlice'

export default function Item(props){

    const dispatch = useDispatch();

    const handleChangeUnite = (event) =>{
      dispatch(changePartieUnite({
          indexQuestion : props.indexQuestion, 
          indexReponse : props.indexReponse,
          indexUnite : props.index,
          value : event.target.value 
        }))
    }

    const handleDeleteUnite = () =>{
      dispatch(deletePartieUnite({
        indexQuestion : props.indexQuestion, 
        indexReponse : props.indexReponse,
        indexUnite : props.index
      }))
    }

    const handleChangePuissance = (event) =>{
      dispatch(changePuissancePartieUnite({
        indexQuestion : props.indexQuestion, 
        indexReponse : props.indexReponse,
        indexUnite : props.index,
        value : event.target.value
      }))
    }

    const handleBlurUnite = () =>{
      let pow = props.unite.puissance
      if(pow === '0' || pow === '-' || pow === ''){
        dispatch(changePuissancePartieUnite({
          indexQuestion : props.indexQuestion, 
          indexReponse : props.indexReponse,
          indexUnite : props.index,
          value : 1
        }))
      }
    }

    const buttonDelete = () =>{
      return(
        <IconButton size="small" color="secondary" onClick={handleDeleteUnite} >
          <DeleteIcon/>
        </IconButton>
      )
    }

    const buttons = () =>{
      return(
        <div className="button_gap">
          {props.tabLength > 1 ? buttonDelete() : null }
        </div>
      )
    }


    return(
    <div className="choix_input">
        {buttons()}
        <TextField select value={props.unite.id} onChange={handleChangeUnite}>
            {props.unites.map((i, index) => 
            <MenuItem key={index} value={index} >
                {i.nom}
            </MenuItem>)}
        </TextField>
        {props.unite.id !== 0 ? 
        <>
        <TextField value={props.unite.puissance} className="puissance" onChange={e=>handleChangePuissance(e)}
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

      );
}
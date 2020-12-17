import React, {useState} from 'react';
import {Button} from '@material-ui/core';

import Item from './ItemTodoFormule'
import PopUp from './PopUp'

import { useDispatch } from "react-redux";
import { addFormule, removeFormule, undoFormule } from "../slice/FormulesSlice";
import { useSelector } from "react-redux";
import { selectTabFormule } from "../slice/FormulesSlice"

import '../styles/TodoListFormule.css'

export default function TodoListFormule(props) {

    const [openPopUp, setOpenPopUp] = useState(false);

    const dispatch = useDispatch();
    const tab = useSelector(selectTabFormule(props.index));

    const remove = (index) =>{
        dispatch(removeFormule({indexCategorie : props.index, indexFormule : index}))
        setOpenPopUp(true);
    }

    const undo = () =>{
        dispatch(undoFormule(props.index))
        setOpenPopUp(false);
     }

    return (
        <div>
            {tab.map((i, id) => (
                <Item remove={e => remove(id)} index={id} item={i} nb={tab.length} key={i.index} indexCategorie={props.index}/>
            ))}
             <Button 
                className="buttonAjouterFormule" 
                variant="outlined" 
                color="primary" 
                onClick={e => dispatch(addFormule(props.index))}
            >
                    Ajouter des formules
            </Button>
             <PopUp message="Formule supprimée" undo={e => undo()} open={openPopUp} handleClose={e => setOpenPopUp(false)}/>
        </div>
    );
} 
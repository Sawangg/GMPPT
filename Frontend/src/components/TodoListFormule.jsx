import React, {useState} from 'react';
import {Button} from '@material-ui/core';

import Item from './ItemTodoFormule'
import SlideBar from './SlideBar'
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
        dispatch(undoFormule({indexCategorie :props.index, indexFormule : props.index}))
        setOpenPopUp(false);
     }

    const ajoutFormule = () =>{
        dispatch(addFormule(props.index))
    }

    return (
        <div>
            {tab.map((i, id) => (
                <Item remove={e => remove(id)} index={id} item={i} nb={tab.length} key={i.index} indexCategorie={props.index}/>
            ))}
             <Button className="buttonAjouterFormule" variant="outlined" color="primary" onClick={e => ajoutFormule()}>Ajouter des formules</Button>
             <SlideBar index={props.index}/>
             <PopUp message="Formule supprimée" undo={e => undo()} open={openPopUp} handleClose={e => setOpenPopUp(false)}/>
        </div>
    );
} 
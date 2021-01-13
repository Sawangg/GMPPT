import React, {useState} from 'react';
import {Button, makeStyles} from '@material-ui/core';

import Item from './ItemTodoFormule'
import PopUp from '../PopUp'

import { useDispatch } from "react-redux";
import { addFormule, removeFormule, undoFormule } from "../../slice/FormulesSlice";
import { useSelector } from "react-redux";
import { selectTabFormule } from "../../slice/FormulesSlice"

export default function TodoListFormule(props) {

    const useStyles = makeStyles((theme) => ({
        buttonAjouterFormule: {
            maxWidth: "220px",
            maxHeight: "36px",
            display : "block",
            margin: "6% auto 0 auto",
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main
        }
    }));
    const classes = useStyles();

    const [openPopUpSave, setOpenPopUpSave] = useState(false);

    const dispatch = useDispatch();
    const tab = useSelector(selectTabFormule(props.index));

    const remove = (index) =>{
        dispatch(removeFormule({indexCategorie : props.index, indexFormule : index}))
        setOpenPopUpSave(true);
    }

    const undo = () =>{
        dispatch(undoFormule(props.index))
        setOpenPopUpSave(false);
     }

    return (
        <div>
            {tab.map((i, id) => (
                <Item remove={e => remove(id)} index={id} item={i} nb={tab.length} key={i.index} indexCategorie={props.index}/>
            ))}
             <Button 
                className={classes.buttonAjouterFormule}
                variant="outlined" 
                onClick={() => dispatch(addFormule(props.index))}
            >
                    Ajouter des formules
            </Button>
             <PopUp 
                message="Formule supprimée" 
                actionName="RETOUR" 
                action={() => undo()} 
                open={openPopUpSave} 
                handleClose={() => setOpenPopUpSave(false)}
                pos="right"
            />
        </div>
    );
} 
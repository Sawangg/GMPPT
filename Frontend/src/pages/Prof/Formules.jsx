import React, {useState, useEffect} from 'react';
import {Fab, makeStyles} from '@material-ui/core';
import CircleLoader from "react-spinners/CircleLoader";
import AddIcon from '@material-ui/icons/Add';

import Items from '../../components/formules/ItemTodoAccordeon'
import useConstructor from '../../components/use/useContructor'
import SelectionModele from '../../components/SelectionModele'
import useUnload from '../../components/use/useUnload';
import PopUp from '../../components/PopUp'

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectFormule, selectActualise, selectEnregistre, addCategorie, enregistrerFormules } from "../../slice/FormulesSlice"
import { selectModele } from "../../slice/ModeleSlice"

export default function TodoListAccordeon() {

    const useStyles = makeStyles((theme) => ({
        h1: {textAlign : "center"},
        fab: {marginLeft: "3%"}
    }));

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(true);

    const dispatch = useDispatch();
    const tab = useSelector(selectFormule);
    const actualise = useSelector(selectActualise);
    const isEnregistre = useSelector(selectEnregistre);
    const modele = useSelector(selectModele);

    useConstructor(() => {
        if (modele.idModeleSelectionne === undefined) setOpen(true);
    });
    
    useEffect(() => {
        setOpenPopUp(true)
    }, [isEnregistre])

    useUnload(!isEnregistre);

    const displayFormule = () => {
        return (
            <div>
                <h1 className={classes.h1}>Creation des formules</h1>
                <Fab className={classes.fab}
                    size="small"
                    color="primary"
                    aria-label="add"
                    onClick={() => dispatch(addCategorie())}
                >
                    <AddIcon />
                </Fab>
                {tab.map((i, id) => (
                <Items index={id} key={i.index} item={i} length={tab.length}/>
                ))}
                <PopUp 
                    severity={isEnregistre ? "success" : "warning"} 
                    message={isEnregistre ? "Formules enregistrées" : "Enregistrer les modifications"} 
                    actionName={isEnregistre ? null : "Enregistrer"} 
                    action={() => {if (!isEnregistre) dispatch(enregistrerFormules({tab : tab, idModele : modele.idModeleSelectionne}))}} 
                    open={openPopUp} 
                    handleClose={() => {if (isEnregistre) setOpenPopUp(false)}}
                    pos="left"
                />
            </div>
        );
    }

    return (
        modele.idModeleSelectionne === undefined 
        ? <SelectionModele tard={false} setClose={() => setOpen(false)} open={open}/> 
        : actualise ? displayFormule() : <CircleLoader size={50} color={"rgb(7, 91, 114)"} css={{margin : "auto", display : "flex", justifyContent : "center"}}/>
    );
}
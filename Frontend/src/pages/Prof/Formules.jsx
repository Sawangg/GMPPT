import React, {useState, useEffect} from 'react';
import {Fab, makeStyles} from '@material-ui/core';
import CircleLoader from "react-spinners/CircleLoader";
import AddIcon from '@material-ui/icons/Add';

import Items from '../../components/formules/ItemTodoAccordeon';
import useConstructor from '../../components/use/useContructor';
import useUnload from '../../components/use/useUnload';
import PopUp from '../../components/PopUp';
import SelectionModele from '../../components/SelectionModele'

import { useDispatch, useSelector } from "react-redux";
import { selectFormule, selectActualiseFormule, selectEnregistreFormule, addCategorie, enregistrerFormules, getCategoriesFormules } from "../../slice/FormulesSlice"
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
    const actualise = useSelector(selectActualiseFormule);
    const isEnregistre = useSelector(selectEnregistreFormule);
    const modele = useSelector(selectModele);

    useConstructor(() => {
        if (!isEnregistre) {
            modele.idModeleSelectionne === null ? setOpen(true) : dispatch(getCategoriesFormules(modele.idModeleSelectionne));
        }
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
                <Items index={id} key={id} item={i} length={tab.length}/>
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
        modele.idModeleSelectionne === null 
        ? <SelectionModele tard={false} setClose={() => setOpen(false)} open={open}/> 
        : actualise ? displayFormule() : <CircleLoader size={50} color={"rgb(7, 91, 114)"} css={{margin : "auto", display : "flex", justifyContent : "center"}}/>
    );
}
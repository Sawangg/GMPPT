import React, {useState, useEffect} from 'react';
import {Fab, makeStyles, Typography} from '@material-ui/core';
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
        hr: {
            width: "80%",
            marginBottom: "2%"
        },
        fab: {
            marginLeft: "3%",
        }
    }));

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(true);

    const dispatch = useDispatch();
    const tabCatFormule = useSelector(selectFormule);
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
                <Typography variant="h1">FORMULES</Typography>
                <hr className={classes.hr}/>
                <Fab className={classes.fab}
                    disabled={tabCatFormule.length >= 30}
                    size="small"
                    color="primary"
                    aria-label="add"
                    onClick={() => dispatch(addCategorie())}
                >
                    <AddIcon />
                </Fab>
                {tabCatFormule.map((i, id) => (
                <Items index={id} key={id} item={i} length={tabCatFormule.length}/>
                ))}
                <PopUp 
                    severity={isEnregistre ? "success" : "warning"} 
                    message={isEnregistre ? "Formules enregistrées" : "Enregistrer les modifications"} 
                    actionName={isEnregistre ? null : "Enregistrer"} 
                    action={() => {if (!isEnregistre) dispatch(enregistrerFormules({tab : tabCatFormule, idModele : modele.idModeleSelectionne}))}} 
                    open={openPopUp} 
                    handleClose={() => {if (isEnregistre) setOpenPopUp(false)}}
                    pos="left"
                    disabled={tabCatFormule.some(cat => cat.modif) || tabCatFormule.some(cat => cat.tabFormule.some(formule => formule.modif))}
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
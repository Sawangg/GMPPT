import React, { useState } from 'react';
import { Fab, makeStyles, Typography } from '@material-ui/core';
import CircleLoader from "react-spinners/CircleLoader";
import AddIcon from '@material-ui/icons/Add';

import ItemVariablesAleatoire from '../../components/variable/ItemVariableAleatoire';
import useConstructor from '../../components/use/useContructor';
import PopUp from '../../components/PopUp';
import SelectionModele from '../../components/SelectionModele';
import EnregistrementVariableAleatoires from '../../components/variable/EnregistrementVariableAleatoires';

import { useDispatch, useSelector } from "react-redux";
import { selectActualise, selectEnregistreVariable, addVariable, undoVariable, getAllVariables, selectTabLength } from "../../slice/VariablesAleatoiresSlice"
import { selectIdModeleSelectionne } from "../../slice/ModeleSlice";

export default function VariablesAleatoires() {

    const useStyles = makeStyles((theme) => ({
        root: {
            paddingBottom: "2%"
        },
        hr: {
            width: "80%",
            marginBottom: "2%"
        },
        fab: {
            marginLeft: "3%",
            marginBottom: "2%"
        },
        divItemvariable: {
            boxShadow: "0px 8px 20px -5px rgba(0,0,0,0.69)",
            padding: "2% 3% 4% 3%",
            width: "80%",
            margin: "auto",
            [theme.breakpoints.down('sm')]: {
                width: "90%"
            }
        }
    }));

    const classes = useStyles();

    //gerer pop up pour le undo lors de suppression
    const [openPopUpUndo, setOpenPopUpUndo] = useState(false);

    //gere la pop up de selection de modelee
    const [openModele, setOpenModele] = useState(false);
    const dispatch = useDispatch();
    const lengthTab = useSelector(selectTabLength);
    //savoir si les variables sont récupérées de la BD
    const isEnregistre = useSelector(selectEnregistreVariable);
    //savoir si la recupération les données sont conectées à la BD
    const isActualise = useSelector(selectActualise)
    const idModele = useSelector(selectIdModeleSelectionne);
    const { max_variable } = window;


    useConstructor(() => {
        //si pas encore récupérées de la BD 
        if (!isEnregistre) {
            idModele === null ? setOpenModele(true) : dispatch(getAllVariables(idModele));
        }
    });

    const undo = () => {
        dispatch(undoVariable());
        setOpenPopUpUndo(false);
    }

    const displayVariable = () => {
        return (
            <div className={classes.root}>
                <Typography variant="h1">Variables aléatoires</Typography>
                <hr className={classes.hr} />
                <Fab className={classes.fab}
                    disabled={lengthTab >= max_variable}
                    size="small"
                    color="primary"
                    aria-label="add"
                    onClick={() => dispatch(addVariable())}
                >
                    <AddIcon />
                </Fab>
                <div className={classes.divItemvariable}>
                    {/* EVITE DE FAIRE PASSER LE TABLEAU DE VARIABLE ET DE MODIFIER TOUTES LES VARIABLES A CHAQUE CHANGEMENT D'UNE */}
                    {Array(lengthTab).fill(0).map((_, index) => (
                        <ItemVariablesAleatoire onRemove={() => setOpenPopUpUndo(true)} length={lengthTab} key={index} index={index} />
                    ))}
                    <PopUp
                        message="Variable supprimée"
                        actionName="RETOUR"
                        action={() => undo()}
                        open={openPopUpUndo}
                        handleClose={() => setOpenPopUpUndo(false)}
                        pos="right"
                    />
                </div>
                <EnregistrementVariableAleatoires />
            </div>
        );
    }

    return (
        idModele === null
            ? <SelectionModele tard={false} setClose={() => setOpenModele(false)} open={openModele} />
            : isActualise ? displayVariable() : <CircleLoader size={50} color={"rgb(7, 91, 114)"} css={{ margin: "auto", display: "flex", justifyContent: "center" }} />
    );
}
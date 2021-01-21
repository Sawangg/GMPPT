import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';

import MenuProfil from '../../components/MenuProfil'
import {makeStyles} from "@material-ui/core";
import useConstructor from '../../components/use/useContructor';

import { useDispatch, useSelector } from "react-redux";
import { getSujet, selectSujetEnregistre, etudiantVariables, getModele3D, getEtudiantModele } from "../../slice/RepondreQuestionsSlice"

export default function Accueil(props) {

    const useStyles = makeStyles((theme) => ({
        divProgress: {
            width : "50%",
            margin : "auto"
        }
    }));
    const classes = useStyles();

    const dispatch = useDispatch();
    const isEnregistre = useSelector(selectSujetEnregistre);

    useConstructor(() => {
        if (!isEnregistre){
            dispatch(getEtudiantModele())
            .then(modele => {
                dispatch(getSujet(modele.payload[0].id_modele))
                .then((sujet) => {
                    dispatch(etudiantVariables(sujet.payload.id_auth));
                    dispatch(getModele3D(sujet.payload.id_auth));
                });
            })
        }
    });


    return (
        <div>
            <MenuProfil info={props.info} />
            <div className={classes.divProgress}>
                <p>Progression dans le traitement du sujet</p>
                <LinearProgress  variant="determinate" value={10}/>
                <p>Date limite de rendu : 10/01/21</p>
            </div>
        </div>
    );
}


import React from 'react'
import {makeStyles} from "@material-ui/core";

import Etapes from '../../components/Etapes';
import ParticulesFond from '../../components/ParticulesFond';
import useConstructor from '../../components/use/useContructor';

import { useDispatch, useSelector } from "react-redux";
import { selectIdModeleSelectionne } from "../../slice/ModeleSlice"
import { getCategoriesFormules, selectEnregistreFormule } from "../../slice/FormulesSlice";
import { getAllVariables, selectEnregistreVariable } from "../../slice/VariablesAleatoiresSlice"
import { getSujet, selectEnregistreEnonce } from "../../slice/EnoncesSlice";

export default function Accueil() {

    const dispatch = useDispatch();
    const idModele = useSelector(selectIdModeleSelectionne);
    const isEnregistreVariable = useSelector(selectEnregistreVariable);
    const isEnregistreFormule = useSelector(selectEnregistreFormule);
    const isEnregistreEnonce = useSelector(selectEnregistreEnonce);

    useConstructor(() => {
        if (idModele !== null){
            if (!isEnregistreFormule) dispatch(getCategoriesFormules(idModele));
            if (!isEnregistreVariable) dispatch(getAllVariables(idModele));
            if (!isEnregistreEnonce) dispatch(getSujet(idModele));
        }
    })

    return (
        <div>
            <ParticulesFond/>
            <Etapes/>
        </div>
    );
}
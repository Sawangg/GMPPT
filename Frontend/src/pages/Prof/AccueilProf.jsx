import React from 'react';

import ParticulesFond from '../../components/ParticulesFond';
import useConstructor from '../../components/use/useContructor';

import { useDispatch, useSelector } from "react-redux";
import { selectIdModeleSelectionne, getModele } from "../../slice/ModeleSlice";
import { getCategoriesFormules, selectEnregistreFormule } from "../../slice/FormulesSlice";
import { getAllVariables, selectEnregistreVariable } from "../../slice/VariablesAleatoiresSlice";
import { getSujet, selectEnregistreEnonce } from "../../slice/EnoncesSlice";
import { selectEnregistreUnite, getAllUnite } from '../../slice/UniteSlice';

export default function Accueil() {

    const dispatch = useDispatch();
    const idModele = useSelector(selectIdModeleSelectionne);
    const isEnregistreVariable = useSelector(selectEnregistreVariable);
    const isEnregistreFormule = useSelector(selectEnregistreFormule);
    const isEnregistreEnonce = useSelector(selectEnregistreEnonce);
    const isEnregistreUnite = useSelector(selectEnregistreUnite);

    useConstructor(async () => {
        dispatch(getModele()); //pb, si change la valeur, le useSelector ne s'update pas
        if (!isEnregistreFormule) dispatch(getCategoriesFormules(idModele));
        if (!isEnregistreVariable) dispatch(getAllVariables(idModele));
        if (!isEnregistreEnonce) dispatch(getSujet(idModele));
        if (!isEnregistreUnite) dispatch(getAllUnite());
    })

    return (
        <div>
            <ParticulesFond />
        </div>
    );
}
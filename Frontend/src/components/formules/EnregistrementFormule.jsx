import React from 'react';

import Enregistre from '../Enregistrement';

import { useSelector } from "react-redux";
import { selectEnregistreFormule, enregistrerFormules, selectCategorieFormule } from "../../slice/FormulesSlice"
import { selectIdModeleSelectionne } from "../../slice/ModeleSlice"

const EnregistrementFormule = () => {

    const isEnregistre = useSelector(selectEnregistreFormule);
    const idModele = useSelector(selectIdModeleSelectionne);
    const tabCatFormule = useSelector(selectCategorieFormule)

    return (
        <Enregistre isEnregistre={isEnregistre} action={enregistrerFormules({tab : tabCatFormule, idModele : idModele})} />
    )

}

export default React.memo(EnregistrementFormule);
import React from 'react';

import Enregistre from '../Enregistrement';

import { useSelector } from "react-redux";
import { selectEnregistreFormule, enregistrerFormules, selectCategorieFormule } from "../../slice/FormulesSlice";
import { selectIdModeleSelectionne } from "../../slice/ModeleSlice";

const EnregistrementFormule = () => {

    const isEnregistre = useSelector(selectEnregistreFormule);
    const idModele = useSelector(selectIdModeleSelectionne);
    const tabCatFormule = useSelector(selectCategorieFormule);

    return (
        <Enregistre isEnregistre={isEnregistre} action={enregistrerFormules({ tab: tabCatFormule, idModele: idModele })} disabled={tabCatFormule.some(cat => cat.modif) || tabCatFormule.some(cat => cat.tabFormule.some(formule => formule.modif))} />
    );
}

export default React.memo(EnregistrementFormule);
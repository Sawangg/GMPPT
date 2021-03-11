import React from 'react';

import Enregistre from '../Enregistrement';

import { useSelector } from "react-redux";
import { selectEnonce, selectEnregistreEnonce, setQuestions } from "../../slice/EnoncesSlice";
import { selectIdModeleSelectionne } from "../../slice/ModeleSlice";

const EnregistrementEnonce = () => {

    const isEnregistreEnonce = useSelector(selectEnregistreEnonce);
    const idModele = useSelector(selectIdModeleSelectionne);
    const enonce = useSelector(selectEnonce);

    return (
        <Enregistre isEnregistre={isEnregistreEnonce} action={setQuestions({ idModele: idModele, enonce: enonce.enonceContenu, tabQuestions: enonce.question })} />
    );
}

export default React.memo(EnregistrementEnonce);
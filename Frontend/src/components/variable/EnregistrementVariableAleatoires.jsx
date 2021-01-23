import React from 'react';

import Enregistre from '../Enregistrement';

import { useSelector } from "react-redux";
import { selectVariablesAleatoires, selectEnregistre, setVariables} from "../../slice/VariablesAleatoiresSlice"
import { selectIdModeleSelectionne } from "../../slice/ModeleSlice"

const Enregistrement = () => {
    
    const tableauVariables = useSelector(selectVariablesAleatoires);
    const idModele = useSelector(selectIdModeleSelectionne);
    const isEnregistre = useSelector(selectEnregistre);

   return (
        <Enregistre isEnregistre={isEnregistre} action={setVariables({tab : tableauVariables, idModele : idModele})} />
   )

}

export default React.memo(Enregistrement);
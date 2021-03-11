import React from 'react';

import Enregistre from '../Enregistrement';

import { useSelector } from "react-redux";
import { selectVariablesAleatoires, selectEnregistreVariable, setVariables } from "../../slice/VariablesAleatoiresSlice";
import { selectIdModeleSelectionne } from "../../slice/ModeleSlice";

const Enregistrement = () => {

     const tableauVariables = useSelector(selectVariablesAleatoires);
     const idModele = useSelector(selectIdModeleSelectionne);
     const isEnregistre = useSelector(selectEnregistreVariable);

     return (
          <Enregistre isEnregistre={isEnregistre} action={setVariables({ tab: tableauVariables, idModele: idModele })} disabled={tableauVariables.some(variables => variables.modif)} />
     );
}

export default React.memo(Enregistrement);
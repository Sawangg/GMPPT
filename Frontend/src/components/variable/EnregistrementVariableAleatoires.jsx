import React, {useState, useCallback, useEffect} from 'react';

import PopUp from '../PopUp'

import { useDispatch, useSelector } from "react-redux";
import { selectVariablesAleatoires, selectEnregistre, setVariables} from "../../slice/VariablesAleatoiresSlice"
import { selectIdModeleSelectionne } from "../../slice/ModeleSlice"

const Enregistrement = () => {

    const dispatch = useDispatch();
    
    const tableauVariables = useSelector(selectVariablesAleatoires);
    const idModele = useSelector(selectIdModeleSelectionne);
    const [openPopUpSave, setOpenPopUpSave] = useState(true);
    const isEnregistre = useSelector(selectEnregistre);

    useEffect(() => {
        setOpenPopUpSave(true)
    }, [isEnregistre])

    //EVITE LE RENDU DES COMPOSANTS ITEMS VARIABLES ALEATOIRES QUAND ON ECRIT
    const envoyer = useCallback (() => {
        dispatch(setVariables({tab : tableauVariables, idModele : idModele}))
    }, [dispatch, idModele, tableauVariables])

    return (
        <PopUp 
            severity={isEnregistre ? "success" : "warning"} 
            message={isEnregistre ? "Variables enregistrées" : "Enregistrer les modifications"} 
            actionName={isEnregistre ? null : "Enregistrer"} 
            action={() => {if (!isEnregistre) envoyer()}} 
            open={openPopUpSave} 
            handleClose={() => {if (isEnregistre) setOpenPopUpSave(false)}}
            pos="left"
            disabled={tableauVariables.some(variables => variables.modif)}
        />
    )

}

//EVITE LE RENDU DES COMPOSANTS ITEMS VARIABLES ALEATOIRES QUAND ON ECRIT
export default React.memo(Enregistrement);
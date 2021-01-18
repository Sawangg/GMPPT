import React, {useState, useCallback, useEffect} from 'react';

import PopUp from '../PopUp'

import { useDispatch, useSelector } from "react-redux";
import { selectEnregistreFormule, enregistrerFormules, selectCategorieFormule } from "../../slice/FormulesSlice"
import { selectIdModeleSelectionne } from "../../slice/ModeleSlice"

const EnregistrementFormule = () => {

    const [openPopUp, setOpenPopUp] = useState(true);

    const dispatch = useDispatch();
    const isEnregistre = useSelector(selectEnregistreFormule);
    const idModele = useSelector(selectIdModeleSelectionne);
    const tabCatFormule = useSelector(selectCategorieFormule)

    useEffect(() => {
        setOpenPopUp(true)
    }, [isEnregistre])

    const envoyer = useCallback (() => {
        dispatch(enregistrerFormules({tab : tabCatFormule, idModele : idModele}))
    }, [dispatch, idModele, tabCatFormule]) 

     return (
        <PopUp 
            severity={isEnregistre ? "success" : "warning"} 
            message={isEnregistre ? "Formules enregistrées" : "Enregistrer les modifications"} 
            actionName={isEnregistre ? null : "Enregistrer"} 
            action={() => {if (!isEnregistre) envoyer()}} 
            open={openPopUp} 
            handleClose={() => {if (isEnregistre) setOpenPopUp(false)}}
            pos="left"
            disabled={tabCatFormule.some(cat => cat.modif) || tabCatFormule.some(cat => cat.tabFormule.some(formule => formule.modif))}
        />
     )
}

export default React.memo(EnregistrementFormule);
import React, {useState, useCallback, useEffect} from 'react';

import PopUp from '../PopUp'

import { useDispatch, useSelector } from "react-redux";
import { selectEnonce, selectEnregistreEnonce, setQuestions } from "../../slice/EnoncesSlice";
import { selectIdModeleSelectionne } from "../../slice/ModeleSlice"

const EnregistrementEnonce = () => {

    const [openPopUp, setOpenPopUp] = useState(true);

    const dispatch = useDispatch();
    const isEnregistreEnonce = useSelector(selectEnregistreEnonce);
    const idModele = useSelector(selectIdModeleSelectionne);
    const enonce = useSelector(selectEnonce)

    useEffect(() => {
        setOpenPopUp(true)
    }, [isEnregistreEnonce])

    const envoyer = useCallback (() => {
        dispatch(setQuestions({ idModele : idModele, enonce : enonce.enonceContenu, tabQuestions : enonce.question }))
    }, [dispatch, idModele, enonce]) 

     return (
        <PopUp
            severity={isEnregistreEnonce ? "success" : "warning"}
            message={isEnregistreEnonce ? "Enoncé enregistré" : "Enregistrer les modifications"}
            actionName={isEnregistreEnonce ? null : "Enregistrer"}
            action={() => {if (!isEnregistreEnonce) envoyer()}}
            open={openPopUp}
            handleClose={() => {if (isEnregistreEnonce) setOpenPopUp(false)}}
            pos="left"
        />
     )
}

export default React.memo(EnregistrementEnonce);
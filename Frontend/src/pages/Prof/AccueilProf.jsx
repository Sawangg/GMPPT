import React from 'react'

import Etapes from '../../components/Etapes'
import useConstructor from '../../components/useContructor'
import SelectionModele from '../../components/SelectionModele'

import { useDispatch } from "react-redux";
import { setTab } from "../../slice/FormulesSlice";
import { userDetails } from "../../slice/UserSlice";
import { useSelector } from "react-redux";
import { selectActualise } from "../../slice/FormulesSlice"

import { getFormules } from '../../utils/api.js';

export default function Accueil() {

    const dispatch = useDispatch();
    const actualise = useSelector(selectActualise);

    // useConstructor(() => {
    //     dispatch(userDetails())
    //     if (!actualise){
    //         getFormules()
    //         .then((data) => dispatch(setTab(data.data)))
    //         .catch(() => null);
    //     }
    // });


    return (
        <div>
            <SelectionModele/>
            <Etapes/>
        </div>
    );
}
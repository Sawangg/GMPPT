import React from 'react'

import Etapes from '../components/Etapes'
import useConstructor from '../components/useContructor'

import { useDispatch } from "react-redux";
import { setTab, setActualise } from "../slice/FormulesSlice";
import { useSelector } from "react-redux";
import { selectActualise } from "../slice/FormulesSlice"

import { getFormules } from '../utils/api.js';

export default function Accueil() {

    const dispatch = useDispatch();
    const actualise = useSelector(selectActualise);

    useConstructor(() => {
        if (!actualise){
            getFormules()
            .then((data) => {
                dispatch(setTab(data.data));
                dispatch(setActualise());
            })
            .catch(() => null);
        }
    });


    return (
        <div>
            <Etapes/>
        </div>
    );
}
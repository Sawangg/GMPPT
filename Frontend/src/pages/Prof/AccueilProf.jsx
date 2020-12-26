import React, {useState} from 'react'
import {Button} from '@material-ui/core';


import Etapes from '../../components/Etapes'
import SelectionModele from '../../components/SelectionModele'
import useConstructor from '../../components/use/useContructor'
import DropFile from '../../components/DropFile';
import ParticulesFond from '../../components/ParticulesFond'

import { useDispatch } from "react-redux";
import { getModele} from "../../slice/ModeleSlice";
import { useSelector } from "react-redux";
import { selectModele } from "../../slice/ModeleSlice"

export default function Accueil() {

    const [open, setOpen] = useState(false);
    const [excel, setExcel] = useState("")
    const dispatch = useDispatch();
    const modele = useSelector(selectModele);

    useConstructor(() => {
        if (!modele.actualise) dispatch(getModele())
    });

    return (
        <div>
            <ParticulesFond/>
            <Button style={{display : "block", margin : "100px auto"}} variant="contained" color="primary" onClick={e => setOpen(true)}>Choisir modele sujet</Button>
            <SelectionModele tard={true} setOpen={e => setOpen(e)} open={open}/>
            <Etapes/>
            <DropFile typeFile='.xlsx, .xls, .ods, .xlr, .tab' compressImage={false} changeFile={e => setExcel(e)}  message="Charger la liste des étudiants"/>
        </div>
    );
}
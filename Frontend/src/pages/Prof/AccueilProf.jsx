import React, {useState} from 'react'
import {Button} from '@material-ui/core';


import Etapes from '../../components/Etapes'
import SelectionModele from '../../components/SelectionModele'
import DropFile from '../../components/DropFile';
import ParticulesFond from '../../components/ParticulesFond'

export default function Accueil() {

    const [open, setOpen] = useState(false);
    const [excel, setExcel] = useState("")

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
import React, {useState} from 'react'

import Etapes from '../../components/Etapes'
import DropFile from '../../components/DropFile';
import ParticulesFond from '../../components/ParticulesFond'

export default function Accueil() {

    const [excel, setExcel] = useState("")

    return (
        <div>
            <ParticulesFond/>
            <Etapes/>
            <DropFile typeFile='.xlsx, .xls, .ods, .xlr, .tab' compressImage={false} changeFile={e => setExcel(e)}  message="Charger la liste des étudiants"/>
        </div>
    );
}
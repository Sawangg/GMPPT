import React from 'react'

import Etapes from '../components/Etapes'
import DropFile from '../components/DropFile'
import MenuProfil from '../components/MenuProfil'


export default function Accueil(props) {

    return (
        <div>
            <MenuProfil info={props.info} />
            <div>
                <Etapes/>
                <DropFile message="Mettre les photos en ligne"/>
            </div>
        </div>
    );
}
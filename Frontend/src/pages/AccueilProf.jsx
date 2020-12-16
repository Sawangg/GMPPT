import React from 'react'

import Etapes from '../components/Etapes'
import MenuProfil from '../components/MenuProfil'

export default function Accueil(props) {

    return (
        <div>
            <MenuProfil/>
            <Etapes/>
        </div>
    );
}
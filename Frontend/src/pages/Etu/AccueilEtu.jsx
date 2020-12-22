import React from 'react'

import MenuProfil from '../../components/MenuProfil'


export default function Accueil(props) {

    return (
        <div>
            <MenuProfil info={props.info} />
            <p>t'es etudiant t'as droit a rien...</p>
        </div>
    );
}
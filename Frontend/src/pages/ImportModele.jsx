import React from 'react'

import DropFile from '../components/DropFile'

export default function Accueil(props) {

    return (
        <div>
            <DropFile message="Impoter les images des modèles 3D (moins de 1Mo)"/>
        </div>
    );
}
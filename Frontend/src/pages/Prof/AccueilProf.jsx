import React, {useState} from 'react'

import Etapes from '../../components/Etapes';
import ParticulesFond from '../../components/ParticulesFond';
import GestionUnite from '../../components/GestionUnite'

export default function Accueil() {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <ParticulesFond/>
            <Etapes/>
            <button className="center" style={{position : "relative", zIndex : 100}} onClick={() => setOpen(true)}>ici</button>
            <GestionUnite tard={true} setClose={() => setOpen(false)} open={open}/>
        </div>
    );
}
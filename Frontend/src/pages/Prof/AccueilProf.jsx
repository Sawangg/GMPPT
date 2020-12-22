import React, {useState} from 'react'
import {Button} from '@material-ui/core';


import Etapes from '../../components/Etapes'
import SelectionModele from '../../components/SelectionModele'

export default function Accueil() {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button onClick={e => setOpen(true)}>Choisir modele sujet</Button>
            <SelectionModele tard={true} setOpen={e => setOpen(e)} open={open}/>
            <Etapes/>
        </div>
    );
}
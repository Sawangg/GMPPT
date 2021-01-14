import React from 'react'

import Etapes from '../../components/Etapes';
import ParticulesFond from '../../components/ParticulesFond';
import {makeStyles} from "@material-ui/core";

export default function Accueil() {

    const useStyles = makeStyles((theme) => ({
        
    }));

    const classes = useStyles();

    return (
        <div>
            <ParticulesFond/>
            <Etapes/>
        </div>
    );
}
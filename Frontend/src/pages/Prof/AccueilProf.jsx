import React, {useState} from 'react'

import Etapes from '../../components/Etapes';
import ParticulesFond from '../../components/ParticulesFond';
import GestionUnite from '../../components/GestionUnite'
import {makeStyles} from "@material-ui/core";

export default function Accueil() {

    const useStyles = makeStyles((theme) => ({
        button: {
            position : "relative",
            zIndex : 100,
            display: "block",
            margin: "auto"
        }
    }));

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <div>
            <ParticulesFond/>
            <Etapes/>
            <button className={classes.button} onClick={() => setOpen(true)}>ici</button>
            <GestionUnite tard={true} setClose={() => setOpen(false)} open={open}/>
        </div>
    );
}
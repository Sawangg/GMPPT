import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';

import MenuProfil from '../../components/MenuProfil'
import {makeStyles} from "@material-ui/core";


export default function Accueil(props) {

    const useStyles = makeStyles((theme) => ({
        divProgress: {
            width : "50%",
            margin : "auto"
        }
    }));
    const classes = useStyles();

    return (
        <div>
            <MenuProfil info={props.info} />
            <div className={classes.divProgress}>
                <p>Progression dans le traitement du sujet</p>
                <LinearProgress  variant="determinate" value={10}/>
                <p>Date limite de rendu : 10/01/21</p>
            </div>
        </div>
    );
}


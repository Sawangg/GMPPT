import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';

import MenuProfil from '../../components/MenuProfil'


export default function Accueil(props) {

    return (
        <div>
            <MenuProfil info={props.info} />
            <div style={{width : "50%", margin : "auto"}}>
                <p>Progression dans le traitement du sujet</p>
                <LinearProgress  variant="determinate" value={10}/>
                <p>Date limite de rendu : 10/01/21</p>
            </div>
        </div>
    );
}


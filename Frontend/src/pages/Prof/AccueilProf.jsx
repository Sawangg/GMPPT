import React from 'react'

import Etapes from '../../components/Etapes';
import ParticulesFond from '../../components/ParticulesFond';
import DelayInput from '../../components/InputAwait';

import {makeStyles} from "@material-ui/core";

export default function Accueil() {
    return (
        <div>
            <ParticulesFond/>
            <Etapes/>
            <div style={{zIndex : 1000, position : "relative"}}>
                <DelayInput
                    label="test"
                    delayTimeout={200}
                    onChange={event => console.log(event.target.value)} 
                />
            </div>
        </div>
    );
}
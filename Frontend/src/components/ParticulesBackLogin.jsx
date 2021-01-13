import React from 'react'
import Particles from 'react-particles-js';
import {makeStyles} from "@material-ui/core";

export default function Particules(){
    const useStyles = makeStyles((theme) => ({
        particles: {
            position: "absolute",
            opacity : "0.6",
            top : 0
        }
    }));
    const classes = useStyles();

    return(
        <Particles
            className={classes.particles}
            height="100vh"
            width="100%"
            params={{
              particles: {
                color: {
                  value: "#000000"
                },
                line_linked: {
                  color: {
                    value: "#000000"
                  }
                },
                number: {
                  value: 50
                },
                size: {
                  value: 3
                }
              },
              "interactivity": {
                "events": {
                  "onhover": {
                    "enable": true,
                    "mode": "repulse"
                  }
                }
              }
            }}
        />
    )
}
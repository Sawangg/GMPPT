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
            "particles": {
            "number": {
                "value": 35,
                "density": {
                "enable": true,
                "value_area": 1969.2792437967696
                }
            },
            "color": {
                "value": "#043f4f"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                "width": 0,
                "color": "#000000"
                },
                "polygon": {
                "nb_sides": 6
                },
                "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
                }
            },
            "opacity": {
                "value": 1,
                "random": true,
                "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0,
                "sync": false
                }
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": {
                "enable": false,
                "speed": 4,
                "size_min": 0.3,
                "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 126.03387160299326,
                "color": "#00ff74",
                "opacity": 1,
                "width": 1.7329657345411573
            },
            "move": {
                "enable": true,
                "speed": 0.8,
                "direction": "bottom-left",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                "enable": false,
                "rotateX": 1024.0252067743202,
                "rotateY": 945.2540370224496
                }
            }
            }
  }}/>
    )
}
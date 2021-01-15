import React, {useState} from 'react';
import {Typography, Slider, makeStyles, ClickAwayListener } from '@material-ui/core';

import { useDispatch } from "react-redux";
import { handleChangeMargeErreur } from '../../slice/EnoncesSlice'

export default function SliderBar(props) {

    const useStyles = makeStyles((theme) => ({
        divSlideBar: {
            width : "70%",
            margin : "5% auto 0 auto"
        }
    }));
    const classes = useStyles();

    const dispatch = useDispatch();
    const [margeErreurState, setMargeErreurState] = useState(5)

    const handleChange = (event, newValue) => {
      setMargeErreurState(newValue)
    };

    const handleClickAway = (e) => {
      dispatch(handleChangeMargeErreur({indexQuestion : props.indexQuestion, indexReponse : props.indexReponse, marge : margeErreurState}))
    }

  return (
    <ClickAwayListener mouseEvent="onMouseUp" touchEvent="onTouchStart" onClickAway={handleClickAway}>
      <div className={classes.divSlideBar}>
        <Typography variant="caption" gutterBottom>Marge d'erreur autorisée</Typography>
        <Slider
          onChange={handleChange}
          marks={[{value: 0, label: '0%'}, {value : 100, label : "100%"}]}
          step={5}
          value={margeErreurState}
          valueLabelDisplay="auto"
          aria-labelledby="discrete-slider-always"
        />
      </div>
    </ClickAwayListener>
  );
}
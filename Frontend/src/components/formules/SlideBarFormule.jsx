import React from 'react';
import { Typography, Slider} from '@material-ui/core';

import { useDispatch } from "react-redux";
import { changeMargeErreurCategorie } from "../../slice/FormulesSlice";
import { useSelector } from "react-redux";
import { selectMargeErreur } from "../../slice/FormulesSlice"

export default function SliderBar(props) {

    const dispatch = useDispatch();
    const marge = useSelector(selectMargeErreur(props.index));

    const handleChange = (event, newValue) => {
      dispatch(changeMargeErreurCategorie({index : props.index, marge : newValue}))
    };

  return (
    <div style={{width : "70%", margin : "5% auto 0 auto"}}>
      <Slider
        onChange={handleChange}
        marks={[{value: 0, label: '0%'}, {value : 100, label : "100%"}]}
        step={5}
        value={parseInt(marge)}
        valueLabelDisplay="auto"
        aria-labelledby="discrete-slider-always"
      />
      <Typography variant="caption" gutterBottom>Marge d'erreur autorisée</Typography>
    </div>
  );
}
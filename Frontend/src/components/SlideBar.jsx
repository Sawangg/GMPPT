import React from 'react';
import { Typography, Slider} from '@material-ui/core';

import { useDispatch } from "react-redux";
import { changeMargeErreurCategorie } from "../slice/FormulesSlice";

export default function SliderBar(props) {

    const dispatch = useDispatch();

    const valuetext = (value) => {
        dispatch(changeMargeErreurCategorie({index : props.index, marge : value}))
      return value;
    }

  return (
    <div style={{width : "70%", margin : "5% auto 0 auto"}}>
      <Slider
        defaultValue={5}
        getAriaValueText={valuetext}
        marks={[{value: 0, label: '0%'}, {value : 100, label : "100%"}]}
        step={5}
        valueLabelDisplay="auto"
      />
      <Typography variant="caption" gutterBottom>Marge d'erreur autorisée</Typography>
    </div>
  );
}
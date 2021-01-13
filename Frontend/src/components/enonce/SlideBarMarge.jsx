import React from 'react';
import { Typography, Slider} from '@material-ui/core';

import { useSelector, useDispatch } from "react-redux";
import { selectMargeErreur, handleChangeMargeErreur } from '../../slice/EnoncesSlice'

export default function SliderBar(props) {

    const dispatch = useDispatch();
    const marge = useSelector(selectMargeErreur(props.indexQuestion, props.indexReponse));

    const handleChange = (event, newValue) => {
      dispatch(handleChangeMargeErreur({indexQuestion : props.indexQuestion, indexReponse : props.indexReponse, marge : newValue}))
    };

  return (
    <div style={{height : 40, position : "relative", bottom : 10}}>
      <Typography variant="caption" gutterBottom>Marge d'erreur autorisée</Typography>
      <Slider
        onChange={handleChange}
        marks={[{value: 0, label: '0%'}, {value : 100, label : "100%"}]}
        step={5}
        value={parseInt(marge)}
        valueLabelDisplay="auto"
        aria-labelledby="discrete-slider-always"
      />
    </div>
  );
}
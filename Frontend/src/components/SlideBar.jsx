import React from 'react';
import { Typography, Slider} from '@material-ui/core';

export default function SliderBar(props) {

    const valuetext = (value) => {
        props.getValueSlideBar(value);
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
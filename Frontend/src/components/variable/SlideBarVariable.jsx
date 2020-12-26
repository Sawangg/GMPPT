import React from 'react';
import { Typography, Slider } from '@material-ui/core';

import { useDispatch } from "react-redux";
import { changePrecision } from "../../slice/VariablesAleatoiresSlice";
import { useSelector } from "react-redux";
import { selectPrecision } from "../../slice/VariablesAleatoiresSlice"

export default function SlideBar(props){

    const precision = useSelector(selectPrecision(props.index));
    const dispatch = useDispatch();

    const valueLabelFormat = (value) => {
        if (value !== 0){
          return `10^${value}`;
        } else {
            return 0
        }
    }

    const handleChange = (event, newValue) => {
        dispatch(changePrecision({ index : props.index, precision : newValue}));
      };

    return(
        <div style={{width : 120}}>
        <Slider
            value={precision}
            min={-6}
            step={1}
            max={6}
            getAriaValueText={valueLabelFormat}
            valueLabelFormat={valueLabelFormat}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="non-linear-slider"
        />
        <Typography gutterBottom>Précision</Typography>
        </div>
    )
    
}
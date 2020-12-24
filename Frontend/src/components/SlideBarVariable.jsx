import React, {useState} from 'react';
import { Typography, Slider } from '@material-ui/core';

export default function SlideBar(){

    const [value, setValue] = useState(0);

    const valueLabelFormat = (value) => {
        if (value !== 0){
          return `10^-${value}`;
        } else {
            return 0
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return(
        <div style={{width : 120}}>
        <Slider
            value={value}
            min={0}
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
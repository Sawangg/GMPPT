import React, {useState} from 'react';
import { Typography, Slider, ClickAwayListener } from '@material-ui/core';

import useConstructor from '../use/useContructor';

import { useDispatch } from "react-redux";
import { changePrecision } from "../../slice/VariablesAleatoiresSlice";
import { useSelector } from "react-redux";
import { selectPrecision } from "../../slice/VariablesAleatoiresSlice"

const SlideBar = ({ index }) => {
    
    const dispatch = useDispatch();
    const precisionSlice = useSelector(selectPrecision(index));

    const valueLabelFormat = (value) => {
        if (value !== 0){
          return `10^${value}`;
        } else {
            return 0
        }
    }

    const [precision, setPrecision] = useState(1)

    useConstructor(() => setPrecision(precisionSlice));

    const handleChange = (event, newValue) => {
        setPrecision(newValue)
      };

      const handleClickAway = (e) => {
        dispatch(changePrecision({ index : index, precision : precision}));
      }

    return(
        <ClickAwayListener mouseEvent="onMouseUp" touchEvent="onTouchStart" onClickAway={handleClickAway}>
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
        </ClickAwayListener>
    )
    
}

export default React.memo(SlideBar);
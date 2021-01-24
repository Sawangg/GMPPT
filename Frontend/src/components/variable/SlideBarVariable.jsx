import React, {useCallback, useState} from 'react';
import {Typography, Slider, makeStyles} from '@material-ui/core';

import useConstructor from '../use/useContructor';

import { useDispatch } from "react-redux";
import { changePrecision } from "../../slice/VariablesAleatoiresSlice";
import { useSelector } from "react-redux";
import { selectPrecision } from "../../slice/VariablesAleatoiresSlice"

const SlideBar = ({ index }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: 120
        }
    }));
    const classes = useStyles();
    
    const dispatch = useDispatch();
    const precisionSlice = useSelector(selectPrecision(index));

    const valueLabelFormat = (value) => {
        if (value !== 0){
          return `10^${value}`;
        } else {
            return 0
        }
    }

    const handleChange = useCallback((value) => {
        dispatch(changePrecision({ index : index, precision : value}));
    }, [dispatch, index]);

    return(
        <div className={classes.root}>
            <Slider
                defaultValue={precisionSlice}
                min={-6}
                step={1}
                max={6}
                getAriaValueText={valueLabelFormat}
                valueLabelFormat={valueLabelFormat}
                onChangeCommitted={(_, value) => handleChange(value)}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
            />
            <Typography gutterBottom>Précision</Typography>
        </div>
    )
    
}

export default React.memo(SlideBar);
import React, { useCallback } from 'react';
import { Typography, Slider, makeStyles } from '@material-ui/core';

import { useDispatch, useSelector } from "react-redux";
import { handleChangeMargeErreur, selectMargeErreur } from '../../slice/EnoncesSlice';

const SliderBar = ({ indexQuestion, indexReponse }) => {

	const useStyles = makeStyles(() => ({
		divSlideBar: {
			width: "70%",
			margin: "5% auto 0 auto"
		}
	}));

	const classes = useStyles();

	const dispatch = useDispatch();
	const margeErreur = useSelector(selectMargeErreur(indexQuestion, indexReponse));

	const handleClickAway = useCallback((value) => {
		dispatch(handleChangeMargeErreur({ indexQuestion: indexQuestion, indexReponse: indexReponse, marge: value }));
	}, [dispatch, indexQuestion, indexReponse]);

	return (
		<div className={classes.divSlideBar}>
			<Typography variant="caption" gutterBottom>Marge d'erreur autorisée</Typography>
			<Slider
				defaultValue={margeErreur}
				marks={[{ value: 0, label: '0%' }, { value: 100, label: "100%" }]}
				step={5}
				min={0}
				max={100}
				onChangeCommitted={(_, value) => handleClickAway(value)}
				valueLabelDisplay="auto"
				aria-labelledby="discrete-slider-always"
			/>
		</div>
	);
}

export default React.memo(SliderBar);
import React, { useEffect, useState } from "react";

import ParticulesFond from "../../components/ParticulesFond";
import useConstructor from "../../components/use/useContructor";
import CircularProgressLabel from "../../components/CircularProgressLabel";

import { useDispatch, useSelector } from "react-redux";
import { selectModeleActuel, getModele } from "../../slice/ModeleSlice";
import { getCategoriesFormules, selectEnregistreFormule, selectTabCategorieLength } from "../../slice/FormulesSlice";
import { getAllVariables, selectEnregistreVariable, selectTabLength } from "../../slice/VariablesAleatoiresSlice";
import { getSujet, selectEnregistreEnonce, selectTabQuestionLength } from "../../slice/EnoncesSlice";
import { selectEnregistreUnite, getAllUnite } from "../../slice/UniteSlice";
import { Card, CardContent, makeStyles } from "@material-ui/core";

export default function Accueil() {

	const useStyles = makeStyles(() => ({
		rootCard: {
			margin: "auto",
			width: "40%",
		},
		rootSkeleton: {
			margin: "auto"
		},
		element: {
			display: "flex",
			width: "80%",
			justifyContent: "space-between",
			marginTop: "2%",
		},
        marginElement: {
            marginTop: 10,
        },
    }));

	const classes = useStyles();

	const dispatch = useDispatch();
	const [actualise, setActualise] = useState(false);
	const modele = useSelector(selectModeleActuel);
	const isEnregistreVariable = useSelector(selectEnregistreVariable);
	const isEnregistreFormule = useSelector(selectEnregistreFormule);
	const isEnregistreEnonce = useSelector(selectEnregistreEnonce);
	const isEnregistreUnite = useSelector(selectEnregistreUnite);
	const tabCatLength = useSelector(selectTabCategorieLength);
	const tabVarLength = useSelector(selectTabLength);
	const tabQuestionLength = useSelector(selectTabQuestionLength);
    const { max_variable, max_catformule, max_question } = window;

	useConstructor(async () => {
		dispatch(getModele());
		if (!isEnregistreUnite) dispatch(getAllUnite());
	});

	useEffect(() => {
		if (modele) {
			if (!isEnregistreFormule) dispatch(getCategoriesFormules(modele.index));
			if (!isEnregistreVariable) dispatch(getAllVariables(modele.index));
			if (!isEnregistreEnonce) dispatch(getSujet(modele.index));
			setActualise(true);
		}
	}, [modele, dispatch, isEnregistreFormule, isEnregistreVariable, isEnregistreEnonce, isEnregistreUnite]);

	return (
		<>
			<ParticulesFond />
			{actualise ?
				<Card className={classes.rootCard}>
					<CardContent>
						<p>Modèle selectionné : <strong>{modele ? modele.nom : ""}</strong></p>
						<div className={classes.element}>
							<p className={classes.marginElement}>Nombre de variables créées pour le modèle actuel</p>
							<CircularProgressLabel value={tabVarLength} valueMax={max_variable} />
						</div>
						<div className={classes.element}>
							<p className={classes.marginElement}>Nombre de catégories de formules créées pour le modèle actuel</p>
							<CircularProgressLabel value={tabCatLength} valueMax={max_catformule} />
						</div>
						<div className={classes.element}>
							<p className={classes.marginElement}>Nombre de questions créées pour le modèle actuel</p>
							<CircularProgressLabel value={tabQuestionLength} valueMax={max_question} />
						</div>
					</CardContent>
				</Card>
				: null}
		</>
	);
}
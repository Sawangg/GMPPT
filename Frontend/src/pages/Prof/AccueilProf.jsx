import React, { useEffect, useState } from "react";

import ParticulesFond from "../../components/ParticulesFond";
import useConstructor from "../../components/use/useContructor";
import CircularProgressLabel from "../../components/CircularProgressLabel";
import Skeleton from '@material-ui/lab/Skeleton';

import { useDispatch, useSelector } from "react-redux";
import { selectModeleActuel, getModele, selectTabLengthModele } from "../../slice/ModeleSlice";
import { getCategoriesFormules, selectEnregistreFormule, selectTabCategorieLength } from "../../slice/FormulesSlice";
import { getAllVariables, selectEnregistreVariable, selectTabLength } from "../../slice/VariablesAleatoiresSlice";
import { getSujet, selectEnregistreEnonce, selectTabQuestionLength } from "../../slice/EnoncesSlice";
import { selectEnregistreUnite, getAllUnite } from "../../slice/UniteSlice";
import { Card, CardContent } from "@material-ui/core";

export default function Accueil() {
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
  const tabModLenght = useSelector(selectTabLengthModele);

  useConstructor(async () => {
    dispatch(getModele());
    if (!isEnregistreUnite) dispatch(getAllUnite());
  });

  useEffect(() => {
      if (modele){
        if (!isEnregistreFormule) dispatch(getCategoriesFormules(modele.index));
        if (!isEnregistreVariable) dispatch(getAllVariables(modele.index));
        if (!isEnregistreEnonce) dispatch(getSujet(modele.index));
        setActualise(true);
      }
  }, [modele, dispatch, isEnregistreFormule, isEnregistreVariable, isEnregistreEnonce, isEnregistreUnite])

  return (
    <div>
      <ParticulesFond />
      
            {actualise ? 
            <Card style={{width : "30%", margin : "auto"}}>
            <CardContent>
            <p>Nombre de modèles créés : {tabModLenght}</p>
            <p>Modèle selectionné : {modele ? modele.nom : ""}</p>
            <div style={{display : "flex", width : "80%", justifyContent : "space-between", marginTop : "2%"}}>
                <p style={{marginTop : 10}}>Nombre de variables créées pour le modèle actuel</p>
                <CircularProgressLabel value={tabVarLength} valueMax={75}/>
            </div>
            <div style={{display : "flex", width : "80%", justifyContent : "space-between", marginTop : "2%"}}>
                <p style={{marginTop : 10}}>Nombre de catégories de formules créées pour le modèle actuel</p>
                <CircularProgressLabel value={tabCatLength} valueMax={20}/>
            </div>
            <div style={{display : "flex", width : "80%", justifyContent : "space-between", marginTop : "2%"}}>
                <p style={{marginTop : 10}}>Nombre de questions créées pour le modèle actuel</p>
                <CircularProgressLabel value={tabQuestionLength} valueMax={20}/>
            </div>
                </CardContent>
            </Card>
            : <Skeleton style={{margin : "auto"}} variant="rect" width={580} height={280}></Skeleton>}
    </div>
  );
}

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUniteAPI, getAllUniteAPI } from "../utils/api.js";
import _ from "lodash"

export const getAllUnite = createAsyncThunk("unite/getAllUnite", async () => {
  const response = await getAllUniteAPI();
  return response.data;
});

export const enregistreUnites = createAsyncThunk("unite/addunite", async (tabUnites) => {
  const response = await addUniteAPI(tabUnites);
  return response.data;
});

export const uniteSlice = createSlice({
  name: "unite",
  initialState: {
    tabUnites: [{
      nom : undefined,
      abrev : undefined,
    }],
    indexEnModif : -1, //l'index de l'unité qui est en modif (-1 coorespond à aucune unité en modif)
    actualise : false, //indique si l'importation des données est terminée
    enregistre : false
  },
  reducers: {
    //ajoute une unité dans le tableau Unité (ATTENTION : n'enregistre pas dans la BD)
    //paramètres : nomComplet de l'unité, abréviation
    addUnite : (state) =>{
      let index = state.tabUnites.push({
        nom : "",
        abrev : ""
      })
      state.indexEnModif = index - 1
      state.enregistre = false
    },
    //change le nom complet d'une unité
    //paramètres : nom complet de l'unité et index
    changeNomComplet : (state, action) =>{
      let {index, value} = action.payload
      state.tabUnites[index].nom = value
      state.enregistre = false
    },
    //change l'abréviation d'une unité
    //paramètres : abréviation de l'unité et index
    changeAbreviation : (state, action) =>{
      let {index, value} = action.payload
      state.tabUnites[index].abrev = value
      state.enregistre = false
    },
    //supprime l'unité dans le tableau
    //paramètres : index
    deleteUnite : (state, action) =>{
      let index = action.payload
      console.log(action.payload)
      state.tabUnites.splice(index, 1)
      state.enregistre = false
    },
    setIndexEnModif : (state, action) =>{
      state.indexEnModif = action.payload
    },
    setEnregistre : (state, action) =>{
      state.enregistre = action.payload
    },
    setTest : (state) =>{
      state.tabUnites = [
        {nom : "Sans Unité", abrev : " "},
        {nom : "Gramme", abrev : "g"},
        {nom : "Newton", abrev : "N"}
      ]
    }
  },
  extraReducers: {
    [getAllUnite.fulfilled]: (state, action) => {
      state.tabUnites = []
      const sansUnite = _.remove(action.payload, function(o) {
        return o.nom === "Sans Unité"
      });

      state.tabUnites.push(sansUnite[0])

      action.payload.forEach(unite => {
        state.tabUnites.push({
          nom : unite.nom,
          abrev : unite.abrev
        })
      });
      state.actualise = true
      state.enregistre = true;
    },
    [getAllUnite.pending]: (state, action) => {
      state.actualise = false
    },
    [enregistreUnites.fulfilled]: (state, action) => {
      state.indexEnModif = -1
      state.enregistre = true
    },
    [enregistreUnites.pending]: (state, action) => {
    }
  }
});

export const { setTest, addUnite, changeNomComplet, changeAbreviation, deleteUnite, setIndexEnModif, setEnregistre } = uniteSlice.actions;

export const selectUnites = (state) => state.unite.tabUnites;

export const selectActualise = (state) => state.unite.actualise;

export const selectIndexEnMofid = (state) => state.unite.indexEnModif;

export const selectEnregistreUnite = (state) => state.unite.enregistre;

export default uniteSlice.reducer;

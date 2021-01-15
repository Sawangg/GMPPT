import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUniteAPI, getAllUniteAPI, deleteUniteAPI } from "../utils/api.js";

export const getAllUnite = createAsyncThunk("unite/getAllUnite", async () => {
  const response = await getAllUniteAPI();
  return response.data;
});

export const enregistreUnite = createAsyncThunk("unite/addunite", async (props) => {
  const response = await addUniteAPI(props.nomComplet, props.abr);
  return response.data;
});

export const deleteUniteBD = createAsyncThunk("unite/deleteUnite", async (nomUnite) => {
  const response = await deleteUniteAPI(nomUnite);
  return response.data;
});

export const uniteSlice = createSlice({
  name: "unite",
  initialState: {
    tabUnites: [{
      nomComplet : undefined,
      abr : undefined,
    }],
    indexEnModif : -1, //l'index de l'unité qui est en modif (-1 coorespond à aucune unité en modif)
    actualise : false, //indique si l'importation des données est terminée
    chargementSuppression : false
  },
  reducers: {
    //ajoute une unité dans le tableau Unité (ATTENTION : n'enregistre pas dans la BD)
    //paramètres : nomComplet de l'unité, abréviation
    addUnite : (state) =>{
      let index = state.tabUnites.push({
        nomComplet : "",
        abr : ""
      })
      state.indexEnModif = index - 1
    },
    //change le nom complet d'une unité
    //paramètres : nom complet de l'unité et index
    changeNomComplet : (state, action) =>{
      let {index, value} = action.payload
      state.tabUnites[index].nomComplet = value
    },
    //change l'abréviation d'une unité
    //paramètres : abréviation de l'unité et index
    changeAbreviation : (state, action) =>{
      let {index, value} = action.payload
      state.tabUnites[index].abr = value
    },
    //supprime l'unité dans le tableau
    //paramètres : index
    deleteUnite : (state, action) =>{
      let {index} = action.payload
      state.tabUnites.splice(index, 1)
    },
    setIndexEnModif : (state, action) =>{
      state.indexEnModif = action.payload
    },
    setTest : (state) =>{
      state.tabUnites = [
        {nomComplet : "Sans Unité", abr : " "},
        {nomComplet : "Gramme", abr : "g"},
        {nomComplet : "Newton", abr : "N"}
      ]
    }
  },
  extraReducers: {
    [getAllUnite.rejected]: (state, action) => {
      console.log("reject get")
    },
    [getAllUnite.fulfilled]: (state, action) => {
      state.tabUnites = []
      action.payload.forEach(unite => {
        state.tabUnites.push({
          nomComplet : unite.nom,
          abr : unite.abrev
        })
      });
      state.actualise = true
    },
    [getAllUnite.pending]: (state, action) => {
      state.actualise = false
    },
    [enregistreUnite.rejected]: (state, action) => {
      console.log("reject")
    },
    [enregistreUnite.fulfilled]: (state, action) => {
      console.log("fulfill")
      state.indexEnModif = -1
    },
    [enregistreUnite.pending]: (state, action) => {
    },
    [deleteUniteBD.rejected]: (state, action) => {
    },
    [deleteUniteBD.fulfilled]: (state, action) => {
    },
    [deleteUniteBD.pending]: (state, action) => {
    },
  }
});

export const { setTest, addUnite, changeNomComplet, changeAbreviation, deleteUnite, setIndexEnModif } = uniteSlice.actions;

export const selectUnites = (state) => state.unite.tabUnites;

export const selectActualise = (state) => state.unite.actualise;

export const selectIndexEnMofid = (state) => state.unite.indexEnModif

export const selectChargementSupp = (state) => state.unite.chargementSuppression;

export default uniteSlice.reducer;

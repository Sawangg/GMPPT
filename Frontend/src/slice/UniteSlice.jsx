import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUniteAPI, getAllUniteAPI, deleteUniteAPI } from "../utils/api.js";

export const getAllUnite = createAsyncThunk("unite/getAllUnite", async () => {
  const response = await getAllUniteAPI();
  return response.data;
});

export const addUnite = createAsyncThunk("unite/addunite", async (nom, abr) => {
  const response = await addUniteAPI(nom, abr);
  return response.data;
});

export const deleteUnite = createAsyncThunk("unite/deleteUnite", async (idUnite) => {
  const response = await deleteUniteAPI(idUnite);
  return response.data;
});

export const uniteSlice = createSlice({
  name: "unite",
  initialState: {
    tabUnites: [{nomComplet : undefined, abr : undefined}],
    actualise: false,
    chargementSuppression : false
  },
  reducers: {
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
      console.log("reject")
    },
    [getAllUnite.fulfilled]: (state, action) => {
      let nom = action.payload.nom
      let abr = action.payload.abrev
      console.log(nom + "; " + abr)
    },
    [getAllUnite.pending]: (state, action) => {
      state.actualise = false
      //console.log(action)
    },
    [addUnite.rejected]: (state, action) => {
      console.log("reject")
    },
    [addUnite.fulfilled]: (state, action) => {
      console.log("fulfill")
    },
    [addUnite.pending]: (state, action) => {
    },
    [deleteUnite.rejected]: (state, action) => {
    },
    [deleteUnite.fulfilled]: (state, action) => {
    },
    [deleteUnite.pending]: (state, action) => {
    },
  }
});

export const { setTest } = uniteSlice.actions;

export const selectUnites = (state) => state.unite.tabUnites;

export const selectActualise = (state) => state.unite.actualise;

export const selectChargementSupp = (state) => state.unite.chargementSuppression;

export default uniteSlice.reducer;

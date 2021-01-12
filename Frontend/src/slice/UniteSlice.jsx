import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUniteAPI, getAllUniteAPI, deleteUniteAPI } from "../utils/api.js";

export const getAllUnite = createAsyncThunk("unite/getAllUnite", async () => {
  const response = await getAllUniteAPI();
  return response.data;
});

export const addunite = createAsyncThunk("unite/addunite", async (nom, abrev) => {
  const response = await addUniteAPI(nom, abrev);
  return response.data;
});

export const deleteUnite = createAsyncThunk("unite/deleteUnite", async (idUnite) => {
  const response = await deleteUniteAPI(idUnite);
  return response.data;
});

export const uniteSlice = createSlice({
  name: "unite",
  initialState: {
    tabName: [{nomComplet : undefined, abr : undefined}],
    actualise: false,
    chargementSuppression : false
  },
  reducers: {
    addUnite: (state, action) => {
      state.tabNamepush(action.payload);
    },
  },
  extraReducers: {
    [getAllUnite.rejected]: (state, action) => {
    },
    [getAllUnite.fulfilled]: (state, action) => {
    },
    [getAllUnite.pending]: (state, action) => {
    },
    [addunite.rejected]: (state, action) => {
    },
    [addunite.fulfilled]: (state, action) => {
    },
    [addunite.pending]: (state, action) => {
    },
    [deleteUnite.rejected]: (state, action) => {
    },
    [deleteUnite.fulfilled]: (state, action) => {
    },
    [deleteUnite.pending]: (state, action) => {
    },
  }
});

export const { addUnite } = uniteSlice.actions;

export const selectUnite = (state) => state.unite;

export const selectActualise = (state) => state.unite.actualise;

export const selectChargementSupp = (state) => state.unite.chargementSuppression;

export default uniteSlice.reducer;

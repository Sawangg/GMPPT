import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addVariableAPI, getVariablesAPI } from "../utils/api.js";

export const getAllVariables = createAsyncThunk(
  "variable/getAllVariables",
  async (idModele) => {
    const response = await getVariablesAPI(idModele);
    return response.data;
  }
);

export const setVariables = createAsyncThunk(
  "variable/setVariables",
  async (variable) => {
    const response = await addVariableAPI(variable.idModele, variable.tab);
    return response.data;
  }
);

export const variablesAleatoiresReducer = createSlice({
  name: "variableAleatoire",
  initialState: {
    tab: [
      {
        nom: "",
        min: 0,
        max: 0,
        precision: 0,
        modif: true,
        index: 0,
      },
    ],
    actualise: false,
    enregistre: false,
  },
  reducers: {
    addVariable: (state) => {
      state.tab.push({
        nom: "",
        min: 0,
        max: 0,
        precision: 0,
        modif: true,
        index: state.tab.length,
      });
      state.enregistre = false;
    },
    changeNom: (state, action) => {
      state.tab[action.payload.index].nom = action.payload.event;
      state.enregistre = false;
    },
    changeMin: (state, action) => {
      if (action.payload.event.match("^[0-9]+$|^$")) {
        state.tab[action.payload.index].min = action.payload.event;
        state.enregistre = false;
      }
    },
    changeMax: (state, action) => {
      if (action.payload.event.match("^[0-9]+$|^$")) {
        state.tab[action.payload.index].max = action.payload.event;
        state.enregistre = false;
      }
    },
    removeVariable: (state, action) => {
      if (state.tab.length > 1) {
        state.tab.splice(action.payload, 1);
        state.enregistre = false;
      }
    },
    changeModif: (state, action) => {
      state.tab[action.payload].modif = !state.tab[action.payload].modif;
      state.enregistre = false;
    },
    changePrecision: (state, action) => {
      state.tab[action.payload.index].precision = action.payload.precision;
      state.enregistre = false;
    },
    enregistre: (state) => {
      state.enregistre = true;
    },
  },
  extraReducers: {
    [getAllVariables.pending]: (state) => {
      state.actualise = false;
    },
    [getAllVariables.rejected]: (state, action) => {
      if (action.error.message === "Request failed with status code 404") {
        state.tab = [
          {
            nom: "",
            min: 0,
            max: 0,
            precision: 0,
            modif: true,
            index: 0,
          },
        ];
        state.actualise = true;
        state.enregistre = true;
      }
    },
    [getAllVariables.fulfilled]: (state, action) => {
        let array = [];
        let compt = 0;
        action.payload.forEach((element) => {
          array.push({
            nom: element.nom,
            min: element.min,
            max: element.max,
            precision: element.precision,
            modif: false,
            index: compt,
          });
          ++compt;
        });
        state.actualise = true;
        state.enregistre = true;
        state.tab = array;
    },
    [setVariables.fulfilled]: (state) => {
      state.enregistre = true;
    },
  },
});

export const {
  addVariable,
  changeNom,
  removeVariable,
  changeModif,
  changePrecision,
  enregistre,
  changeMin,
  changeMax,
} = variablesAleatoiresReducer.actions;

export const selectVariablesAleatoires = (state) => state.variableAleatoire.tab;

export const selectActualise = (state) => state.variableAleatoire.actualise;

export const selectPrecision = (index) => (state) => state.variableAleatoire.tab[index].precision;

export const selectEnregistre = (state) => state.variableAleatoire.enregistre;

export default variablesAleatoiresReducer.reducer;

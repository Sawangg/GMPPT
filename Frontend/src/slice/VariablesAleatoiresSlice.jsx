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
      },
    ],
    saveElement : {elem : null, index : undefined},
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
        modif: true
      });
      state.enregistre = false;
    },
    changeNom: (state, action) => {
      state.tab[action.payload.index].nom = action.payload.event;
      state.enregistre = false;
    },
    changeMin: (state, action) => {
      state.tab[action.payload.index].min = action.payload.event;
      state.enregistre = false;
    },
    changeMax: (state, action) => {
      state.tab[action.payload.index].max = action.payload.event;
      state.enregistre = false;
    },
    removeVariable: (state, action) => {
      if (state.tab.length > 1) {
        state.saveElement = {elem : state.tab[action.payload], index : action.payload};
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
    undoVariable: (state) =>{
      state.tab.splice(state.saveElement.index, 0, {
          nom : state.saveElement.elem.nom,
          min : state.saveElement.elem.min, 
          max : state.saveElement.elem.max, 
          precision : state.saveElement.elem.precision,
          modif : state.saveElement.elem.modif
         });
    }
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
          },
        ];
        state.actualise = true;
        state.enregistre = true;
      }
    },
    [getAllVariables.fulfilled]: (state, action) => {
        let array = [];
        action.payload.forEach((element) => {
          array.push({
            nom: element.nom,
            min: element.min,
            max: element.max,
            precision: element.precision,
            modif: false,
          });
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
  undoVariable,
} = variablesAleatoiresReducer.actions;

export const selectVariablesAleatoires = (state) => state.variableAleatoire.tab;

export const selectActualise = (state) => state.variableAleatoire.actualise;

export const selectPrecision = (index) => (state) => state.variableAleatoire.tab[index].precision;

export const selectEnregistre = (state) => state.variableAleatoire.enregistre;

export default variablesAleatoiresReducer.reducer;

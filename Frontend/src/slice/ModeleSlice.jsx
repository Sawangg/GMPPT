import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getAllModele, deleteModele, addModele } from '../utils/api.js';

export const getModele = createAsyncThunk(
  'modele/getAllModele',
  async () => {
    const response = await getAllModele();
    return response.data
  }
)

export const removeModele = createAsyncThunk(
  'modele/removeModele',
  async (idModele) => {
    const response = await deleteModele(idModele);
    return response.data
  }
)

export const addNewModele = createAsyncThunk(
  'modele/new',
  async (nom) => {
    const response = await addModele(nom);
    return response.data
  }
)


export const userSlice = createSlice({
  name: 'modele',
  initialState: {
    tabName: [],
    idModeleSelectionne : undefined,
    actualise : false
  },
  reducers: {
    selectionnerModele : (state, action) => {
       state.idModeleSelectionne = action.payload;
    }
  },
  extraReducers: {
    [getModele.rejected]: (state, action) => {
      console.log("erreur de chargement")
    },
    [getModele.fulfilled]: (state, action) => {
      if (!state.actualise){
        let array = action.payload;
        array.forEach(element => {
            state.tabName[element.id_modele] = {nom : element.nom_modele, index : element.id_modele}
        });
        state.actualise = true;
      }
    },
    [removeModele.rejected]: (state, action) => {
      console.log("erreur de chargement")
    },
    [removeModele.fulfilled]: (state, action) => {
      state.tabName.splice(action.meta.arg, 1)
    },
    [addNewModele.rejected]: (state, action) => {
      console.log("erreur de chargement")
    },
    [addNewModele.fulfilled]: (state, action) => {
      state.tabName[action.payload.insertId] = {nom : action.meta.arg, index : action.payload.insertId}
    },
  }
});

export const { selectionnerModele } = userSlice.actions;

export const selectModele = state => state.modele;

export default userSlice.reducer;
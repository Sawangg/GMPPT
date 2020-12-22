import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'modele',
  initialState: {
    tabName: ["Premières années 2020", "Deuxièmes années 2020", "Licences 2020"],
    modeleSelectionne : undefined
  },
  reducers: {
    selectionnerModele : (state, action) => {
       state.modeleSelectionne = action.payload;
    },
    addModele : (state, action) =>{
      state.tabName.push(action.payload);
    },
    removeModele : (state, action) => {
      state.tabName.splice(action.payload, 1);
    }
  },
});

export const { selectionnerModele, addModele, removeModele } = userSlice.actions;

export const selectModele = state => state.modele;

export default userSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

export const VariablesAleatoiresSlice = createSlice({
    name: 'variableAleatoire',
    initialState: {tab : [{
        nom: "",
        valeurMin : 0,
        valeurMax : 0,
        precision : 0,
        modif : true
        }], actualise : false, enregistre : true },
    reducers: {
        addVariable: (state) => {
        state.tab.push({
            nom: "",
            valeurMin : 0,
            valeurMax : 0,
            precision : 0,
            modif : true,
            })
        state.enregistre = false;
        },
        changeNom: (state, action) =>{
            state.tab[action.payload.index].nom = action.payload.event;
            state.enregistre = false;
        },
        removeVariable: (state, action) =>{
        state.tab.splice(action.payload, 1);
        state.enregistre = false;
        },
        changeModif : (state, action) =>{
        state.tab[action.payload].modif = !state.tab[action.payload].modif;
        state.enregistre = false;
        },
        changePrecision : (state, action) =>{
        state.tab[action.payload.index].precision = action.payload.precision;
        state.enregistre = false;
        },
        enregistre: (state) => {
        state.enregistre = true;
        }
    }
});

export const { addVariable, changeNom, removeVariable, changeModif, changePrecision, enregistre } = VariablesAleatoiresSlice.actions;

export const selectVariablesAleatoires = state => state.variableAleatoire.tab;

export const selectActualise = state => state.variableAleatoire.actualise;

export const selectPrecision = index => state => state.variableAleatoire.tab[index].precision;

export const selectEnregistre = state => state.variableAleatoire.enregistre;

export default VariablesAleatoiresSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const reg = '^[0-9]+$|^$';

export const variablesAleatoiresReducer = createSlice({
    name: 'variableAleatoire',
    initialState: {tab : [{
        nom: "",
        valeurMin : 0,
        valeurMax : 0,
        precision : 0,
        modif : true,
        index : 0
        }], actualise : false, enregistre : true },
    reducers: {
        addVariable: (state) => {
        state.tab.push({
            nom: "",
            valeurMin : 0,
            valeurMax : 0,
            precision : 0,
            modif : true,
            index : state.tab.length
            })
        state.enregistre = false;
        },
        changeNom: (state, action) =>{
            state.tab[action.payload.index].nom = action.payload.event;
            state.enregistre = false;
        },
        changeValeurMin: (state, action) =>{
            if (action.payload.event.match(reg)){
                state.tab[action.payload.index].valeurMin = action.payload.event;
                state.enregistre = false;
            }
        },
        changeValeurMax: (state, action) =>{
            if (action.payload.event.match(reg)){
                state.tab[action.payload.index].valeurMax = action.payload.event;
                state.enregistre = false;
            }
        },
        removeVariable: (state, action) =>{
            if (state.tab.length > 1){
                state.tab.splice(action.payload, 1);
                state.enregistre = false;
            }
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

export const { addVariable, changeNom, removeVariable, changeModif, changePrecision, enregistre, changeValeurMin, changeValeurMax } = variablesAleatoiresReducer.actions;

export const selectVariablesAleatoires = state => state.variableAleatoire.tab;

export const selectActualise = state => state.variableAleatoire.actualise;

export const selectPrecision = index => state => state.variableAleatoire.tab[index].precision;

export const selectEnregistre = state => state.variableAleatoire.enregistre;

export default variablesAleatoiresReducer.reducer;
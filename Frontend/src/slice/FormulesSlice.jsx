import { createSlice } from '@reduxjs/toolkit';

export const formuleSlice = createSlice({
  name: 'formule',
  initialState: [{
    nom: "",
    modif : true,
    index : 0,
    margeErreur : "5",
    tabFormule : [{
        nomFormule: "",
        formule : "",
        modif : true,
        index : 0
    }],
    saveTabFormule : [{
      nomFormule: "",
      formule : "",
      modif : true,
      index : 0
  }]
  }],
  reducers: {
    setCategorie: (state, action) => {
        const {nom, modif, index, margeErreur} = action.payload
        state.nom = nom;
        state.modif = modif;
        state.index = index;
        state.margeErreur = margeErreur;
    },
    setTab: (state, action) =>{
      let array = action.payload;
      array.forEach((element) => {
          state[element.idx] = {nom : element.nom, modif : false, index : element.idx, margeErreur : element.margeErreur, tabFormule : [
            {
              nomFormule: "",
              formule : "",
              modif : true,
              index : 0
          }
          ], saveTabFormule : []}
      })
    },
    addCategorie: (state) => {
      state.push({
        nom: "",
        modif : true,
        index : state[state.length-1].index+1,
        margeErreur : "5",
        tabFormule : [{
            nomFormule: "",
            formule : "",
            modif : true,
            index : 0
        }]
      })
    },
    changeNom: (state, action) =>{
        state[action.payload.index].nom = action.payload.event;
    },
    removeCategorie: (state, action) =>{
       state.splice(action.payload, 1);
    },
    changeModifCategorie : (state, action) =>{
      state[action.payload].modif = !state[action.payload].modif;
    },
    changeMargeErreurCategorie : (state, action) =>{
      state[action.payload.index].margeErreur = action.payload.marge;
    },
    addFormule: (state, action) => {
      state[action.payload].tabFormule[state[action.payload].tabFormule.length-1].modif = false;
      state[action.payload].tabFormule.push({
            nomFormule: "",
            formule : "",
            modif : true,
            index : state[action.payload].tabFormule[state[action.payload].tabFormule.length-1].index+1
      })
    },
    changeNomFormule: (state, action) => {
      state[action.payload.indexCategorie].tabFormule[action.payload.indexFormule].nomFormule = action.payload.event;
    },
    changeFormule: (state, action) => {
      state[action.payload.indexCategorie].tabFormule[action.payload.indexFormule].formule = action.payload.event;
    },
    changeModifFormule: (state, action) => {
      state[action.payload.indexCategorie].tabFormule[action.payload.indexFormule].modif = !state[action.payload.indexCategorie].tabFormule[action.payload.indexFormule].modif;
    },
    removeFormule: (state, action) => {
      state[action.payload.indexCategorie].saveTabFormule = [...state[action.payload.indexCategorie].tabFormule];
      state[action.payload.indexCategorie].tabFormule.splice(action.payload.indexFormule, 1);
    },
    undoFormule: (state, action) => {
      state[action.payload.indexCategorie].tabFormule = state[action.payload.indexCategorie].saveTabFormule;
    },
    changePositionFormule: (state, action) => {
         if ((action.payload.up && action.payload.indexFormule > 0) || (!action.payload.up && action.payload.indexFormule < state[action.payload.indexCategorie].tabFormule.length-1)){
            let value = action.payload.up ? -1 : 1;
            let save = state[action.payload.indexCategorie].tabFormule[action.payload.indexFormule+value];
            save.index = save.index-value;
            state[action.payload.indexCategorie].tabFormule[action.payload.indexFormule].index = state[action.payload.indexCategorie].tabFormule[action.payload.indexFormule].index+value;
            state[action.payload.indexCategorie].tabFormule[action.payload.indexFormule+value] = state[action.payload.indexCategorie].tabFormule[action.payload.indexFormule]
            state[action.payload.indexCategorie].tabFormule[action.payload.indexFormule] = save;
         }
    },
    },
});

export const { setCategorie, setTab, changeNom, addCategorie, removeCategorie, changeModifCategorie, addFormule, changeMargeErreurCategorie, undoFormule, changeNomFormule, changeFormule, changeModifFormule, removeFormule, changePositionFormule } = formuleSlice.actions;

export const selectFormule = state => state.formule;

export const selectTabFormule = index => state => state.formule[index].tabFormule;

export default formuleSlice.reducer;
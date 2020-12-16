import { createSlice } from '@reduxjs/toolkit';

export const formuleSlice = createSlice({
  name: 'formule',
  initialState: {tab : [{
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
  }], actualise : false },
  reducers: {
    setActualise : (state) =>{
        state.actualise = true;
    },
    setTab: (state, action) =>{
      let array = action.payload;
      array.forEach((element) => {
        let tabFormule = []
        element.formules.forEach((elemForm) =>{
          tabFormule[elemForm.idx] = {
            nomFormule : elemForm.nom,
            formule : elemForm.contenu,
            modif : false,
            index : elemForm.idx
          }
        })
        state.tab[element.idx] = {nom : element.nom, modif : false, index : element.idx, margeErreur : element.margeErreur, tabFormule : tabFormule, saveTabFormule : tabFormule}
      })
    },
    addCategorie: (state) => {
      state.tab.push({
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
        state.tab[action.payload.index].nom = action.payload.event;
    },
    removeCategorie: (state, action) =>{
       state.tab.splice(action.payload, 1);
    },
    changeModifCategorie : (state, action) =>{
      state.tab[action.payload].modif = !state.tab[action.payload].modif;
    },
    changeMargeErreurCategorie : (state, action) =>{
      state.tab[action.payload.index].margeErreur = action.payload.marge;
    },
    addFormule: (state, action) => {
      state.tab[action.payload].tabFormule[state.tab[action.payload].tabFormule.length-1].modif = false;
      state.tab[action.payload].tabFormule.push({
            nomFormule: "",
            formule : "",
            modif : true,
            index : state.tab[action.payload].tabFormule[state.tab[action.payload].tabFormule.length-1].index+1
      })
    },
    changeNomFormule: (state, action) => {
      const {indexCategorie, indexFormule, event} = action.payload;
      state.tab[indexCategorie].tabFormule[indexFormule].nomFormule = event;
    },
    changeFormule: (state, action) => {
      const {indexCategorie, indexFormule, event} = action.payload;
      state.tab[indexCategorie].tabFormule[indexFormule].formule = event;
    },
    changeModifFormule: (state, action) => {
      const {indexCategorie, indexFormule} = action.payload;
      state.tab[indexCategorie].tabFormule[indexFormule].modif = !state.tab[indexCategorie].tabFormule[indexFormule].modif;
    },
    removeFormule: (state, action) => {
      const {indexCategorie, indexFormule} = action.payload;
      state.tab[indexCategorie].saveTabFormule = [...state.tab[indexCategorie].tabFormule];
      state.tab[indexCategorie].tabFormule.splice(indexFormule, 1);
    },
    undoFormule: (state, action) => {
      state.tab[action.payload].tabFormule = state.tab[action.payload].saveTabFormule;
    },
    changePositionFormule: (state, action) => {
      const {indexCategorie, indexFormule, up} = action.payload;
         if ((up && indexFormule > 0) || (!up && indexFormule < state.tab.[indexCategorie].tabFormule.length-1)){
            let value = up ? -1 : 1;
            let save = state.tab[indexCategorie].tabFormule[indexFormule+value];
            save.index = save.index-value;
            state.tab[indexCategorie].tabFormule[indexFormule].index = state.tab[indexCategorie].tabFormule[indexFormule].index+value;
            state.tab[indexCategorie].tabFormule[indexFormule+value] = state.tab[indexCategorie].tabFormule[indexFormule]
            state.tab[indexCategorie].tabFormule[indexFormule] = save;
         }
    },
    },
});

export const { setActualise, setTab, changeNom, addCategorie, removeCategorie, changeModifCategorie, addFormule, changeMargeErreurCategorie, undoFormule, changeNomFormule, changeFormule, changeModifFormule, removeFormule, changePositionFormule } = formuleSlice.actions;

export const selectFormule = state => state.formule.tab;

export const selectTabFormule = index => state => state.formule.tab[index].tabFormule;

export const selectActualise = state => state.formule.actualise;

export default formuleSlice.reducer;
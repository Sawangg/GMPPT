import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesFormulesAPI, addCategorieFormuleAPI } from "../utils/api.js";

export const getCategoriesFormules = createAsyncThunk(
  "formule/getCategoriesFormules", 
  async (idModele) => {
    const response = await getCategoriesFormulesAPI(idModele);
    return response.data;
  }
);

export const enregistrerFormules = createAsyncThunk(
  "formule/enregistrerFormules",
  async (props) => {
    const response = await addCategorieFormuleAPI(props.idModele, props.tab);
    return response.data;
  }
);

export const formuleSlice = createSlice({
  name: "formule",
  initialState: {
    tab: [
      {
        nom: "",
        modif: true,
        tabFormule: [
          {
            nomFormule: "",
            formule: "",
            modif: true,
          },
        ],
        saveTabFormule: [
          {
            nomFormule: "",
            formule: "",
            modif: true,
          },
        ],
      },
    ],
    actualise: false,
    enregistre: false,
  },
  reducers: {
    addCategorie: (state) => {
      state.tab.push({
        nom: "",
        modif: true,
        tabFormule: [
          {
            nomFormule: "",
            formule: "",
            modif: true,
          },
        ],
      });
      state.enregistre = false;
    },
    changeNom: (state, action) => {
      state.tab[action.payload.index].nom = action.payload.event;
      state.enregistre = false;
    },
    removeCategorie: (state, action) => {
      state.tab.splice(action.payload, 1);
      state.enregistre = false;
    },
    changeModifCategorie: (state, action) => {
      state.tab[action.payload].modif = !state.tab[action.payload].modif;
      state.enregistre = false;
    },
    addFormule: (state, action) => {
      state.tab[action.payload].tabFormule[
        state.tab[action.payload].tabFormule.length - 1
      ].modif = false;
      state.tab[action.payload].tabFormule.push({
        nomFormule: "",
        formule: "",
        modif: true,
      });
      state.enregistre = false;
    },
    changeNomFormule: (state, action) => {
      const { indexCategorie, indexFormule, event } = action.payload;
      state.tab[indexCategorie].tabFormule[indexFormule].nomFormule = event;
      state.enregistre = false;
    },
    changeFormule: (state, action) => {
      const { indexCategorie, indexFormule, event } = action.payload;
      state.tab[indexCategorie].tabFormule[indexFormule].formule = event;
      state.enregistre = false;
    },
    changeModifFormule: (state, action) => {
      const { indexCategorie, indexFormule } = action.payload;
      state.tab[indexCategorie].tabFormule[indexFormule].modif = !state.tab[
        indexCategorie
      ].tabFormule[indexFormule].modif;
      state.enregistre = false;
    },
    removeFormule: (state, action) => {
      const { indexCategorie, indexFormule } = action.payload;
      state.tab[indexCategorie].saveTabFormule = [
        ...state.tab[indexCategorie].tabFormule,
      ];
      state.tab[indexCategorie].tabFormule.splice(indexFormule, 1);
      state.enregistre = false;
    },
    undoFormule: (state, action) => {
      state.tab[action.payload].tabFormule =
        state.tab[action.payload].saveTabFormule;
      state.enregistre = false;
    },
    changePositionFormule: (state, action) => {
      const { indexCategorie, indexFormule, up } = action.payload;
      if (
        (up && indexFormule > 0) ||
        (!up && indexFormule < state.tab[indexCategorie].tabFormule.length - 1)
      ) {
        let value = up ? -1 : 1;
        let save = state.tab[indexCategorie].tabFormule[indexFormule + value];
        state.tab[indexCategorie].tabFormule[indexFormule + value] = state.tab[indexCategorie].tabFormule[indexFormule];
        state.tab[indexCategorie].tabFormule[indexFormule] = save;
      }
      state.enregistre = false;
    },
    enregistre: (state) => {
      state.enregistre = true;
    },
  },
  extraReducers: {
    [getCategoriesFormules.pending]: (state) => {
      state.actualise = false;
    },
    [getCategoriesFormules.rejected]: (state, action) => {
      if (action.error.message === "Request failed with status code 404") {
        state.tab = [
          {
            nom: "",
            modif: true,
            tabFormule: [
              {
                nomFormule: "",
                formule: "",
                modif: true,
              },
            ],
            saveTabFormule: [
              {
                nomFormule: "",
                formule: "",
                modif: true,
              },
            ],
          },
        ];
        state.actualise = true;
        state.enregistre = true;
      }
    },
    [getCategoriesFormules.fulfilled]: (state, action) => {
        let array = [];
        action.payload.forEach((element) => {
          let tabFormule = [];
          element.formules.forEach((elemForm) => {
            tabFormule.push({
              nomFormule: elemForm.nom,
              formule: elemForm.contenu,
              modif: false,
            });
          });
          array.push({
            nom: element.nom,
            modif: false,
            tabFormule: tabFormule,
            saveTabFormule: tabFormule,
          });
        });
        state.actualise = true;
        state.enregistre = true;
        state.tab = array;
    },
    [enregistrerFormules.fulfilled]: (state) => {
      state.enregistre = true;
    },
  },
});

export const { setActualise, changeNom, addCategorie, removeCategorie, changeModifCategorie, addFormule, undoFormule, changeNomFormule, changeFormule, changeModifFormule, removeFormule, changePositionFormule } = formuleSlice.actions;

export const selectFormule = (state) => state.formule.tab;

export const selectTabFormule = (index) => (state) => state.formule.tab[index].tabFormule;

export const selectActualiseFormule = (state) => state.formule.actualise;

export const selectEnregistreFormule = (state) => state.formule.enregistre;

export default formuleSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSujetAPI, setQuestionsAPI } from "../utils/api.js";

export const getSujet = createAsyncThunk("enonce/getSujet", async (idModele) => {
    const response = await getSujetAPI(idModele);
    return response.data;
});

export const setQuestions = createAsyncThunk("enonce/setQuestions", async (props) => {
    const response = await setQuestionsAPI(props.idModele, props.enonce, props.tabQuestions);
    return response.data;
});

export const enoncesReducer = createSlice({
    name: "enonce",
    initialState: {
        enonceContenu: "",
        question: [{
            contenu: undefined,
            reponse: [{
                selectCat: "",
                selectForm: "",
                margeErreur: 5,
                unite: [{
                    abr: "",
                    puissance: 1
                }],
            }],
        }],
        actualise: false,
        enregistre: false
    },
    reducers: {
        addQuestion: (state, action) => {
            state.question.push({
                contenu: "",
                reponse: [{
                    selectCat: 0,
                    selectForm: action.payload,
                    margeErreur: 5,
                    unite: [{
                        abr: "",
                        puissance: 1
                    }],
                }],
            });
        },
        removeQuestion: (state, action) => {
            state.question.splice(action.payload, 1);
            state.enregistre = false;
        },
        handleChangeQuestion: (state, action) => {
            state.question[action.payload.index].contenu = action.payload.contenu;
            state.enregistre = false;
        },
        handleChangeSelect: (state, action) => {
            state.question[action.payload.index].reponse = action.payload.reponse;
            state.enregistre = false;

        },
        handleChangeUnite: (state, action) => {
            state.question[action.payload.idQuestion].reponse[action.payload.idReponse].unite = action.payload.tabUnite;
            state.enregistre = false;
        },
        addReponse: (state, action) => {
            state.question[action.payload.id].reponse.push({
                selectCat: 0,
                selectForm: action.payload.formule1,
                margeErreur: 5,
                unite: [{ abr: "", puissance: 1 }],
            });
            state.enregistre = false;
        },
        enregistre: (state) => {
            state.enregistre = true;
        },
        handleChangeCat: (state, action) => {
            state.question[action.payload.idQuestion].reponse[action.payload.idReponse].selectCat = action.payload.value;
            state.question[action.payload.idQuestion].reponse[action.payload.idReponse].selectForm = action.payload.formule1;
            state.enregistre = false;
        },
        handleChangeForm: (state, action) => {
            state.question[action.payload.idQuestion].reponse[action.payload.idReponse].selectForm = action.payload.value;
            state.enregistre = false;
        },
        handleChangeMargeErreur: (state, action) => {
            state.question[action.payload.indexQuestion].reponse[action.payload.indexReponse].margeErreur = action.payload.marge;
            state.enregistre = false;
        },
        handleChangeEnonce: (state, action) => {
            state.enonceContenu = action.payload;
            state.enregistre = false;
        },
        removeReponse: (state, action) => {
            state.question[action.payload.indexQuestion].reponse.splice(action.payload.indexReponse, 1);
            state.enregistre = false;
        }
    },

    extraReducers: {
        [getSujet.pending]: (state) => {
            state.actualise = false;
        },
        [getSujet.rejected]: (state) => {
            state.enonceContenu = "";
            state.question = [{
                contenu: "",
                reponse: [{
                    selectCat: "",
                    selectForm: "",
                    margeErreur: 5,
                    unite: [{ abr: "", puissance: 1 }],
                }],
            }];
            state.actualise = true;
            state.enregistre = true;
        },
        [getSujet.fulfilled]: (state, action) => {
            let question = [];
            state.enonceContenu = action.payload.enonce;
            action.payload.questions.forEach(element => {
                let reponse = [];
                element.reponses.forEach(elem => {
                    reponse.push({
                        selectCat: elem.selectCat,
                        selectForm: elem.selectForm,
                        margeErreur: elem.margeErreur,
                        unite: elem.unite
                    });
                });
                question.push({ contenu: element.contenu, reponse: reponse });
            });
            state.question = question;
            state.actualise = true;
            state.enregistre = true;
        },
        [setQuestions.fulfilled]: (state) => {
            state.enregistre = true;
        },
    },
});

export const { handleChangeEnonce, removeReponse, handleChangeMargeErreur, addQuestion, removeQuestion, handleChangeQuestion, handleChangeSelect, addReponse, handleChangeUnite, handleChangeCat, handleChangeForm } = enoncesReducer.actions;

export const selectEnonce = (state) => state.enonce;

export const selectTabReponse = (index) => (state) => state.enonce.question[index].reponse;

export const selectActualiseEnonce = (state) => state.enonce.actualise;

export const selectEnregistreEnonce = (state) => state.enonce.enregistre;

export const selectMargeErreur = (indexQuestion, indexReponse) => (state) => state.enonce.question[indexQuestion].reponse[indexReponse].margeErreur;

export const selectTabQuestionLength = (state) => state.enonce.question.length;

export const selectContenuEnonce = (state) => state.enonce.enonceContenu;

export const selectQuestion = (index) => (state) => state.enonce.question[index].contenu;

export const selectReponse = (indexQuestion, indexReponse) => (state) => state.enonce.question[indexQuestion].reponse[indexReponse];

export const selectReponseLength = (index) => (state) => state.enonce.question[index].reponse.length;

export default enoncesReducer.reducer;
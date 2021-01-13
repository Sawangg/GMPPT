import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { getQuestionsAPI, setQuestionsAPI } from "../utils/api.js";

export const getQuestions = createAsyncThunk(
    "enonce/getQuestions",
    async (idModele) => {
        const response = await getQuestionsAPI(idModele);
        return response.data;
    }
);

export const setQuestions = createAsyncThunk(
    "enonce/setQuestions",
    async (props) => {
        const response = await setQuestionsAPI(props.idModele, props.enonce, props.tabQuestions);
        return response.data;
    }
);

export const enoncesReducer = createSlice({
    name: "enonce",
    initialState: {
        enonceContenu : "",
        question: [{
            contenu: "",
            reponse: [{
                selectCat : "",
                selectForm: "",
                margeErreur : 5,
                unite: [{abr : " ", puissance : 1 }],
            }],
        }],
        actualise: false,
        enregistre: false,
    },
    reducers: {
        addQuestion: (state) => {
            state.question.push({
                contenu: "",
                reponse: [{
                    selectCat : "",
                    selectForm: "",
                    margeErreur : 5,
                    unite: [{abr : " ", puissance : 1 }],
                }],
            });
        },
        deleteQuestion: (state, action) => {
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
        addReponse : (state, action) => {
            state.question[action.payload].reponse.push({
                selectCat : "",
                selectForm: "",
                margeErreur : 5,
                unite: [{abr : " ", puissance : 1 }],
            });
            state.enregistre = false;
        },
        enregistre: (state) => {
            state.enregistre = true;
        },
        handleChangeCat: (state, action) =>{
            state.question[action.payload.idQuestion].reponse[action.payload.idReponse].selectCat = action.payload.value;
            state.enregistre = false;
        },
        handleChangeForm: (state, action) => {
            state.question[action.payload.idQuestion].reponse[action.payload.idReponse].selectForm = action.payload.value;
            state.enregistre = false;
        },
        handleChangeMargeErreur: (state, action) =>{
            state.question[action.payload.indexQuestion].reponse[action.payload.indexReponse].margeErreur = action.payload.marge;
            state.enregistre = false;
        },
        handleChangeEnonce: (state, action) => {
            state.enonceContenu = action.payload;
            state.enregistre = false;
        },
        removeReponse: (state, action) => {
            console.log(action.payload)
            state.question[action.payload.indexQuestion].reponse.splice(action.payload.indexReponse, 1);
        }
    },
    extraReducers: {
        [getQuestions.pending]: (state) => {
            state.actualise = false;
        },
        [getQuestions.rejected]: (state) => {
            state.enonceContenu = "";
            state.question = [{
                contenu: "",
                reponse: [{
                    selectCat : "",
                    selectForm: "",
                    margeErreur : 5,
                    unite: [{abr : " ", puissance : 1 }],
                }],
            }];
            state.actualise = true;
            state.enregistre = true;
        },
        [getQuestions.fulfilled]: (state, action) => {
            let question = [];
            let reponse = [];
            state.enonceContenu = action.payload.enonce;
            action.payload.questions.forEach(element => {
                element.reponses.forEach(elem => {
                    reponse.push({ 
                        selectCat : elem.selectCat,
                        selectForm: elem.selectForm,
                        margeErreur : elem.margeErreur,
                        unite: elem.unite
                    });
                });
                question.push({contenu : element.contenu, reponse : reponse});
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

export const { handleChangeEnonce, removeReponse, handleChangeMargeErreur, addQuestion, deleteQuestion, handleChangeQuestion, handleChangeSelect, addReponse, handleChangeUnite, handleChangeCat, handleChangeForm } = enoncesReducer.actions

export const selectEnonce = (state) => state.enonce;

export const selectTabReponse = (index) => (state) => state.enonce.question[index].reponse; 

export const selectActualiseEnonce = (state) => state.enonce.actualise;

export const selectEnregistre = (state) => state.enonce.enregistre;

export const selectMargeErreur = (indexQuestion, indexReponse) => (state) => state.enonce.question[indexQuestion].reponse[indexReponse].margeErreur;

export default enoncesReducer.reducer;
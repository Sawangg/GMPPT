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
        console.log(props);
        const response = await setQuestionsAPI(props.idModele, props.enonce, props.tabQuestions);
        return response.data;
    }
);

export const enoncesReducer = createSlice({
    name: "enonce",
    initialState: {
        question: [{
            contenu: "",
            reponse: [{
                selectCat : "",
                selectForm: "",
                unite: [{unite: "", abr : ""}],
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
                    unite: [{unite: "", abr : ""}],
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
        addReponse : (state, action) => {
            state.question[action.payload].reponse.push({
                selectCat : "",
                selectForm: "",
                unite: [{unite: "", abr : ""}],
            });
        },
        enregistre: (state) => {
            state.enregistre = true;
        },
        handleChangeCat: (state, action) =>{
            state.question[action.payload.idQuestion].reponse[action.payload.idReponse].selectCat = action.payload.value;
            console.log(action.payload)
        },
        handleChangeForm: (state, action) => {
            state.question[action.payload.idQuestion].reponse[action.payload.idReponse].selectForm = action.payload.value;
        }
    },
    extraReducers: {
        [getQuestions.pending]: (state) => {
            state.actualise = false;
        },
        [getQuestions.rejected]: (state) => {
            state.question = [{
                contenu: "",
                reponse: [{
                    selectCat : "",
                    selectForm: "",
                    unite: [{unite: "", abr : ""}],
                }],
            }];
            state.actualise = true;
            state.enregistre = true;
        },
        [getQuestions.fulfilled]: (state, action) => {
            console.log(action.payload);
            // state.contenu = action.payload.contenu;
            // state.question = array;
            //A FAIRE
            state.actualise = true;
        },
        [setQuestions.fulfilled]: (state) => {
            state.enregistre = true;
        },
    },
});

export const { handleChangeEnonce, addQuestion, deleteQuestion, handleChangeQuestion, handleChangeSelect, addReponse, handleChangeCat, handleChangeForm } = enoncesReducer.actions

export const selectEnonce = (state) => state.enonce;

export const selectTabReponse = (index) => (state) => state.enonce.question[index].reponse; 

export const selectActualise = (state) => state.enonce.actualise;

export const selectEnregistre = (state) => state.enonce.enregistre;

export default enoncesReducer.reducer;
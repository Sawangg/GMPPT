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
        enonceContenu: "cocou",
        question: [{
            contenu: "",
            reponse: [{
                nomFormule: "",
                unite: [{
                    valeur: "",
                }],
            }],
        }],
        actualise: false,
        enregistre: false,
    },
    reducers: {
        handleChangeEnonce: (state, action) => {
            state.enonceContenu = action.payload;
            console.log(action.payload)
        },

        addQuestion: (state) => {
            state.question.push({
                contenu: "",
                reponse: "",
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
        enregistre: (state) => {
            state.enregistre = true;
        },
    },
    extraReducers: {
        [getQuestions.pending]: (state) => {
            state.actualise = true;
            state.enregistre = false;
        },
        [getQuestions.rejected]: (state, action) => {
            if (action.error.status === "error") {
                state.enonceContenu = "";
                state.question = [{
                    contenu: "",
                    reponse: "",
                }];
                state.actualise = true;
                state.enregistre = false;
            }
            console.log("rejected");
        },
        [getQuestions.fulfilled]: (state, action) => {
            let array = [];
            console.log(action.payload);
            // .forEach((element) => {
            //     let t = {
            //         contenu: element.contenu,
            //         reponse: [],
            //     }
            //     array.push(t);

            // });
            state.contenu = action.payload.contenu;
            state.question = array;
            state.actualise = true;
            console.log("fulfilled");
        },
        [setQuestions.fulfilled]: (state) => {
            state.enregistre = true;

        },
    },
});

export const { handleChangeEnonce, addQuestion, deleteQuestion, handleChangeQuestion, handleChangeSelect } = enoncesReducer.actions

export const selectEnonce = (state) => state.enonce;

export const selectActualise = (state) => state.enonce.actualise;

export const selectEnregistre = (state) => state.enonce.enregistre;

export default enoncesReducer.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addEnonceAPI, getEnonceAPI} from "../utils/api.js";

export const getEnonce = createAsyncThunk(
    "enonce/getEnonce",
    async (idModele) => {
        const response = await getEnonceAPI(idModele);
        return response.data;
    }
);

export const setEnonce = createAsyncThunk(
    "enonce/setEnonce",
    async (enonce) => {
        const response = await addEnonceAPI(enonce.idModele, enonce.enonceContenu, enonce.question);
        return response.data;
    }
)

export const enoncesReducer = createSlice({
    name: "enonce",
    initialState: {
        enonceContenu: "",
        question: []
    },
    reducers: {
        handleChangeEnonce: (state, action) => {
            state.enonceContenu = action.payload;
        },

        addQuestion: (state) => {
            state.question.push({contenu: ""});
        },

        deleteQuestion: (state, action) => {
            state.question.splice(action.payload, 1);
        },

        handleChangeQuestion: (state, action) => {
            state.question[action.payload.index].contenu = action.payload.contenu;
        },
    },
    extraReducers: {
        [getEnonce.pending]: (state) => {

        },
        [getEnonce.rejected]: (state, action) => {
            if (action.error.message === "Request failed with status code 404") {
                state.enonceContenu = "";
                state.question = [];
            }
        },
        [getEnonce.fulfilled]: (state, action) => {
            let array = [];
            action.payload.forEach((element) => {
                array.push({
                    contenu: element.contenu,
                });
            });
            state.contenu = action.payload.contenu;
            state.question = array;
        },
        [setEnonce.fulfilled]: (state) => {

        },
    },
});

export const {
    handleChangeEnonce,
    addQuestion,
    deleteQuestion,
    handleChangeQuestion,
} = enoncesReducer.actions

export const selectEnonce = (state) => state.enonce;

export default enoncesReducer.reducer;
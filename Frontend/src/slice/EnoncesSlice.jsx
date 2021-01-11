import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addEnonceAPI, getEnonceAPI} from "../utils/api.js";

export const getEnonce = createAsyncThunk(
    "enonce/getEnonce",
    async (idModele) => {
        const response = await getEnonceAPI(idModele);
        return true;
    }
);

export const setEnonce = createAsyncThunk(
    "enonce/setEnonce",
    async (enonce) => {
        const response = await addEnonceAPI(enonce.idModele, enonce.enonceContenu, enonce.question);
        return true;
    }
)

export const enoncesReducer = createSlice({
    name: "enonce",
    initialState: {
        enonceContenu: "",
        question: [{
            contenu: "",
            reponse: "",
        }],
        actualise: false,
    },
    reducers: {
        handleChangeEnonce: (state, action) => {
            state.enonceContenu = action.payload;
        },

        addQuestion: (state) => {
            state.question.push({
                contenu: "",
                reponse: "",
            });
        },

        deleteQuestion: (state, action) => {
            state.question.splice(action.payload, 1);
        },

        handleChangeQuestion: (state, action) => {
            state.question[action.payload.index].contenu = action.payload.contenu;
        },

        handleChangeSelect: (state, action) => {
            state.question[action.payload.index].reponse = action.payload.reponse;
        }
    },
    extraReducers: {
        [getEnonce.pending]: (state) => {
            state.actualise = true;
        },
        /*[getEnonce.rejected]: (state, action) => {
            if (action.error.message === "Request failed with status code 404") {
                state.enonceContenu = "";
                state.question = [{
                    contenu: "",
                    reponse: "",
                }];
                state.actualise = true;
            }
            console.log("rejected");
        },
        [getEnonce.fulfilled]: (state, action) => {
            let array = [];
            action.payload.forEach((element) => {
                array.push({
                    contenu: element.contenu,
                    reponse: element.reponse,
                });
            });
            state.contenu = action.payload.contenu;
            state.question = array;
            state.actualise = true;
            console.log("fulfilled");
        },
        [setEnonce.fulfilled]: (state) => {
        },*/
    },
});

export const {
    handleChangeEnonce,
    addQuestion,
    deleteQuestion,
    handleChangeQuestion,
    handleChangeSelect,
} = enoncesReducer.actions

export const selectEnonce = (state) => state.enonce;
export const selectActualise = (state) => state.enonce.actualise;

export default enoncesReducer.reducer;

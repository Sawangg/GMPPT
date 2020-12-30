import {createSlice} from "@reduxjs/toolkit";

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
        }
    }
);

export const {
    handleChangeEnonce,
    addQuestion,
    deleteQuestion,
    handleChangeQuestion,
} = enoncesReducer.actions

export const selectEnonce = (state) => state.enonce;

export default enoncesReducer.reducer;
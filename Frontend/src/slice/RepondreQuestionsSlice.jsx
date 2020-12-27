import { createSlice } from '@reduxjs/toolkit';

export const reponseSlice = createSlice({
    name: "reponse",
    initialState: { 
        tabQuestions : [{
            indexQuestion : 0,
            enonce : "Énoncé de question avec plusieurs réponses",
            nbMaxReponses : 5,
            tabReponses : [{
                value : '',
                tabUnite : [{
                    id : 0,
                    puissance : 1
                }]
            }]
        }],
    enregi : 1},
    reducers: {
        addReponse : (state, action) =>{
            state.tabQuestions[action.payload].tabReponses.push({
                value : '',
                tabUnite : [{
                    id : 0,
                    puissance : 1
                }]
            })
        },
        changeReponse : (state, action) =>{
            let {indexQuestion, indexReponse, value} = action.payload
            if(!isNaN(value)){
                state.tabQuestions[indexQuestion].tabReponses[indexReponse].value = value
            }
        },
        deleteReponse : (state, action) => {
            let {indexQuestion, indexReponse} = action.payload
            if(state.tabQuestions[indexQuestion].tabReponses.length > 1){
                state.tabQuestions[indexQuestion].tabReponses.splice(indexReponse, 1);
            }
        },
        changeUniteReponse : (state, action) =>{
            let {indexQuestion, indexReponse, newTab} = action.payload
            state.tabQuestions[indexQuestion].tabReponses[indexReponse].tabUnite = newTab
        }
    },
    extraReducers: {}
});

export const { addReponse, changeReponse, deleteReponse, changeUniteReponse } = reponseSlice.actions

export const selectAll = state => state.reponse.tabQuestions

export const peutSupprimer = indexQuestion => state => state.reponse.tabQuestions[indexQuestion].tabReponses.length > 1

export default reponseSlice.reducer;
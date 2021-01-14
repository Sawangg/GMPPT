import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getQuestionsAPI } from "../utils/api.js";
import _ from "lodash"

export const getQuestions = createAsyncThunk("etudiant/getQuestions", async (idModele) => {
    const response = await getQuestionsAPI(idModele);
    return response.data;
});

export const reponseSlice = createSlice({
    name: "reponse",
    initialState: { 
        tabQuestions : [{
            indexQuestion : 0,
            enonce : "",
            nbMaxReponses : 5,
            tabReponses : [{
                value : "",
                tabUnite : [{
                    abr : " ",
                    puissance : 1
                }]
            }]
        }],
        sujet : "",
    },
    reducers: {

        //ajoute une réponse pour une question
        //paramètre : indexQuestion
        addReponse : (state, action) =>{
            let indexQuestion = action.payload
            let indexReponseAvantDernier = state.tabQuestions[action.payload].tabReponses.length - 1
            state.tabQuestions[indexQuestion].tabReponses.push({
                value : '',
                tabUnite : _.cloneDeep(state.tabQuestions[indexQuestion].tabReponses[indexReponseAvantDernier].tabUnite)
            })
        },

        //change la valeur d'une réponse pour une question
        //paramètres : indexQuestion, index Réponse, valeurReponse
        changeReponse : (state, action) =>{
            /*const reg = '#-?[1-9]*(\.[1-9]*)?(\*10\^[1-9]*)?#'
            const reg = '[a-z]'
            
            if(value.match(reg)){
                state.tabQuestions[indexQuestion].tabReponses[indexReponse].value = value
            }*/

            let {indexQuestion, indexReponse, value} = action.payload
            if(!isNaN(value) || value==='-'){
                state.tabQuestions[indexQuestion].tabReponses[indexReponse].value = value
            }
        },

        //supprime une réponse pour une question
        //paramètres : indexQuestion, index Réponse
        deleteReponse : (state, action) => {
            let {indexQuestion, indexReponse} = action.payload
            if(state.tabQuestions[indexQuestion].tabReponses.length > 1){
                state.tabQuestions[indexQuestion].tabReponses.splice(indexReponse, 1);
            }
        },

        //change les tableaux d'unités de toutes les réponses assignées à une question
        //paramètres : indexQuestion, tabUnité
        changeUniteForAllReponses : (state, action) =>{
            let {indexQuestion, tab} = action.payload 
            state.tabQuestions[indexQuestion].tabReponses.map((i) => 
                i.tabUnite = _.cloneDeep(tab)
            )
        },

        //change le tableau d'unité en entier d'une réponse
        //paramètres : indexQuestion, indexReponse, tabUnité
        changeUniteReponses :(state, action) =>{
            let {indexQuestion, indexReponse, tab} = action.payload
            state.tabQuestions[indexQuestion].tabReponses[indexReponse].tabUnite = tab
        },

        //change le tableau d'unités d'une réponse
        //paramètres : indexQuestion, indexReponse, tabUnité
        setUnite : (state, action) =>{
            let {indexQuestion, indexReponse, newTab} = action.payload
            state.tabQuestions[indexQuestion].tabReponses[indexReponse].tabUnite = newTab
        }
    },
    extraReducers: {
        [getQuestions.fulfilled]: (state, action) => {
            state.sujet = action.payload.enonce;
            state.tabQuestions = []
            action.payload.questions.forEach((question, index) => {
                state.tabQuestions.push({
                    indexQuestion : index,
                    enonce : question.contenu,
                    nbMaxReponses : 5,
                    tabReponses : [{
                        value : "",
                        tabUnite : [{
                            abr : " ",
                            puissance : 1
                        }]
                    }]
                });
            });
        },
    }
})

export const { addReponse, changeReponse, deleteReponse, changeUniteReponses, 
    changeUniteForAllReponses, setUnite} = reponseSlice.actions

//renvoie l'ensemble d'un tableau de questions
export const selectAllQuestions = state => state.reponse.tabQuestions

//renvoie le sujet en string d'html
export const selectSujet = state => state.reponse.sujet

//renvoie un bouleen pour dire si l'on peut supprimer une réponse pour une question
export const peutSupprimer = indexQuestion => state => state.reponse.tabQuestions[indexQuestion].tabReponses.length > 1

export default reponseSlice.reducer;
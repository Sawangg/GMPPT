import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSujetAPI, etudiantVariablesAPI, etudiantReponsesNewAPI, getModele3DAPI} from "../utils/api.js";
import _ from "lodash"

export const getSujet = createAsyncThunk("etudiant/getSujet", 
async (idModele) => {
    const response = await getSujetAPI(idModele);
    return response.data;
});

export const enregistrerReponses = createAsyncThunk("etudiant/enregistrerReponses", 
async (tabQuestions) => {
    const response = await etudiantReponsesNewAPI(tabQuestions);
    return response.data;
});

export const etudiantVariables = createAsyncThunk("etudiant/etudiantVariables", 
async (idAuth) => {
    const response = await etudiantVariablesAPI(idAuth);
    return response.data;
});

export const getModele3D = createAsyncThunk("etudiant/getModele3D", 
async (idArchi) => {
    const response = await getModele3DAPI(idArchi);
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
        sujetEnregistre : false,
        id_auth : ""
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
        [getSujet.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.tabQuestions = []
            const reponsesDefault = [{
                value : "",
                tabUnite : [{
                    abr : " ",
                    puissance : 1
                }]
            }]
            state.sujet = action.payload.enonce;
            action.payload.questions.forEach((question) => {
                const reponses = question.reponses === undefined ? reponsesDefault : question.reponses;
                state.tabQuestions.push({
                    indexQuestion : question.id_question,
                    enonce : question.contenu,
                    nbMaxReponses : 5,
                    tabReponses : reponses
                });
            });
            state.id_auth = action.payload.id_auth;
            state.sujetEnregistre = true;
        },
        [enregistrerReponses.fulfilled] : (state, action) => {

        },
        [etudiantVariables.fulfilled] : (state, action) => {
            let enonce = state.sujet;
            action.payload.forEach(variable => {
                const regx = new RegExp("\\$\\{\\s*" + variable.nom + "\\s*\\}", 'g');
                enonce = enonce.replaceAll(regx, variable.valeur);
                state.tabQuestions.forEach(question => {
                    question.enonce = question.enonce.replaceAll(regx, variable.valeur)
                });
            });
            state.sujet = enonce;
        },
        [etudiantVariables.rejected] : (state, action) => {

        },
        [getModele3D.rejected] : (state, action) => {
            console.log(action.payload)
        },
        [getModele3D.fulfilled] : (state, action) => {
            console.log(action.payload)
        },
    }
})

export const { addReponse, changeReponse, deleteReponse, changeUniteReponses, changeUniteForAllReponses, setUnite } = reponseSlice.actions;

//renvoie l'ensemble d'un tableau de questions
export const selectReponses = state => state.reponse;

//renvoie un bouleen pour dire si l'on peut supprimer une réponse pour une question
export const peutSupprimer = indexQuestion => state => state.reponse.tabQuestions[indexQuestion].tabReponses.length > 1;

export const selectSujetEnregistre = state => state.reponse.sujetEnregistre;

export default reponseSlice.reducer;
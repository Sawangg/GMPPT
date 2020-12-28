import { createSlice } from '@reduxjs/toolkit';
import _ from "lodash"

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
            let {indexQuestion, indexReponse, value} = action.payload
            if(!isNaN(value)){
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

        //Partie unité : 'Kg^3' est une partie d'unité de 'm^2.Kg^3'
        //caractérisé par un    id (identifiant de l'unité dans le tableau unites)
        //                      puissance

        //remet le tableau d'unité d'une réponse à un seul élément : {id : 0 (sans-unité), puissance : 1}
        //paramètres : indexQuestion, indexReponse
        remettreAZero : (state, action) => {
            let {indexQuestion, indexReponse} = action.payload
            state.tabQuestions[indexQuestion].tabReponses[indexReponse].tabUnite = [{id:0, puissance:1}]
        },

        //change la valeur d'une partie d'unité pour une réponse
        //paramètres : indexQuestion, indexRéponse, indexUnite, idUnite
        changePartieUnite : (state, action) =>{
            let {indexQuestion, indexReponse, indexUnite, value} = action.payload
            state.tabQuestions[indexQuestion].tabReponses[indexReponse].tabUnite[indexUnite].id = value
        },

        //ajoute une nouvelle partie d'unité à la fin de l'unité d'une réponse
        //paramètres : indexQuestion, indexRéponse
        //valeur de la nouvelle partie : {id : 0 (sans-unité), puissance : 1}
        addPartieUnite : (state, action) =>{
            let {indexQuestion, indexReponse} = action.payload
            state.tabQuestions[indexQuestion].tabReponses[indexReponse].tabUnite.push(
                {
                    id : 0,
                    puissance : 1
                }
            )
        },

        //supprime une partie d'unité suivant un index
        //paramètres : indexQuestion, indexRéponse, indexUnite
        deletePartieUnite : (state, action) =>{
            let {indexQuestion, indexReponse, indexUnite} = action.payload
            state.tabQuestions[indexQuestion].tabReponses[indexReponse].tabUnite.splice(indexUnite, 1)
        },

        //change la puissance pour une partie d'unité
        //paramètres : indexQuestion, indexReponse, indexUnite, puissanceValeur
        //fait en sorte de ne prendre en considération soit :   un nombre
        //                                                      le caractère '-'
        changePuissancePartieUnite : (state, action) =>{
            let {indexQuestion, indexReponse, indexUnite, value} = action.payload
            if((!isNaN(value)&& Math.abs(value) < 100 ) || value==='-' ){
                state.tabQuestions[indexQuestion].tabReponses[indexReponse].tabUnite[indexUnite].puissance = value
            }
        },
    },
    extraReducers: {}
})

export const { addReponse, remettreAZero, changeReponse, deleteReponse, changePartieUnite, addPartieUnite, 
    deletePartieUnite, changePuissancePartieUnite, changeUniteReponses, changeUniteForAllReponses } = reponseSlice.actions

//renvoie l'ensemble d'un tableau de questions
export const selectAll = state => state.reponse.tabQuestions

//renvoie un bouleen pour dire si l'on peut supprimer une réponse pour une question
export const peutSupprimer = indexQuestion => state => state.reponse.tabQuestions[indexQuestion].tabReponses.length > 1

export default reponseSlice.reducer;
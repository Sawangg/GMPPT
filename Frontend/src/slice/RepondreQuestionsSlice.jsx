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
        sujet : "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt leo est, in placerat ex cursus id. In malesuada scelerisque leo, ut pharetra ligula venenatis laoreet. Duis in elementum est. Ut aliquam diam ultrices, sagittis nibh sit amet, <b> tincidunt ipsum </b>. Aliquam ac mauris dignissim, porttitor urna in, lacinia urna. Donec rhoncus consectetur eros ac ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc commodo a enim ac ultricies. Vestibulum egestas molestie urna, in posuere odio tempus sit amet. Morbi facilisis sit amet dolor non ultrices. Donec dapibus commodo justo ac tempus. In hac habitasse platea dictumst. Curabitur ultricies iaculis lorem nec interdum. Etiam vel odio ligula. Suspendisse vestibulum nisi et risus posuere varius. In hac habitasse platea dictumst.</p>",
        unites : [
            {index : 0, nom : "Sans unité", abrv : " "}, 
            {index : 1, nom : "Newton", abrv : "N"}, 
            {index : 2, nom : "Kilogamme", abrv: "Kg"},
        ],
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

        //supprime les itérations de Sans Unité (id : 0) qui ne sont pas utiles
        //paramètres : indexQuestion, indexReponse
        //si le tableau ne contient que des Sans unité, il n'en restera qu'un
        removeIterationsOfSansUnite : (state, action) =>{
            let {indexQuestion, indexReponse} = action.payload
            let newTab = _.remove(state.tabQuestions[indexQuestion].tabReponses[indexReponse].tabUnite, function(o){
                return o.id !== 0
            })
            
            if (newTab.length === 0 ){
                newTab.push({
                    id : 0,
                    puissance : 1
                })
            }
            state.tabQuestions[indexQuestion].tabReponses[indexReponse].tabUnite = newTab
        }
    },
    extraReducers: {}
})

export const { addReponse, remettreAZero, changeReponse, deleteReponse, changePartieUnite, addPartieUnite, 
    deletePartieUnite, changePuissancePartieUnite, changeUniteReponses, changeUniteForAllReponses,
    removeIterationsOfSansUnite } = reponseSlice.actions

//renvoie l'ensemble d'un tableau de questions
export const selectAllQuestions = state => state.reponse.tabQuestions

//renvoie le tableau des unités possibles
export const selectUnites = state => state.reponse.unites

//renvoie le sujet en string d'html
export const selectSujet = state => state.reponse.sujet

//renvoie un bouleen pour dire si l'on peut supprimer une réponse pour une question
export const peutSupprimer = indexQuestion => state => state.reponse.tabQuestions[indexQuestion].tabReponses.length > 1

export default reponseSlice.reducer;
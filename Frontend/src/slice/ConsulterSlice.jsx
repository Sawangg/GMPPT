import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReponsesCorrigees, getEssaisEtudiant } from "../utils/api.js";
import _ from 'lodash'

export const getReponsesCorDB = createAsyncThunk("correction/getReponsesCorDB", 
async (props) => {
    const response = await getReponsesCorrigees(props.idPromo, props.idEtudiant);
    return response.data;
}) 

export const getEssaisDB = createAsyncThunk("correction/getEssaisDB", 
async (props) => {
    const response = await getEssaisEtudiant(props.idEtudiant);
    return response.data;
}) 

export const consulterSlice = createSlice({
    name: 'consulter',
    initialState: {
        etudiant : {
            id_promo : undefined,
            nom : "",
            prenom : "",
            id_etudiant : undefined,
        },
        tabEssais : undefined
        /*[{
            corrige : false,
            dateEssai : "01/01/2020",
            tabQuestions : [{
                justif : "",
                commentProf : "",
                note : "",
                num : 1,
                tabReponses : [{
                    justeApp : true, //reponse juste d'après l'application
                    justeProf : false, //reponse juste d'après le professeur
                    ecart : "",
                    value : "0",
                    unite : "",
                }]
            }]
        }]*/,
        tabReponsesJustes : undefined
        /*[{
            contenu : "",
            num : 1,
            tabReponses : [{
                value : "0",
                tabUnites : [{
                    abr : '',
                    puissance : '',
                }]
            }]
        }]*/,
        message : ""
    },
    reducers: {
        //change la reponse
        changeReponseJuste : (state, action) =>{
            let {indexE, indexQ, indexR} = action.payload
            state.tabEssais[indexE].tabQuestions[indexQ].tabReponses[indexR].justeProf =
                !state.tabEssais[indexE].tabQuestions[indexQ].tabReponses[indexR].justeProf
        },
        //importe un jeu d'essai pour faire des tests sur liste d'essais
        setEssaisForTest : (state) =>{
            state.tabEssais = [
                {dateEssai : "05/01/2020", corrige : false, tabQuestions : 
                    [{num : 1, justif : "Scotland Forever󠁧󠁢", commentProf : "", note : "",
                     tabReponses : 
                        [ {justeApp : true, justeProf : false, value : 12, 
                        unite : "N^12", ecart : "0.3"} ] 
                    }] 
                },
                {dateEssai : "05/01/2020", corrige : false, tabQuestions : 
                    [{num : 1, justif : "", commentProf : "", note : "",
                    tabReponses : 
                        [ {justeApp : false, justeProf : false, value : 11, 
                        unite : "N^11", ecart : "1.3"} ] 
                    }] 
                }
            ]
        },
        //change le message que le prof peut envoyer
        //paramètres : valeur du message
        changeMessage : (state, action) =>{
            state.message = action.payload
        },
        //change le commentaire d'une question dans un essai
        //paramètres : indexEssai, indexQuestion, commentaire
        changeCommentaire : (state, action) =>{
            let {indexE, indexQ, commentaire} = action.payload
            state.tabEssais[indexE].tabQuestions[indexQ].commentProf = commentaire
        },
        //change la note d'une question pour un essai
        //paramètres : indexEssai, indexQuestion, note
        changeNote : (state, action) => {
            let {indexE, indexQ, note} = action.payload
            if((!isNaN(note) && note<=100 && note>=0)|| note === ""){
                state.tabEssais[indexE].tabQuestions[indexQ].note = note
            }
        },
        //applique la correction en changeant le booléen revu
        //paramètres : indexEssai
        setCorrigeTrue : (state, action) =>{
            let indexE = action.payload
            state.tabEssais[indexE].corrige = true;
        },
        //met les infos des étudiants
        //paramètres : id, nom et prénom de l'étudiant
        setEtudiantConsulter : (state, action) =>{
            let {id_promo, id_etudiant, prenom, nom} = action.payload
            state.etudiant = {
                id_promo : id_promo,
                id_etudiant : id_etudiant,
                prenom : prenom,
                nom : nom,
            };
        }
        

    },
    extraReducers: {
        [getReponsesCorDB.fulfilled] : (state, action) => {
            state.tabReponsesJustes = []

            action.payload.forEach(question => {
                let index = state.tabReponsesJustes.push({
                    contenu : question.contenu,
                    num : question.id_question,
                    tabReponses : [],
                }) - 1

                question.reponses.forEach(reponse =>{
                    state.tabReponsesJustes[index].tabReponses.push({
                        value : reponse.value,
                        tabUnites : reponse.tabUnites
                    })
                })

            });
        },
        [getReponsesCorDB.rejected] : (state, action) => {
            console.log("reject")
        },
        [getEssaisDB.fulfilled] : (state, action) => {
            let essaisDB = action.payload;
            state.tabEssais = []

            //on regarde par rapport aux lignes données
            essaisDB.forEach(essaiQuestionDB => {
                //on recherche si un essai à cette date existe déjà
                let essai = _.find(state.tabEssais, (o) => { return o.dateEssai === essaiQuestionDB.date } )

                //si l'essai n'existe pas, on le crée
                if (essai === undefined){
                    let taille = state.tabEssais.push({
                        corrige : false,
                        dateEssai : essaiQuestionDB.date,
                        tabQuestions : []
                    });
                    essai = state.tabEssais[taille - 1];
                }

                //on push la question
                let indexQ = essai.tabQuestions.push({
                    justif : "",
                    commentProf : "",
                    note : "",
                    num : essaiQuestionDB.id_question,
                    tabReponses : []
                }) - 1

                let question = essai.tabQuestions[indexQ]

                //on push les réponses données par l'étudiant pour cette question
                essaiQuestionDB.reponses.forEach(reponseDB => {
                    question.tabReponses.push({
                        justeApp : true, 
                        justeProf : false,
                        ecart : "",
                        value : reponseDB.value,
                        unite : reponseDB.tabUnites,
                    })
                });

            });

        },
        [getEssaisDB.rejected] : (state, action) => {
            console.log("rejectEssais")
        }
    }
})


export const {setEssaisForTest, changeReponseJuste, changeMessage, changeCommentaire, 
    changeNote, setCorrigeTrue, setEtudiantConsulter } = consulterSlice.actions

//retourne tous le tableau des essais
export const selectEssais = state => state.consulter.tabEssais

//retourne le message que le professeur peut envoyer à l'étudiant
export const selectMessage = state => state.consulter.message

//retourne un essai particulier suivant un ID
export const selectEssaisWithID = index => state => state.consulter.tabEssais[index]

//retourne tous le tableau des reponses justes
export const selectReponsesJustes = state => state.consulter.tabReponsesJustes

//retourne l'objet étudiant
export const selectEtudiantConsulter = state => state.consulter.etudiant

//retourne le nombre de réponses dans le tableau des réponses justes
export const selectNbReponsesAAvoir = numQuestion => state =>{
    let indexQ = _.findIndex(state.consulter.tabReponsesJustes, function(o) { return o.num === numQuestion; })
    return state.consulter.tabReponsesJustes[indexQ].tabReponses.length
} 


export const selectUneQuestionJuste = numQuestion => state => _.find(state.consulter.tabReponsesJustes, (o) => {
    return o.num === numQuestion
})

export default consulterSlice.reducer;
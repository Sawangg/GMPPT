import { createSlice } from '@reduxjs/toolkit';

export const consulterSlice = createSlice({
    name: 'consulter',
    initialState: {
        tabEssais : [{
            dateEssai : "01/01/2020",
            tabQuestions : [{
                justif : "",
                commentProf : "",
                num : 1,
                tabReponses : [{
                    justeApp : true, //reponse juste d'après l'application
                    justeProf : false, //reponse juste d'après le professeur
                    ecart : "",
                    value : "0",
                    unite : "",
                }]
            }]
        }],
        tabReponsesJustes : [{
            num : 1,
            tabReponses : [{
                num : 1,
                tabUnites : [{
                    value : "0",
                    unite : "",
                }]
            }]
        }],
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
                {dateEssai : "05/01/2020", tabQuestions : 
                    [{num : 1, justif : "Scotland Forever󠁧󠁢", commentProf : "", tabReponses : 
                        [ {justeApp : true, justeProf : false, value : 12, 
                        unite : "N^12", ecart : "0.3"} ] 
                    }] 
                },
                {dateEssai : "05/01/2020", tabQuestions : 
                    [{num : 1, justif : "", commentProf : "", tabReponses : 
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
        }
        

    },
    extraReducers: {}
})


export const {setEssaisForTest, changeReponseJuste, changeMessage, changeCommentaire } = consulterSlice.actions

//retourne tous le tableau des essais
export const selectEssais = state => state.consulter.tabEssais

//retourne le message que le professeur peut envoyer à l'étudiant
export const selectMessage = state => state.consulter.message

//retourne un essai particulier suivant un ID
export const selectEssaisWithID = index => state => state.consulter.tabEssais[index]

//retourne tous le tableau des reponses justes
export const selectReponsesJustes = state => state.consulter.tabReponsesJustes

export default consulterSlice.reducer;
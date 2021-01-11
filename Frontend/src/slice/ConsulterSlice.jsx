import { createSlice } from '@reduxjs/toolkit';

export const consulterSlice = createSlice({
    name: 'consulter',
    initialState: {
        tabEssais : [{
            dateEssai : "01/01/2020",
            tabQuestions : [{
                justif : "",
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
        }]
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
                    [{num : 1, justif : "Scotland Forever󠁧󠁢", tabReponses : 
                        [ {justeApp : true, justeProf : false, value : 12, 
                        unite : "N^12", ecart : "0.3"} ] 
                    }] 
                },
                {dateEssai : "05/01/2020", justif : "",
                tabQuestions : 
                    [{num : 1, justif : "", tabReponses : 
                        [ {justeApp : false, justeProf : false, value : 11, 
                        unite : "N^11", ecart : "1.3"} ] 
                    }] 
                }
            ]
        },

        

    },
    extraReducers: {}
})


export const {setEssaisForTest, changeReponseJuste } = consulterSlice.actions

//retourne tous le tableau d'essai
export const selectEssais = state => state.consulter.tabEssais

//retourne un essai particulier suivant un ID
export const selectEssaisWithID = index => state => state.consulter.tabEssais[index]

//retourne tous le tableau des reponses justes
export const selectReponsesJustes = state => state.consulter.tabReponsesJustes

export default consulterSlice.reducer;
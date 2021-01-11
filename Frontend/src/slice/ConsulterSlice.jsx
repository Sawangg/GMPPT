import { createSlice } from '@reduxjs/toolkit';

export const correctionSlice = createSlice({
    name: 'consulter',
    initialState: {
        tabEssais : [{
            dateEssai : "01/01/2020",
            tabQuestion : [{
                num : 1,
                tabReponses : [{
                    juste : true,
                    value : "0",
                    unite : "",
                }]
            }]
        }],
        tabReponsesJustes : [{
            num : 1,
            tabReponses : [{
                num : 1,
                tabReponses : [{
                    value : "0",
                    unite : "",
                }]
            }]
        }]
    },
    reducers: {
        //importe un jeu d'essai pour faire des tests sur liste d'essais
        setEssaisForTest : (state) =>{
            state.tabEssais = [
                {dateEssai : "01/01/2020", tabQuestion : [{num : 1, tabReponses : [ {juste : true, value : 12, unite : "N^12"} ] }] },
                {dateEssai : "01/01/2020", tabQuestion : [{num : 1, tabReponses : [ {juste : false, value : 11, unite : "Kg"} ] }] },
            ]
        }

    },
    extraReducers: {}
})


export const {setEssaisForTest } = correctionSlice.actions

//retourne tous le tableau d'essai
export const selectEssais = state => state.consulter.tabEssais

//retourne tous le tableau des reponses justes
export const selectReponsesJustes = state => state.consulter.tabReponsesJustes

export default correctionSlice.reducer;
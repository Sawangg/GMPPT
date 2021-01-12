import { createSlice } from '@reduxjs/toolkit';

export const correctionSlice = createSlice({
    name: 'correction',
    initialState: {
        tabEtudiants : [{
            id : 0,
            nom : 'undefined',
            prenom : '',
            promo : '',
            avancement : '', // %
            note : '' // /20
        }],
    },
    reducers: {
        //importe un jeu d'essai pour faire des tests sur liste d'étudiants
        setEtudiantsForTests : (state) =>{
            state.tabEtudiants = [
                {id : 0, prenom : 'Florian', nom : 'TORIBIO', promo : 'Année 2', avancement : 10, note : 4},
                {id : 1, prenom : 'Raphael', nom : 'GAUTHIER', promo : 'Année 2', avancement : 80, note : 17},
                {id : 2, prenom : 'Léana', nom :'RENON', promo : 'Année 2', avancement : 50, note : 16},
                {id : 5, prenom : 'Léo', nom : 'MERCIER', promo : 'Année 2', avancement : 40, note : 11},
                {id : 9, prenom : 'Sylvain', nom : 'FREDIANI', promo : 'Année 2', avancement : 90, note : 16},
                {id : 15, prenom : 'Test', nom : 'TEST', promo : 'Année 1', avancement : 100, note :  20},
            ]
        },

    },
    extraReducers: {}
})


export const { setEtudiantsForTests } = correctionSlice.actions

//retourne tous le tableau d'étudiants
export const selectEtudiants = state => state.correction.tabEtudiants

export default correctionSlice.reducer;
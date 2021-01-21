import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getInfoPromoAPI} from "../utils/api.js";

export const getEtudiantsDB = createAsyncThunk("promo/getEtudiants", 
async (idPromo) => {
    const response = await getInfoPromoAPI(idPromo);
    return response.data;
});

export const correctionSlice = createSlice({
    name: 'correction',
    initialState: {
        tabEtudiants : [],
        idPromo : undefined,
        // tabEtudiants : [{
        //     id : 0,
        //     nom : 'undefined',
        //     prenom : '',
        //     promo : '',
        //     avancement : '', // %
        //     note : '' // /20
        // }],
    },
    reducers: {
        //importe un jeu d'essai pour faire des tests sur liste d'étudiants
        setEtudiantsForTests : (state) =>{
            state.tabEtudiants = [
                {id : 0, prenom : 'Florian', nom : 'TORIBIO', avancement : 10, note : 4},
                {id : 1, prenom : 'Raphael', nom : 'GAUTHIER', avancement : 80, note : 17},
                {id : 2, prenom : 'Léana', nom :'RENON', avancement : 50, note : 16},
                {id : 5, prenom : 'Léo', nom : 'MERCIER', avancement : 40, note : 11},
                {id : 9, prenom : 'Sylvain', nom : 'FREDIANI', avancement : 90, note : 16},
                {id : 15, prenom : 'Test', nom : 'TEST', avancement : 100, note :  20},
            ]
        },
        //change l'id de la promo que le prof est en train de corriger
        setIdPromo : (state, action) =>{
            state.idPromo = action.payload
        }

    },
    extraReducers: {
        [getEtudiantsDB.fulfilled] : (state, action) => {
            state.tabEtudiants = [];
            action.payload.forEach(etudiant => {
                state.tabEtudiants.push({
                    id : etudiant.id_auth,
                    prenom : etudiant.prenom,
                    nom : etudiant.nom,
                    avancement : 50,
                    note : 16
                })
            });
        }
    }
})


export const { setEtudiantsForTests, setIdPromo } = correctionSlice.actions

//retourne tous le tableau d'étudiants
export const selectEtudiants = state => state.correction.tabEtudiants

//retourne l'id de promo qui est en train de se faire corriger
export const selectIdPromo = state => state.correction.idPromo

export default correctionSlice.reducer;
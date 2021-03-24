import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getInfoPromoAPI, getAllPromoAPI, addPromoAPI, deletePromoAPI } from "../utils/api.js";

export const getEtudiantsPromo = createAsyncThunk("promo/getEtudiants", async (idPromo) => {
    const response = await getInfoPromoAPI(idPromo);
    return response.data;
});

export const getAllPromo = createAsyncThunk("promo/getAllPromo", async () => {
    const response = await getAllPromoAPI();
    return response.data;
});

export const addPromo = createAsyncThunk("promo/addPromo", async (nomPromo) => {
    const response = await addPromoAPI(nomPromo);
    return response.data;
});

export const removePromo = createAsyncThunk("promo/remove", async (select) => {
    const response = await deletePromoAPI(select.idPromo);
    return response.data;
});

export const promoSlice = createSlice({
    name: 'promo',
    initialState: {
        tabPromo: [],
        tabEtudiants: [],
        idPromo: undefined,
        enregistre: false
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
        //change l'id de la promo que le prof est en train de corriger
        setIdPromo: (state, action) => {
            state.idPromo = action.payload
        }
    },

    extraReducers: {
        [getEtudiantsPromo.fulfilled]: (state, action) => {
            state.tabEtudiants = [];
            action.payload.forEach(etudiant => {
                state.tabEtudiants.push({
                    id: etudiant.id_auth,
                    prenom: etudiant.prenom,
                    nom: etudiant.nom,
                    sujet: etudiant.id_architecture,
                });
            });
        },
        [getAllPromo.fulfilled]: (state, action) => {
            let promo = [];
            action.payload.forEach(elem => promo.push({ idPromo: elem.id_promo, nom: elem.nom_promo }));
            state.tabPromo = promo;
            state.enregistre = true;
        }
    }
});

export const { setIdPromo } = promoSlice.actions;

//retourne tous le tableau d'étudiants
export const selectEtudiants = state => state.promo.tabEtudiants;

//retourne l'id de promo qui est en train de se faire corriger
export const selectIdPromo = state => state.promo.idPromo;

export const selectPromo = state => state.promo.tabPromo;

export const selectEnregistrePromo = state => state.promo.enregistre;

export default promoSlice.reducer;
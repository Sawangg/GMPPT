import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllModeleAPI, deleteModeleAPI, addModeleAPI } from "../utils/api.js";

export const getModele = createAsyncThunk("modele/getAllModele", async () => {
	const response = await getAllModeleAPI();
	return response.data;
});

export const removeModele = createAsyncThunk("modele/removeModele", async (idModele) => {
	const response = await deleteModeleAPI(idModele);
	return response.data;
});

export const addNewModele = createAsyncThunk("modele/new", async (nom) => {
	const response = await addModeleAPI(nom);
	return response.data;
});

let myStorage = window.localStorage;

export const modeleSlice = createSlice({
	name: "modele",
	initialState: {
		tabName: [],
		idModeleSelectionne: myStorage.getItem("modele"),
		actualise: false
	},
	reducers: {
		selectionnerModele: (state, action) => {
			state.idModeleSelectionne = action.payload;
			myStorage.setItem("modele", action.payload);
		},
	},

	extraReducers: {
		[getModele.rejected]: (state) => {
			state.actualise = true;
		},
		[getModele.fulfilled]: (state, action) => {
			if (!state.actualise) {
				let array = action.payload;
				array.forEach((element) => {
					state.tabName[element.id_modele] = {
						nom: element.nom_modele,
						index: element.id_modele
					};
				});
				state.actualise = true;
				state.chargementSuppression = false;
				//si n'existe plus dans le cache ou avec une valeur éronnée
				if (!array.some(elem => Number(elem.id_modele) === Number(state.idModeleSelectionne))){
					state.idModeleSelectionne = array[0].id_modele;
					myStorage.setItem("modele", array[0].id_modele);
				}
			}
		},
		[removeModele.pending]: (state, action) => {
			state.tabName.splice(action.meta.arg, 1);
		},
		[addNewModele.fulfilled]: (state, action) => {
			state.tabName[action.payload.insertId] = {
				nom: action.meta.arg,
				index: action.payload.insertId,
			};
		},
	},
});

export const { selectionnerModele } = modeleSlice.actions;

export const selectModele = (state) => state.modele;

export const selectActualise = (state) => state.modele.actualise;

export const selectChargementSupp = (state) => state.modele.chargementSuppression;

export const selectIdModeleSelectionne = (state) => state.modele.idModeleSelectionne;

export const selectModeleActuel = (state) => state.modele.tabName[state.modele.idModeleSelectionne];

export default modeleSlice.reducer;
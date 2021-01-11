import { createSlice } from "@reduxjs/toolkit";

export const uniteSlice = createSlice({
  name: "unite",
  initialState: {
    tabName: [{nomComplet : undefined, abr : undefined}],
    actualise: false,
    chargementSuppression : false
  },
  reducers: {
    addUnite: (state, action) => {
      state.tabNamepush(action.payload);
    },
  },
});

export const { addUnite } = uniteSlice.actions;

export const selectUnite = (state) => state.unite;

export const selectActualise = (state) => state.unite.actualise;

export const selectChargementSupp = (state) => state.unite.chargementSuppression;

export default uniteSlice.reducer;

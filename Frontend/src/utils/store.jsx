import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from '../slice/UserSlice';
import formuleReducer from '../slice/FormulesSlice';
import modeleReducer from '../slice/ModeleSlice';
import VariablesAleatoiresReducer from '../slice/VariablesAleatoiresSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    formule: formuleReducer,
    modele: modeleReducer,
    variableAleatoire : VariablesAleatoiresReducer,
  },
  middleware : getDefaultMiddleware({
    serializableCheck: false
 }),
});

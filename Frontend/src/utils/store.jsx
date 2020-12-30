import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from '../slice/UserSlice';
import formuleReducer from '../slice/FormulesSlice';
import modeleReducer from '../slice/ModeleSlice';
import variablesAleatoiresReducer from '../slice/VariablesAleatoiresSlice'
import reponseReducer from '../slice/RepondreQuestionsSlice'
import enoncesReducer from '../slice/EnoncesSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    formule: formuleReducer,
    modele: modeleReducer,
    variableAleatoire : variablesAleatoiresReducer,
    reponse : reponseReducer,
    enonce : enoncesReducer,
  },
  middleware : getDefaultMiddleware({
    serializableCheck: false
 }),
});

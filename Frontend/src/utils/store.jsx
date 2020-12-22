import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/UserSlice';
import formuleReducer from '../slice/FormulesSlice';
import modeleReducer from '../slice/ModeleSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    formule: formuleReducer,
    modele: modeleReducer,
  },
});

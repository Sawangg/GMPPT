import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/UserSlice';
import formuleReducer from '../slice/FormulesSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    formule: formuleReducer,
  },
});

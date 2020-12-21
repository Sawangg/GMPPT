import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getUserDetails, logout } from '../utils/api.js';

export const userDetails = createAsyncThunk(
  'users/getUserDetails',
  async () => {
    const response = await getUserDetails();
    return response.data
  }
)

export const logoutUser = createAsyncThunk(
  'users/logout',
  async () => {
    const response = await logout();
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: "",
    password : "",
    isProf : false,
    isLogin : undefined,
    erreur : false
  },
  reducers: {
    setUser: (state, action) => {
        const {name, password, isProf} = action.payload
        state.name = name;
        state.password = password;
        state.isProf = isProf;
    },
    changeUserName : (state, action) => {
      state.name = action.payload;
    },
    changePassword : (state, action) => {
      state.password = action.payload;
    }
  },
  extraReducers: {
    // [userDetails.pending]: state => {
    //   console.log("chargement")
    // },
    [userDetails.rejected]: (state, action) => {
      state.isLogin = false;
      state.isProf = undefined;
    },
    [userDetails.fulfilled]: (state, action) => {
      state.name = action.payload.username;
      state.password = action.payload.password;
      state.isProf = action.payload.isProf === 1 ? true : false;
      state.isLogin = true;
    },
    [logoutUser.rejected]: (state, action) => {
      state.name = "";
      state.password = "";
      state.isLogin = false;
      state.isProf = undefined;
    },
    [logoutUser.fulfilled || logoutUser.rejected]: (state, action) => {
      state.name = "";
      state.password = "";
      state.isLogin = false;
      state.isProf = undefined;
    }
  }
});

export const { setUser, changePassword, changeUserName } = userSlice.actions;

export const selectUserName = state => state.user;
export const selectIsLogin = state => state.user.selectIsLogin;

export default userSlice.reducer;
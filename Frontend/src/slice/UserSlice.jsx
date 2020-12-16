import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: "",
    password : "",
    isProf : false,
    isLogin : undefined,
  },
  reducers: {
    setUser: (state, action) => {
        const {name, password, isProf} = action.payload
        state.name = name;
        state.password = password;
        state.isProf = isProf;
    },
    logoutUser : (state) =>{
      state.isLogin = false;
    },
    changeUserName : (state, action) => {
      state.name = action.payload;
  },
  changePassword : (state, action) => {
    state.password = action.payload;
  },
  loginUser : (state, action) =>{
    state.isLogin = true;
    state.isProf = action.payload;
  }
  },
});

export const { setUser, changePassword, changeUserName, loginUser, logoutUser } = userSlice.actions;

export const selectUserName = state => state.user;
export const selectIsLogin = state => state.user.selectIsLogin;

export default userSlice.reducer;
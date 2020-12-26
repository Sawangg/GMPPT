import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getInfoUser, logout, setImageUser, getImageUser } from '../utils/api.js';

export const userDetails = createAsyncThunk(
  'users/getInfoUser',
  async () => {
    const response = await getInfoUser();
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

export const setUserImage = createAsyncThunk(
  'users/setUserImage',
  async (props) => {
    const data = new FormData() ;
    data.append('profilePic', props.image);
    const response = await  setImageUser(props.name, data);
    return response.data
  }
)

export const getUserImage = createAsyncThunk(
  'users/getUserImage',
  async (name) => {
    const response = await  getImageUser(name);
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: "",
    password : "",
    image : undefined,
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
    [logoutUser.fulfilled || logoutUser.rejected]: (state, action) => {
      state.name = "";
      state.password = "";
      state.isLogin = false;
      state.isProf = undefined;
    },
    [setUserImage.rejected]: (state, action) => {
      console.log("non")
    },
    [setUserImage.pending]: (state, action) => {
      console.log("coucou")
      console.log(action.meta.arg)
      state.image = URL.createObjectURL(action.meta.arg.image);
    },
    [setUserImage.fulfilled]: (state, action) => {
      console.log("parfait")
    },
    [getUserImage.rejected]: (state, action) => {
      console.log("nop")
    },
    [getUserImage.fulfilled]: (state, action) => {
      let imageBase64 = 'data:image/jpeg;base64,'+Buffer.from(action.payload.profilepic).toString("base64");
      state.image = imageBase64;
    }
  }
});

export const { setUser, changePassword, changeUserName } = userSlice.actions;

export const selectUserName = state => state.user;
export const selectIsLogin = state => state.user.selectIsLogin;

export default userSlice.reducer;
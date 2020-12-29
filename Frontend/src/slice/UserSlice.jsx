import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getInfoUserAPI,
  logoutAPI,
  setImageUserAPI,
  getImageUserAPI,
  loginAPI,
} from "../utils/api.js";

export const userDetails = createAsyncThunk("users/getInfoUser", async () => {
  const response = await getInfoUserAPI();
  return response.data;
});

export const logoutUser = createAsyncThunk("users/logout", async () => {
  const response = await logoutAPI();
  return response.data;
});

export const loginUser = createAsyncThunk("users/login", async (user) => {
  const response = await loginAPI(user.name, user.password);
  return response.data;
});

export const setUserImage = createAsyncThunk(
  "users/setUserImage",
  async (props) => {
    const data = new FormData();
    data.append("profilePic", props.image);
    const response = await setImageUserAPI(props.name, data);
    return response.data;
  }
);

export const getUserImage = createAsyncThunk(
  "users/getUserImage",
  async (name) => {
    const response = await getImageUserAPI(name);
    return response.data;
  }
);

let myStorage = window.localStorage;

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    password: "",
    image:
      myStorage.getItem("image") === null
        ? undefined
        : myStorage.getItem("image"),
    isProf: false,
    isLogin: undefined,
    error: false,
    justLogin : false
  },
  reducers: {
    setUser: (state, action) => {
      const { name, password, isProf } = action.payload;
      state.name = name;
      state.password = password;
      state.isProf = isProf;
    },
    changeUserName: (state, action) => {
      state.name = action.payload;
    },
    changePassword: (state, action) => {
      state.password = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setJustLogin: (state, action) =>{
      state.justLogin = action.payload;
    }
  },
  extraReducers: {
    [userDetails.rejected]: (state) => {
      disconnect(state);
    },
    [userDetails.fulfilled]: (state, action) => {
      connect(state, action);
    },
    [loginUser.rejected]: (state) => {
      state.error = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      connect(state, action);
      state.justLogin = true;
    },
    [logoutUser.rejected]: (state) => {
      disconnect(state);
    },
    [logoutUser.fulfilled]: (state) => {
      disconnect(state);
    },
    [setUserImage.pending]: (state, action) => {
      state.image = URL.createObjectURL(action.meta.arg.image);
      let reader = new FileReader();
      reader.readAsDataURL(action.meta.arg.image);
      reader.onloadend = function () {
        let base64data = reader.result;
        myStorage.setItem("image", base64data);
      };
    },
    [getUserImage.fulfilled]: (state, action) => {
      const imageBase64 =
        "data:image/jpeg;base64," +
        Buffer.from(action.payload.profilepic).toString("base64");
      state.image = imageBase64;
      myStorage.setItem("image", imageBase64);
    },
  },
});

const disconnect = (state) => {
  state.name = "";
  state.password = "";
  state.isLogin = false;
  state.isProf = undefined;
};

const connect = (state, action) => {
  state.name = action.payload.username;
  state.isProf = action.payload.isProf === 1 ? true : false;
  state.isLogin = true;
};

export const {
  setUser,
  changePassword,
  changeUserName,
  setError,
  setJustLogin,
} = userSlice.actions;

export const selectUserName = (state) => state.user;

export const selectIsLogin = (state) => state.user.selectIsLogin;

export const selectError = (state) => state.user.error;

export const selectJustLogin = (state) => state.user.justLogin;

export default userSlice.reducer;

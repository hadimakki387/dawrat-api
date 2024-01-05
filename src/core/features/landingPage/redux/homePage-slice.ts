import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  tabs: number;
  sideBar: boolean;
  signIn: boolean;
  signUp: boolean;
  isAuth: boolean;
  resetPassword: boolean;
  otpSent: boolean;
} = {
  tabs: 0,
  sideBar: false,
  signIn: false,
  signUp: false,
  isAuth: false,
  resetPassword: false,
  otpSent: false,
};

const homePageSlice = createSlice({
  name: "homePageSlice",
  initialState,
  reducers: {
    setTabs(state, action) {
      state.tabs = action.payload;
    },
    setSideBar(state, action) {
      state.sideBar = action.payload;
    },
    setSignIn(state, action) {
      state.signIn = action.payload;
    },
    setSignUp(state, action) {
      state.signUp = action.payload;
    },
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
    setResetPassword(state, action) {
      state.resetPassword = action.payload;
    },
    setOtpSent(state, action) {
      state.otpSent = action.payload;
    },
  },
});

export const {
  setTabs,
  setSideBar,
  setSignIn,
  setSignUp,
  setIsAuth,
  setResetPassword,
  setOtpSent,
} = homePageSlice.actions;

export default homePageSlice.reducer;

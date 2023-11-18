import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  tabs: number;
  sideBar: boolean;
  signIn: boolean;
  signUp: boolean;
  isAuth : boolean
} = {
  tabs: 0,
  sideBar: false,
  signIn: false,
  signUp: false,
  isAuth: false
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
    setIsAuth(state,action){
      state.isAuth = action.payload
    }
  },
});

export const { setTabs, setSideBar, setSignIn,setSignUp,setIsAuth } = homePageSlice.actions;

export default homePageSlice.reducer;

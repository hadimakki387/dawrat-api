import { UserI } from "@/services/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  user: UserI | null;
  toggle: boolean;
} = {
  user: null,
  toggle: false,
};

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToggle(state,action) {
      state.toggle = action.payload;
    },
  },
});

export const { setUser ,setToggle} = globalSlice.actions;

export default globalSlice.reducer;

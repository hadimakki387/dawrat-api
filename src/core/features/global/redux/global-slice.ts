import { UserI } from "@/services/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  user: UserI | null;
} = {
  user: null,
};

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = globalSlice.actions;

export default globalSlice.reducer;

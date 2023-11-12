import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  name: string;
} = {
  name: "hadi",
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { setName } = profileSlice.actions;

export default profileSlice.reducer;

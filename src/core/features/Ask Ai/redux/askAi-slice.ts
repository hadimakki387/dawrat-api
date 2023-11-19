import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isPrivate: boolean;
} = {
  isPrivate: true,
};

const AskAiSlice = createSlice({
  name: "AskAiSlice",
  initialState,
  reducers: {
    setIsPrivate: (state, action) => {
      state.isPrivate = action.payload;
    },
  },
});

export const { setIsPrivate } = AskAiSlice.actions;

export default AskAiSlice.reducer;

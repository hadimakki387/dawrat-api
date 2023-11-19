import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isPrivate: boolean;
  QuestionStep: number;
  content: string;
  resetData: number;
} = {
  isPrivate: true,
  QuestionStep: 0,
  content: "",
  resetData: 0,
};

const AskAiSlice = createSlice({
  name: "AskAiSlice",
  initialState,
  reducers: {
    setIsPrivate: (state, action) => {
      state.isPrivate = action.payload;
    },
    incrementQuestionStep: (state) => {
      state.QuestionStep++;
    },
    decrementQuestionStep: (state) => {
      state.QuestionStep--;
    },
    resetQuestionStep: (state) => {
      state.QuestionStep = 0;
    },
    setContent(state, action) {
      state.content = action.payload;
    },
    incrementResetData(state) {
      state.resetData++;
    },
  },
});

export const {
  setIsPrivate,
  incrementQuestionStep,
  decrementQuestionStep,
  resetQuestionStep,
  setContent,
  incrementResetData
} = AskAiSlice.actions;

export default AskAiSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isPrivate: boolean;
  QuestionStep: number;
  content: string;
  resetData: number;
  subject: number;
  subIndex: number;
  university: string;
} = {
  isPrivate: true,
  QuestionStep: 0,
  content: "",
  resetData: 0,
  subject: 0,
  subIndex: 0,
  university: "",
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
    setSelectedSubject(state, action) {
      state.subject = action.payload;
    },
    setSubIndex(state, action) {
      state.subIndex = action.payload;
    },
    setUniversity(state, action) {
      state.university = action.payload;
    },

  },
});

export const {
  setIsPrivate,
  incrementQuestionStep,
  decrementQuestionStep,
  resetQuestionStep,
  setContent,
  incrementResetData,
  setSelectedSubject,
  setSubIndex,
  setUniversity,
} = AskAiSlice.actions;

export default AskAiSlice.reducer;

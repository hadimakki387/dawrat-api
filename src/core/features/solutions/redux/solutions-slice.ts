// let generate UploadSlice in this file

import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  uploadedSoutions: any[];
  handleSolutionSubmit: number;
  editSolution: boolean;
} = {
  uploadedSoutions: [],
  handleSolutionSubmit: 0,
  editSolution: false,
};

const solutionsSlice = createSlice({
  name: "solutionsSlice",
  initialState,
  reducers: {
    setUploadedSolutions(state, action) {
      state.uploadedSoutions = action.payload;
    },
    setHandleSolutionSubmit(state, action) {
      state.handleSolutionSubmit = action.payload;
    },
    setEditSolution(state, action) {
      state.editSolution = action.payload;
    },
  },
});

export const {
  setUploadedSolutions,
  setHandleSolutionSubmit,
  setEditSolution,
} = solutionsSlice.actions;

export default solutionsSlice.reducer;

// let generate UploadSlice in this file

import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  searchUploadUniversity: string;
  selectedUniversity: string;
  uploadedDocs: any[];
  searchCourse: string;
  selectedCourse: any[];
} = {
  searchUploadUniversity: "",
  selectedUniversity: "",
  uploadedDocs: [],
  searchCourse: "",
  selectedCourse: [],
};

const uploadSlice = createSlice({
  name: "uploadSlice",
  initialState,
  reducers: {
    setSearchUploadUniversity(state, action) {
      state.searchUploadUniversity = action.payload;
    },
    setSelectedUniversity(state, action) {
      state.selectedUniversity = action.payload;
    },
    setUploadedDocs(state, action) {
      state.uploadedDocs = action.payload;
    },
    setSearchCourse(state, action) {
      state.searchCourse = action.payload;
    },
    setSelectedCourse(state, action) {
      state.selectedCourse = action.payload;
    },
  },
});

export const {
  setSearchUploadUniversity,
  setSelectedUniversity,
  setUploadedDocs,
  setSearchCourse,
  setSelectedCourse
} = uploadSlice.actions;

export default uploadSlice.reducer;

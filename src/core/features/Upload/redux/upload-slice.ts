// let generate UploadSlice in this file

import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  searchUploadUniversity: string;
  selectedUniversity: string;
  uploadedDocs: any[];
} = {
  searchUploadUniversity: "",
  selectedUniversity: "",
  uploadedDocs: [],
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
  },
});

export const {
  setSearchUploadUniversity,
  setSelectedUniversity,
  setUploadedDocs,
} = uploadSlice.actions;

export default uploadSlice.reducer;

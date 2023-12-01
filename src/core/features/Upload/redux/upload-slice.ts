// let generate UploadSlice in this file

import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  searchUploadUniversity: string;
  selectedUniversity: string;
  uploadedDocs: any[];
  searchCourse: string;
  selectedCourse: string;
  searchDomain:string;
  selectedDomain:string;
  handleSubmit:number;
} = {
  searchUploadUniversity: "",
  selectedUniversity: "",
  uploadedDocs: [],
  searchCourse: "",
  selectedCourse: "",
  searchDomain:"",
  selectedDomain:"",
  handleSubmit:0
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
    setSearchDomain(state, action) {
      state.searchDomain = action.payload;
    },
    setSelectedDomain(state, action) {
      state.selectedDomain = action.payload;
    },
    setHandleSubmit(state, action) {
      state.handleSubmit = action.payload;
    },
  },
});

export const {
  setSearchUploadUniversity,
  setSelectedUniversity,
  setUploadedDocs,
  setSearchCourse,
  setSelectedCourse,
  setSearchDomain,
  setSelectedDomain,
  setHandleSubmit,
} = uploadSlice.actions;

export default uploadSlice.reducer;

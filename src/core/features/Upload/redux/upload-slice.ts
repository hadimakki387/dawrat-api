// let generate UploadSlice in this file

import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  searchUploadUniversity: string;
  selectedUniversity: string;
  uploadedDocs: any[];
  searchCourse: string;
  selectedCourse: string;
  searchDomain: string;
  selectedDomain: string;
  handleSubmit: number;
  addCourseDialog: boolean;
  searchUniversityCreate: string;
  selectedUniversityCreate: string;
  searchDomainCreate: string;
  selectedDomainCreate: string;
  addDomainDialog: boolean;
  searchUniversityAddDomain: string;
  selectedUniversityAddDomain: string;
  addUniversityDialog: boolean;
} = {
  searchUploadUniversity: "",
  selectedUniversity: "",
  uploadedDocs: [],
  searchCourse: "",
  selectedCourse: "",
  searchDomain: "",
  selectedDomain: "",
  handleSubmit: 0,
  addCourseDialog: false,
  searchUniversityCreate: "",
  selectedUniversityCreate: "",
  searchDomainCreate: "",
  selectedDomainCreate: "",
  addDomainDialog: false,
  searchUniversityAddDomain: "",
  selectedUniversityAddDomain: "",
  addUniversityDialog: false,
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
    setAddCourseDialog(state, action) {
      state.addCourseDialog = action.payload;
    },
    setSearchUniversityCreate(state, action) {
      state.searchUniversityCreate = action.payload;
    },
    setSelectedUniversityCreate(state, action) {
      state.selectedUniversityCreate = action.payload;
    },
    setSearchDomainCreate(state, action) {
      state.searchDomainCreate = action.payload;
    },
    setSelectedDomainCreate(state, action) {
      state.selectedDomainCreate = action.payload;
    },
    setAddDomainDialog(state, action) {
      state.addDomainDialog = action.payload;
    },
    setSearchUniversityAddDomain(state, action) {
      state.searchUniversityAddDomain = action.payload;
    },
    setSelectedUniversityAddDomain(state, action) {
      state.selectedUniversityAddDomain = action.payload;
    },
    setAddUniverisityDialog(state,action){
      state.addUniversityDialog = action.payload
    }
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
  setAddCourseDialog,
  setSearchUniversityCreate,
  setSelectedUniversityCreate,
  setSearchDomainCreate,
  setSelectedDomainCreate,
  setAddDomainDialog,
  setSearchUniversityAddDomain,
  setSelectedUniversityAddDomain,
  setAddUniverisityDialog
} = uploadSlice.actions;

export default uploadSlice.reducer;

import { DropdownValue } from "@/services/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  searchUniversity:string;
  selectedUniversity:DropdownValue | null;
  searchCourse:string;
  selectedCourse:DropdownValue | null;
  selectedLanguage:DropdownValue | null;
  selectedSemester: DropdownValue | null
  drawer:boolean;
  category:string;
} = {
  searchUniversity:"",
  selectedUniversity:null,
  searchCourse:"",
  selectedCourse:null,
  selectedLanguage:null,
  selectedSemester:null,
  drawer:false,
  category:"",
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setSearchUniversity: (state, action) => {
      state.searchUniversity = action.payload;
    },
    setSelectedUniversity: (state, action) => {
      state.selectedUniversity = action.payload;
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setSelectedSemester: (state, action) => {
      state.selectedSemester = action.payload;
    },
    setSearchCourse: (state, action) => {
      state.searchCourse = action.payload;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    setDrawer: (state, action) => {
      state.drawer = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    
  },
});

export const {
  setSearchUniversity,
  setSelectedUniversity,
  setSearchCourse,
  setSelectedCourse,
  setDrawer,
  setCategory,
  setSelectedLanguage,
  setSelectedSemester
} = searchSlice.actions;

export default searchSlice.reducer;

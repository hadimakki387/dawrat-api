// let generate UploadSlice in this file

import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  searchSettingsUniversity: string;
  selectedSettingsUniversity: string;
  firstName: string;
  lastName: string;
} = {
  searchSettingsUniversity: "",
  selectedSettingsUniversity: "",
  firstName: "",
  lastName: "",
};

const settomgsSlice = createSlice({
  name: "settomgsSlice",
  initialState,
  reducers: {
    setSearchSettingsUniversity(state, action) {
      state.searchSettingsUniversity = action.payload;
    },
    setSelectedSettingsUniversity(state, action) {
      state.selectedSettingsUniversity = action.payload;
    },
    setFirstName(state, action) {
      state.firstName = action.payload;
    },
    setLastName(state, action) {
      state.lastName = action.payload;
    },
  },
});

export const {
  setSearchSettingsUniversity,
  setSelectedSettingsUniversity,
  setFirstName,
  setLastName,
} = settomgsSlice.actions;

export default settomgsSlice.reducer;

// let generate UploadSlice in this file

import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  searchSettingsUniversity: string;
  selectedSettingsUniversity: string;
  firstName: string;
  lastName: string;
  searchSettingsDomain: string;
  selectedSettingsDomain: string;
} = {
  searchSettingsUniversity: "",
  selectedSettingsUniversity: "",
  firstName: "",
  lastName: "",
  searchSettingsDomain: "",
  selectedSettingsDomain: "",
};

const settingsSlice = createSlice({
  name: "settingsSlice",
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
    setSearchSettingsDomain(state, action) {
      state.searchSettingsDomain = action.payload;
    },
    setSelectedSettingsDomain(state, action) {
      state.selectedSettingsDomain = action.payload;
    },
  },
});

export const {
  setSearchSettingsUniversity,
  setSelectedSettingsUniversity,
  setFirstName,
  setLastName,
  setSearchSettingsDomain,
  setSelectedSettingsDomain,
} = settingsSlice.actions;

export default settingsSlice.reducer;

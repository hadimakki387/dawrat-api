import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  name: string;
  deleteDocumentDialog: boolean;
  selectedDoc: any;
} = {
  name: "hadi",
  deleteDocumentDialog: false,
  selectedDoc: null,
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setDeleteDocumentDialog(state, action) {
      state.deleteDocumentDialog = action.payload;
    },
    setSelectedDoc(state, action) {
      state.selectedDoc = action.payload;
    },
  },
});

export const { setName, setDeleteDocumentDialog, setSelectedDoc } =
  profileSlice.actions;

export default profileSlice.reducer;

import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  name: string;
  deleteDocumentDialog: boolean;
  selectedDoc: DocumentInterface | null;
  editDocumentDialog: boolean;
} = {
  name: "hadi",
  deleteDocumentDialog: false,
  selectedDoc: null,
  editDocumentDialog: false,
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
    setEditDocumentDialog(state, action) {
      state.editDocumentDialog = action.payload;
    },
  },
});

export const {
  setName,
  setDeleteDocumentDialog,
  setSelectedDoc,
  setEditDocumentDialog,
} = profileSlice.actions;

export default profileSlice.reducer;

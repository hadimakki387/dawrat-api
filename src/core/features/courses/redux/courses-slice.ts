import { courseInterface } from "@/backend/modules/Courses/courses.interface";
import { UserI } from "@/services/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  selectedDocInCourse: courseInterface | null;
  saveCourseDialog:boolean;
} = {
    selectedDocInCourse: null,
    saveCourseDialog:false
};

const courseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {
    setSelectedDocInCourse(state, action) {
      state.selectedDocInCourse = action.payload;
    },
    setSaveCourseDialog(state, action) {
      state.saveCourseDialog = action.payload;
    },
  },
});

export const {setSelectedDocInCourse,setSaveCourseDialog} = courseSlice.actions;

export default courseSlice.reducer;

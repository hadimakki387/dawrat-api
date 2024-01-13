import { courseInterface } from "@/backend/modules/Courses/courses.interface";
import { UniversityInterface } from "@/backend/modules/universities/universities.interface";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import DaAutocomplete from "@/components/global/DaAutoComplete";
import DaButton from "@/components/global/DaButton";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { DropdownValue } from "@/services/types";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import {
  setCategory,
  setDrawer,
  setSearchCourse,
  setSearchUniversity,
  setSelectedCourse,
  setSelectedUniversity,
} from "../redux/search-slice";

type Props = {
  universities?: UniversityInterface[];
  courses?: courseInterface[];
};

function FiltersDrawer({ universities, courses }: Props) {
  const dispatch = useDispatch();
  const { drawer, selectedCourse, selectedUniversity,category } = useAppSelector(
    (state) => state.search
  );

  return (
    <Drawer
      anchor={"right"}
      open={drawer}
      onClose={() => {
        dispatch(setDrawer(false));
      }}
    >
      <div className="md:w-[25vw] w-[75vw]">
        <div
          className="flex justify-end"
          style={{
            padding: "1rem 1rem 0 1rem",
          }}
        >
          <FontAwesomeIcon
            icon={faX}
            className="text-titleText"
            onClick={() => {
              dispatch(setDrawer(false));
            }}
          />
        </div>
        <div className="w-full flex items-center mb-4 gap-4 flex-col p-4">
          <div className="w-full">
            <DaAutocomplete
              options={
                universities?.map((item) => ({
                  label: item?.title,
                  value: item?.id,
                })) || [
                  {
                    value: "",
                    label: "loading...",
                  },
                ]
              }
              placeholder="Search for your university"
              onInputChange={(e: string) => {
                if (e) {
                  dispatch(setSearchUniversity(e));
                }
              }}
              onChange={(e) => {
                dispatch(setSelectedUniversity(e));
              }}
              style={{ borderRadius: "0.7rem" }}
              className=" p-1"
              name="university"
              label="University filter"
              value={selectedUniversity}
            />
          </div>
          <div className="w-full">
            <DaAutocomplete
              options={
                courses?.map((item) => ({
                  label: item?.title,
                  value: item?.id,
                })) || [
                  {
                    value: "",
                    label: "loading...",
                  },
                ]
              }
              placeholder="Search Course"
              onInputChange={(e) => {
                dispatch(setSearchCourse(e));
              }}
              onChange={(e) => {
                dispatch(setSelectedCourse(e));
              }}
              style={{ borderRadius: "0.7rem" }}
              className=" p-1"
              name="university"
              label="Course filter"
              value={selectedCourse}
            />
          </div>
          <div className="w-full">
            <p className="text-titleText font-medium pb-2">Category</p>
            <TextFieldComponent
              select
              placeholder="Select Category"
              label="Category"
              options={[
                { label: "All", value: "" },
                { label: "Courses", value: "courses" },
                { label: "Documents", value: "documents" },
              ]}
              onChange={(e) => {
                dispatch(setCategory(e.target.value));
              }}
              value={category}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <DaButton
            label="Clear Filters"
            className="bg-primary text-white font-semibold"
            onClick={() => {
              dispatch(setSelectedCourse(""));
              dispatch(setSelectedUniversity(""));
              dispatch(setCategory(""));
              dispatch(setSearchCourse(""));
              dispatch(setSearchUniversity(""));
            }}
          />
        </div>
      </div>
    </Drawer>
  );
}

export default FiltersDrawer;

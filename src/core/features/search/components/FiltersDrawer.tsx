import { courseInterface } from "@/backend/modules/Courses/courses.interface";
import { UniversityInterface } from "@/backend/modules/universities/universities.interface";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import DaButton from "@/components/global/DaButton";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  universities?: UniversityInterface[];
  courses?: courseInterface[];
};

function FiltersDrawer({ universities, courses }: Props) {
  const searchParams = useSearchParams();
  const drawer = searchParams.get("showFilterPanel");
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  return (
    <Drawer
      anchor={"right"}
      open={drawer ? true : false}
      onClose={() => {
        params.delete("showFilterPanel");
        router.push(`?${params.toString()}`);
      }}
    >
      <div className="md:w-[25vw]">
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
              params.delete("showFilterPanel");
              router.push(`?${params.toString()}`);
            }}
          />
        </div>
        <div className="w-full flex items-center mb-4 gap-4 flex-col p-4">
          <div className="w-full">
            <AutoCompleteSearch
              data={universities || []}
              placeholder="Search for your university"
              setSearch={(e: string) => {
                if (e) {
                  params.set("searchUniversity", e);
                  router.push(`?${params.toString()}`);
                }
              }}
              setSelectedItem={(e: string) => {
                params.set("selectedUniversity", e);
                router.push(`?${params.toString()}`);
              }}
              style={{ borderRadius: "0.7rem" }}
              className="mr-4 p-1"
              name="university"
              label="University filter"
              value={
                universities?.find(
                  (item) =>
                    item.id === (params.get("selectedUniversity") as string)
                )?.title
              }
            />
          </div>
          <div className="w-full">
            <AutoCompleteSearch
              data={courses || []}
              placeholder="Search Course"
              setSearch={(e) => {
                params.set("searchCourse", e);
                router.push(`?${params.toString()}`);
              }}
              setSelectedItem={(e) => {
                params.set("selectedCourse", e);
                router.push(`?${params.toString()}`);
              }}
              style={{ borderRadius: "0.7rem" }}
              className="mr-4 p-1"
              name="university"
              label="Course filter"
              value={
                courses?.find(
                  (item) => item.id === (params.get("selectedCourse") as string)
                )?.title
              }
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
                params.set("category", e.target.value);
                router.push(`?${params.toString()}`);
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <DaButton
            label="Clear Filters"
            className="bg-primary text-white font-semibold"
            onClick={() => {
              params.delete("selectedCourse");
              params.delete("selectedUniversity");
              params.delete("searchCourse");
              params.delete("searchUniversity");
              params.delete("category");
              router.push(`?${params.toString()}`);
            }}
          />
        </div>
      </div>
    </Drawer>
  );
}

export default FiltersDrawer;

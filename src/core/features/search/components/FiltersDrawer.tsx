import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

function FiltersDrawer({}: Props) {
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
        <div className="flex justify-end" style={{
            padding:"1rem 1rem 0 1rem"
        }}>
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
            data={[{ title: "data", id: "fjhkjg" }]}
            placeholder="Search for your university"
            setSearch={() => {}}
            setSelectedItem={() => {}}
            style={{ borderRadius: "0.7rem" }}
            className="mr-4 p-1"
            name="university"
            label="University filter"
            // formik={formik}
          />
        </div>
        <div className="w-full">
          <AutoCompleteSearch
            data={[{ title: "data", id: "fjhkjg" }]}
            placeholder="Search Course"
            setSearch={() => {}}
            setSelectedItem={() => {}}
            style={{ borderRadius: "0.7rem" }}
            className="mr-4 p-1"
            name="university"
            label="Course filter"
            // formik={formik}
          />
        </div>
        <div className="w-full">
          <AutoCompleteSearch
            data={[{ title: "data", id: "fjhkjg" }]}
            placeholder="Filter by category"
            setSearch={() => {}}
            setSelectedItem={() => {}}
            style={{ borderRadius: "0.7rem" }}
            className="mr-4 p-1"
            name="university"
            label="Category filter"
            // formik={formik}
          />
        </div>
        <div className="w-full">
          <AutoCompleteSearch
            data={[{ title: "data", id: "fjhkjg" }]}
            placeholder="Filter By Language"
            setSearch={() => {}}
            setSelectedItem={() => {}}
            style={{ borderRadius: "0.7rem" }}
            className="mr-4 p-1"
            name="university"
            label="Language filter"
            // formik={formik}
          />
        </div>
      </div>
    </Drawer>
  );
}

export default FiltersDrawer;

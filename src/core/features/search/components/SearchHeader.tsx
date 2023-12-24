import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import DaSearch from "@/components/global/DaSearch/DaSearch";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

function SearchHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const search = params.get("search");

  return (
    <>
      <div className="md:hidden flex gap-2 items-center mb-4">
        <div className="w-full">
          <DaSearch
            defaultValue={search ? (search as string) : ""}
            padding="p-1"
            handleSubmit={(search) => {
              router.push(`/search/${search}`);
            }}
          />
        </div>

        <div
          className="flex flex-col"
          onClick={() => {
            params.set("showFilterPanel", "true");
            router.push(`?${params.toString()}`);
          }}
        >
          <FontAwesomeIcon icon={faFilter} className="text-titleText" />
          <p className="text-xs font-semibold text-titleText">Filters</p>
        </div>
      </div>
      <div className="w-full flex items-center mb-4 gap-4 max-md:hidden">
        <div className="w-1/4">
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
        <div className="w-1/4">
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
        <div className="w-1/4">
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
        <div className="w-1/4">
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
    </>
  );
}

export default SearchHeader;

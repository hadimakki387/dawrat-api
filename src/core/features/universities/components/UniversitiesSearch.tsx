"use client";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {};

function UniversitiesSearch({}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const { data } = useGetUniversitiesQuery({
    title: search,
    limit: 5,
  });
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="lg:w-1/3 flex items-center flex-col gap-8 max-lg:text-center">
        <div className="text-titleText text-3xl font-semibold">
          At Whitch University You Study?
        </div>
        <div className="text-subTitleText text-sm font-medium ">
          Search for a university and find study material for it
        </div>
        <form
          className="w-full flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/universities/${selectedUniversity}`);
          }}
        >
          <div className="w-full">
            <AutoCompleteSearch
              data={data || []}
              placeholder="Search University"
              setSearch={(search) => {
                setSearch(search);
              }}
              setSelectedItem={(selectedItem) => {
                setSelectedUniversity(selectedItem);
              }}
              style={{
                borderRadius: 999999,
                padding: "0.75rem",
              }}
              className="mr-4 p-1"
              name="university"
            />
          </div>
          <button>
            <FontAwesomeIcon icon={faSearch} className="text-titleText text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default UniversitiesSearch;

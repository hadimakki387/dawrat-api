"use client";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import DaAutocomplete from "@/components/global/DaAutoComplete";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import { DropdownValue } from "@/services/types";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {};

function UniversitiesSearch({}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState<DropdownValue | null>(null);
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
            router.push(`/universities/${selectedUniversity?.value}`);
          }}
        >
          <div className="w-full">
            <DaAutocomplete
              options={data?.map((item) => ({
                label: item?.title,
                value: item?.id,
              })) || [
                {
                  value: "",
                  label: "loading...",
                },
              ]
            }
              placeholder="Search University"
              onInputChange={(search) => {
                setSearch(search);
              }}
              onChange={(selectedItem) => {
                setSelectedUniversity(selectedItem as DropdownValue);
              }}
              style={{
                borderRadius: 999999,
                padding: "0.75rem",
              }}
              className=" p-1"
              name="university"
              value={selectedUniversity}
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

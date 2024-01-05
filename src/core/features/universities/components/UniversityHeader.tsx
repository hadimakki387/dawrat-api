import { UniversityInterface } from "@/backend/modules/universities/universities.interface";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import DaSearch from "@/components/global/DaSearch/DaSearch";
import SearchInput from "@/components/global/SearchInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
  University?: UniversityInterface;
  universities?: UniversityInterface[];
  setSearch?: (value: string) => any;
  setSelectedUniversity?: (value: string) => any;
  handleSubmit?: () => any;
  value?: string;
};

function UniversityHeader({
  University,
  universities,
  setSearch,
  setSelectedUniversity,
  handleSubmit,
  value,
}: Props) {
  return (
    <div className="min-w-full h-56 md:h-80 bg-cover bg-center bg-no-repeat  md:px-60 pt-8 text-white UniversityHeader">
      <div className="space-y-6">
        <div className="text-3xl font-bold">{University?.title}</div>
        <div className="text-3xl font-bold">{University?.abr}</div>
        <div>
          <div className="w-full flex items-center gap-2">
            <div className="w-full">
              <AutoCompleteSearch
                placeholder="Search For Course Or Document in this University..."
                className="rounded-full"
                data={universities || []}
                style={{
                  borderRadius: 99999999,
                  padding: "1rem",
                }}
                setSearch={(e) => {
                  if (setSearch) setSearch(e);
                }}
                setSelectedItem={(e) => {
                  if (setSelectedUniversity) setSelectedUniversity(e);
                }}
                value={value}
              />
            </div>
            <button>
              <FontAwesomeIcon
                icon={faSearch}
                onClick={() => {
                  if (handleSubmit) handleSubmit();
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversityHeader;

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
  handleSubmit?: (e:string) => any;
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
              <DaSearch
              
                handleSubmit={(e) => {
                  if (handleSubmit) handleSubmit(e);
                }}
                placeholder="Search For Course Or Document in this University..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversityHeader;

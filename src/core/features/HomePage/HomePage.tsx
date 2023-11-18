import React from "react";
import Any from "./MyCourses";
import SearchInput from "@/components/global/SearchInput";
import DaSearch from "@/components/global/DaSearch/DaSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import MyCourses from "./MyCourses";

function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full">
        <DaSearch placeholder="Search for courses, books or documents" />
      </div>
     <MyCourses/>

      
    </div>
  );
}

export default HomePage;

import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import MissingDataMessage from "./missingDataMessage";

function MyCourses() {
  return (
    <div className="space-y-1">
      <h1 className="text-darkText font-bold text-2xl tracking-wide ">
      Recently Reviewed Courses
      </h1>
      <MissingDataMessage message="You are not following any courses yet. Use the search bar to find your
          courses and follow them."/>
    </div>
  );
}

export default MyCourses;

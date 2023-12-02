import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import MissingDataMessage from "./missingDataMessage";

function AiQuestions() {
  return (
    <div className="space-y-1">
      <h1 className="text-darkText font-bold text-2xl tracking-wide ">
        AI Questions
      </h1>
      <MissingDataMessage message="You are not following any courses with questions. Ask new questions by
          clicking the Ask AI button below."/>
    </div>
  );
}

export default AiQuestions;

import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";

function BouncingArrow() {
  return (
    <div className="downArrow bounce flex justify-center">
      <FontAwesomeIcon icon={faAngleDown} className="w-10 h-10" />
    </div>
  );
}

export default BouncingArrow;

import { faExclamation, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import GetPdfThumbnail from "../../pdf/GetPdfThumbnail";
import ItemCard from "./ItemCard";

function MyRecentDocument() {
  return (
    <div className="space-y-1">
      <h1 className="text-darkText font-bold text-2xl tracking-wide ">
        My Recent Documents
      </h1>
      {/* <div className="flex items-center gap-4 bg-primaryBg p-4 text-primary rounded-lg">
        <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-lg">
          <div className="bg-white w-4 h-4 flex items-center justify-center rounded-lg">
            <FontAwesomeIcon
              icon={faExclamation}
              className="text-primary text-sm"
            />
          </div>
        </div>
        <p className="text-darkText">
          You are not following any courses yet. Use the search bar to find your
          courses and follow them.
        </p>
      </div> */}
      <div className="w-full flex items-center gap-4">
        <ItemCard />
        <ItemCard />
      </div>
    </div>
  );
}

export default MyRecentDocument;

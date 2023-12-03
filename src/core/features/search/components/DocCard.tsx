import { DocumentI } from "@/services/types";
import React from "react";
import GetPdfThumbnail from "../../pdf/GetPdfThumbnail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import Folder from "@/components/SVGs/Folder";
import Institution from "@/components/SVGs/Institution";

function DocCard({ doc }: { doc: DocumentInterface }) {
  return (
    <div className="flex justify-between items-center hover:bg-primaryBg hover:cursor-pointer transition-all duration-200 p-4 rounded-2xl">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-silverBg rounded-xl">
          <div className="overflow-hidden rounded-xl h-20 w-28">
            <GetPdfThumbnail url={doc?.url} width={100} height={100} />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-primary">{doc?.title}</div>
          <div className="flex gap-3 items-center py-2 text-titleText">
            <div className="flex items-center gap-2 text-sm hover:text-primary hover:underline transition-all duration-200 font-semibold">
              <Folder fill="var(--title-text)" /> {doc?.courseName}
            </div>
            <div className="flex items-center gap-2 text-sm hover:text-primary hover:underline transition-all duration-200 font-semibold">
              <Institution fill="var(--title-text)" />
              {doc?.universityName}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start h-full">
        <div className="flex justify-center items-center gap-2  rounded-md py-1">
          <FontAwesomeIcon icon={faThumbsUp} className="text-green-400" />
          <p className="text-titleText text-sm font-medium">
            {!doc?.upvotes && !doc?.downvotes
              ? "0%"
              : doc?.upvotes === doc?.downvotes
              ? "100%"
              : (
                  (doc?.upvotes / (doc?.upvotes + doc?.downvotes)) *
                  100
                ).toFixed(2) + "%"}
          </p>
          <p className="text-subTitleText text-sm">
            ({doc?.upvotes + doc?.downvotes})
          </p>
        </div>
      </div>
    </div>
  );
}

export default DocCard;

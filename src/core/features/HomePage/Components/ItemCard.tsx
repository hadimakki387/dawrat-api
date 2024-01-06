"use client";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GetPdfThumbnail from "../../pdf/GetPdfThumbnail";
import { useMemo } from "react";

interface Props {
  doc: any;
  onClick?: () => any;
}

function ItemCard({ doc, onClick }: Props) {
  const getPdfThumbnail = useMemo(
    () => (
      <GetPdfThumbnail
        width={1500}
        pageIndex={1}
        fileUrl={doc?.doc?.url}
        getNumPages={(e) => {
          
        }}
      />
    ),
    [doc?.doc?.url]
  );
  return (
    <div
      onClick={onClick}
      style={{
        width: "calc((100% - 112px) / 8)",
      }}
      className="select-none rounded-xl h-72 max-md:min-w-[130px] max-md:h-60 min-w-[176px] max-w-[200px] overflow-hidden hover:bg-primaryBg transition-all duration-200 shadow-md hover:cursor-pointer"
    >
      <div className="h-1/2 rounded-xl p-2 bg-silverBg">
        <div className="w-[98%] m-auto overflow-hidden rounded-xl h-[98%]">
          {getPdfThumbnail}
        </div>
      </div>
      <div className="h-1/2  z-10 p-2 flex flex-col justify-between">
        <p className="font-medium text-primary hover:cursor-pointer hover:underline max-md:text-sm">
          {doc?.title}
        </p>
        <p className="text-subTitleText text-xs font-medium ">
          {doc?.courseTitle || doc?.courseName}
        </p>
        <div className="flex justify-center items-center gap-2 bg-neutral-100 rounded-md py-1">
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

export default ItemCard;

import React from "react";
import GetPdfThumbnail from "../../pdf/GetPdfThumbnail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function ItemCard() {
  return (
    <div className="w-44 h-72 rounded-xl  overflow-hidden hover:bg-primaryBg transition-all duration-200 shadow-md hover:cursor-pointer">
      <div className="h-1/2 overflow-hidden p-4">
        <div className="w-[98%] m-auto overflow-hidden rounded-lg shadow-md">
          <GetPdfThumbnail
            width={300}
            height={100}
            className="flex justify-center w-full "
          />
        </div>
      </div>
      <div className="h-1/2  z-10 p-2 flex flex-col justify-between">
        <p className="font-medium text-primary">
          Part2 - Exercises and solutions for mechanics of ...
        </p>
        <p className="text-subTitleText text-xs font-medium">Category</p>
        <div className="flex justify-center items-center gap-2 bg-neutral-100 rounded-md py-1">
          <FontAwesomeIcon icon={faThumbsUp} className="text-green-400" />
          <p className="text-titleText text-sm font-medium">100%</p>
          <p className="text-subTitleText text-sm">(8)</p>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;

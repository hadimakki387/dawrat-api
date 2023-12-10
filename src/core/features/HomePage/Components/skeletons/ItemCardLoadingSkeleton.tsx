import { Skeleton } from "@mui/material";
import React from "react";

function ItemCardLoadingSkeleton() {
  return (
    <div
    style={{
      width:"calc((100% - 112px) / 8)"
    }}
      className="h-72 min-w-[176px] max-w-[200px]  rounded-xl  overflow-hidden hover:bg-primaryBg transition-all duration-200 shadow-md hover:cursor-pointer"
    >
      <div className="h-1/2 overflow-hidden p-4">
        <div className="w-[98%] m-auto overflow-hidden rounded-lg shadow-md">
          <Skeleton
            variant="rectangular"
            width={300}
            height={100}
            className="flex justify-center w-full "
          />
        </div>
      </div>
      <div className="h-1/2  z-10 p-2 flex flex-col justify-between">
        <p className="font-medium text-primary">
          <Skeleton height={20} />
        </p>
        <p className="text-subTitleText text-xs font-medium">
          <Skeleton height={20} />
        </p>
        <p>
          <Skeleton height={40} />
        </p>
      </div>
    </div>
  );
}

export default ItemCardLoadingSkeleton;

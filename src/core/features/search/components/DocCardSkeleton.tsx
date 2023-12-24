import { Skeleton } from "@mui/material";
import React from "react";

function DocCardSkeleton() {
  return (
    <div className="flex justify-between items-center hover:bg-primaryBg hover:cursor-pointer transition-all duration-200 p-4 rounded-2xl">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-silverBg rounded-2xl">
          <div className="overflow-hidden rounded-2xl h-20 w-28">
            <Skeleton variant="rectangular" width={112} height={80} />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-primary">
            <Skeleton width={100} />
          </div>
          <div className="flex gap-3 items-center py-2 ">
            <Skeleton width={100} />
            <div className="max-sm:hidden">
              <Skeleton width={100} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center gap-2  rounded-md py-1 max-sm:hidden">
          <Skeleton width={100} />
        </div>
      </div>
    </div>
  );
}

export default DocCardSkeleton;

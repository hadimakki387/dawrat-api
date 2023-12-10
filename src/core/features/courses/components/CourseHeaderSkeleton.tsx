import { Skeleton } from "@mui/material";
import React from "react";

function CourseHeaderSkeleton() {
  return (
    <div className="rounded-2xl bg-greenBg py-4 px-40 space-y-8 ">
      <div className="flex items-center gap-2">
        <Skeleton width={"100px"} />
      </div>
      <div className="flex items-center gap-5">
        <Skeleton variant="rectangular" width="50px" height="50px" />
        <div className="flex flex-col items-start gap-2">
          <Skeleton width={"100px"} />
          <div>
            <Skeleton width={"100px"} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Skeleton width={"120px"} height={"4rem"} style={{borderRadius:"9999px"}} />
        </div>
        <div className="w-[25rem]">
          <Skeleton width={"400px"} />
        </div>
      </div>
    </div>
  );
}

export default CourseHeaderSkeleton;

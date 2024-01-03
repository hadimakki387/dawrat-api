import { Divider } from "@mui/material";
import React from "react";

type Props = {
    documentsCount?:number
    coursesCounts?:number
    solutionsCounts?:number
    summariesCounts?:number
};

function DocsAnalytics({
    documentsCount=0,
    coursesCounts=0,
    solutionsCounts=0,
    summariesCounts=0

}: Props) {
  return (
    <>
    <p className="text-xl text-titleText font-semibold">Content categories</p>
      <div>
        <p className="text-xl text-titleText">Total Documents</p>
        <p className="text-xl text-titleText">{documentsCount}</p>
      </div>
      <Divider />
      <div>
        <p className="text-xl text-titleText">Total Courses</p>
        <p className="text-xl text-titleText">{coursesCounts}</p>
      </div>
      <Divider />
      <div>
        <p className="text-xl text-titleText">Total Solutions</p>
        <p className="text-xl text-titleText">{solutionsCounts}</p>
      </div>
      <Divider />
      <div>
        <p className="text-xl text-titleText">Total Summaries</p>
        <p className="text-xl text-titleText">{summariesCounts}</p>
      </div>
    </>
      
    
  );
}

export default DocsAnalytics;

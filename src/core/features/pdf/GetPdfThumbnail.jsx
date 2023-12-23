// use react pdf to view pdf

"use client";
import WebViewer from "@pdftron/pdfjs-express";
import { useEffect, useRef } from "react";



function GetPdfThumbnail({ width, height, className, url = "", getNumPages }) {
  const viewer = useRef(null);
  

  useEffect(() => {
    if (viewer.current && viewer.current.innerHTML === "" && url) {
      WebViewer(
        {
          path: "/webviewer/lib",
          initialDoc: url,
          disabledElements: ["header", "toolsHeader"],
          css: "/thumbnail.css",
        },
        viewer.current
      ).then((instance) => {
        var docViewer = instance.Core.documentViewer;
        var FitMode = instance.UI.FitMode;

        docViewer.on("documentLoaded", () => {
          console.log("this is the page numbers");
          getNumPages(instance.getPageCount());
          LoadSuccess(true);
          instance.UI.setFitMode(FitMode.FitWidth);
        });
      });
    }
  }, [url]);
  return <div className="webviewer" ref={viewer} ></div>;
}

export default GetPdfThumbnail;

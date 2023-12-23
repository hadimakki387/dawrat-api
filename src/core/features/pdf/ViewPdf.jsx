// use react pdf to view pdf
"use client";
import React, { useEffect, useRef } from "react";
import WebViewer from "@pdftron/pdfjs-express";

function ViewPdf({ url, LoadSuccess }) {
  const viewer = useRef(null);
 

  useEffect(() => {
    if (viewer.current && viewer.current.innerHTML === "" && url) {
      WebViewer(
        {
          path: "/webviewer/lib",
          initialDoc: url,
        },
        viewer.current
      ).then((instance) => {
        var docViewer = instance.Core.documentViewer;
        var FitMode = instance.UI.FitMode;
        console.log(instance)
        docViewer.on("documentLoaded", () => {
          LoadSuccess(true);
          console.log("document loaded");
          // instance.UI.setFitMode(FitMode.FitWidth);
          instance.UI.setZoomLevel(1.4);
        });
      });
    }
  }, [url]);
  return <div className="webviewer" ref={viewer}></div>;
}

export default ViewPdf;

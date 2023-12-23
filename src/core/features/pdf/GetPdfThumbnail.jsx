// use react pdf to view pdf

"use client"
import { useEffect, useRef } from "react";
import WebViewer from "@pdftron/pdfjs-express";



function GetPdfThumbnail({
  width,
  height,
  className,
  url = "",
  getNumPages,
}) {
  const viewer = useRef(null);
 

  useEffect(() => {

    if (viewer.current && viewer.current.innerHTML === "" && url) {
      WebViewer(
        {
          path: "/webviewer/lib",
          initialDoc: url,
          disabledElements: [
            'header',
            'toolsHeader'
          ],
          css: '/thumbnail.css'
        },
        viewer.current,
        
      ).then((instance) => {
        var docViewer = instance.Core.documentViewer;
        var FitMode = instance.UI.FitMode;
        console.log(instance)
        docViewer.on("documentLoaded", () => {
          LoadSuccess(true);
          const { documentViewer } = instance.Core;
          instance.UI.setFitMode(FitMode.FitWidth);
          documentViewer.addEventListener('documentLoaded', () => {
            const doc = documentViewer.getDocument();
            const pageNum = 1;
            doc.loadThumbnail(pageNum, (thumbnail) => {
              // thumbnail is a HTMLCanvasElement or HTMLImageElement
              console.log(thumbnail);
            });
          });
        });
      });
    }
  }, [url]);
  return <div className="webviewer" ref={viewer}></div>;
}

export default GetPdfThumbnail;

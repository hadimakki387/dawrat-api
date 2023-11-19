// use react pdf to view pdf
"use client";
import { useState, useCallback } from "react";
import { Document, Page, Thumbnail, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./index.css"

import { useResizeObserver } from "@wojtekmaj/react-hooks";
import type { PDFDocumentProxy } from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

function ViewPdf() {
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  const url =
    "http://docs.google.com/gview?url=https://utfs.io/f/16bba07c-a46e-46a1-af3a-19da34925b7c-9l9cjg.pdf&embedded=true";

  return (
    <div>
      <div className="Example__container">
        <div className="Example__container__document" ref={setContainerRef}>
          
          <Document
            file={"/14.pdf"}
            onLoadSuccess={onDocumentLoadSuccess}
            options={{...options}}
            
            
          >
            
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
                className={"rounded-lg"}
                
              />
            ))}
          </Document>
        </div>
      </div>

      {/* <iframe src={url} width="100%" height="600px" /> */}
    </div>
  );
}

export default ViewPdf;
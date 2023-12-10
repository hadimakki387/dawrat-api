// use react pdf to view pdf
"use client";
import { useState, useCallback } from "react";
import { Document, Page, Thumbnail, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./index.css";

import { useResizeObserver } from "@wojtekmaj/react-hooks";
import type { PDFDocumentProxy } from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

function ViewPdf({
  url,
  LoadSuccess,
}: {
  url: string;
  LoadSuccess?: (e: boolean) => any;
}) {
  const [numPages, setNumPages] = useState<number>();
  const [success, setSuccess] = useState(false);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
    console.log("success")
    if (LoadSuccess) LoadSuccess(true);
  }

  return (
    <div>
      {url && (
        <div className="Example__container">
          <div className="Example__container__document">
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              options={{ ...options }}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  className={"rounded-lg"}
                />
              ))}
            </Document>
          </div>
        </div>
      )}

      {/* <iframe src={url} width="100%" height="600px" /> */}
    </div>
  );
}

export default ViewPdf;

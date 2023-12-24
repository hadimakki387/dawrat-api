"use client";
import * as React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";

import "@react-pdf-viewer/core/lib/styles/index.css";

import { pageThumbnailPlugin } from "./ThumbnailPlugin";
import { CircularProgress } from "@mui/material";

interface DisplayThumbnailExampleProps {
  fileUrl: string;
  pageIndex: number;
  width: number;
  getNumPages?: (number: number) => any;
}

const GetPdfThumbnail: React.FC<DisplayThumbnailExampleProps> = ({
  fileUrl,
  pageIndex = 1,
  width,
  getNumPages,
}) => {
  const thumbnailPluginInstance = thumbnailPlugin({
    renderSpinner: () => (
      <div className="flex justify-center items-center h-full w-full">
        <CircularProgress />
      </div>
    ),
    thumbnailWidth: width,
  });
  const { Cover } = thumbnailPluginInstance;
  const pageThumbnailPluginInstance = pageThumbnailPlugin({
    PageThumbnail: <Cover width={width} getPageIndex={() => pageIndex} />,
  });

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">

        <Viewer
          fileUrl={fileUrl}
          plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]}
          onDocumentLoad={(e) => {
            if (getNumPages) getNumPages(e.doc.numPages);
          }}
        />

    </Worker>
  );
};

export default GetPdfThumbnail;

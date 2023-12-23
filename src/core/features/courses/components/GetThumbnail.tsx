import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import React from "react";
import GetPdfThumbnail from "../../pdf/GetPdfThumbnail";

function GetThumbnail({
  doc,
  setNumPages,
}: {
  doc: DocumentInterface;
  setNumPages: (num: number) => any;
}) {
  return (
    <>
      {doc?.doc?.url && (
        <GetPdfThumbnail
          fileUrl={doc?.doc?.url}
          width={1500}
          getNumPages={(number: number) => {
            setNumPages(number);
          }}
          pageIndex={1}
        />
      )}
    </>
  );
}

export default GetThumbnail;

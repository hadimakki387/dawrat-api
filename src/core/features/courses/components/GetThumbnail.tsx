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
          url={doc?.doc?.url}
          width={112}
          height={80}
          getNumPages={(number: number) => {
            setNumPages(number);
          }}
        />
      )}
    </>
  );
}

export default GetThumbnail;

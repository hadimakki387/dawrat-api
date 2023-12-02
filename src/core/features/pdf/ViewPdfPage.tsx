"use client";
import { useGetSingleDocumentQuery } from "@/core/rtk-query/documents";
import { useParams } from "next/navigation";
import { lazy, Suspense } from "react";

const ViewPdf = lazy(() => import("./ViewPdf"));

function ViewPdfPage() {
  const param = useParams();
  const id = param?.id;
  const { data } = useGetSingleDocumentQuery(id);


  return (
    <div>
      {data ? (
        <Suspense fallback="loading...">
          <ViewPdf url={data.url} />
        </Suspense>
      ) : (
        "loading..."
      )}
    </div>
  );
}

export default ViewPdfPage;

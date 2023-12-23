"use client";
import { useGetSingleDocumentQuery } from "@/core/rtk-query/documents";
import { CircularProgress, Skeleton } from "@mui/material";
import { useParams } from "next/navigation";
import { lazy, Suspense, useState } from "react";

const ViewPdf = lazy(() => import("./ViewPdf"));

function ViewPdfPage() {
  const param = useParams();
  const id = param?.id;
  const { data } = useGetSingleDocumentQuery(id as string);
  const [success, setSuccess] = useState(false);

  return (
    <div>
      {data ? (
        <>
          <div className={`${success ? "" : "hidden"}`}>
            <Suspense>
              <ViewPdf
                url={data.doc?.url}
                LoadSuccess={(e:boolean) => {
                  setSuccess(e);
                }}
              />
            </Suspense>
          </div>
          <div className={`${success ? "hidden" : ""}`}>
            <div className=" flex flex-col justify-center m-auto">
            {Array.from(new Array(4)).map((_, index) => {
              return (
                <div key={index} className="flex items-center justify-center">
                  <Skeleton
                    variant="rectangular"
                    width="600px"
                    height="900px"
                    className="rounded-lg mb-4"
                  />
                </div>
              );
            })}
          </div>
          </div>
          
        </>
      ) : (
        <div className="h-[80vh] grid place-items-center">
            <CircularProgress/>
        </div>
      )}
    </div>
  );
}

export default ViewPdfPage;

"use client";
import DaButton from "@/components/global/DaButton";
import LandingNavBar from "@/components/layout/LandingNavBar";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetPublicDocumentsByIdQuery } from "@/core/rtk-query/public";
import { useGetStudylistQuery } from "@/core/rtk-query/user";
import { faDownload, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, Skeleton } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { Suspense, lazy, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import "./index.css";

const ViewPdf = lazy(() => import("@/core/features/pdf/ViewPdf"));

function PublicPdfViewPage() {
  const param = useParams();
  const id = param?.id;
  const { data, isError } = useGetPublicDocumentsByIdQuery(id as string);
  const [success, setSuccess] = useState(false);

  const { user } = useAppSelector((state) => state.global);
  const dispatch = useDispatch();

  const router = useRouter();

  const handleDownload = () => {
    // Fetch the PDF file
    if (!data?.doc?.url) return;
    const id = toast.loading("Downloading...");
    fetch(data?.doc?.url as string)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a Blob URL for the PDF
        const blobUrl = URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement("a");

        // Set the link attributes
        link.href = blobUrl;
        link.download = `${data?.title}.pdf`;

        // Append the link to the document
        document.body.appendChild(link);

        // Trigger the click event on the link
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);

        // Revoke the Blob URL to free up resources
        URL.revokeObjectURL(blobUrl);
        toast.dismiss(id);
        toast.success("Downloaded");
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
        toast.dismiss(id);
        toast.error("Error Downloading");
      });
  };

  return (
    <div className="bg-[#38071f]">
      <div className="h-[10vh]">
        <LandingNavBar />
      </div>
      {isError ? (
        <div className="h-[90vh] grid place-items-center bg-[#38071f] text-white text-xl font-semibold">
          Document Not Found
        </div>
      ) : data ? (
        <>
          <div className={`${success ? "" : "hidden"}  h-screen px-2`}>
            <div className="flex items-center gap-4 justify-between max-md:flex-col max-md:gap-2">
              <div className="flex items-center gap-4 max-md:w-full">
                <div className="max-md:hidden">
                  <DaButton
                    fullRounded
                    className="flex items-center justify-end gap-4 text-white my-4 hover:cursor-pointer bg-green-500 font-semibold  w-full"
                    onClick={() => handleDownload()}
                    label="Download"
                    startIcon={
                      <FontAwesomeIcon
                        icon={faDownload}
                        className="text-white"
                      />
                    }
                  />
                </div>
                <div className="md:hidden">
                  <DaButton
                    fullRounded
                    className="flex items-center justify-end gap-4 text-white my-4 hover:cursor-pointer bg-green-500 font-semibold  w-full"
                    onClick={() => handleDownload()}
                    label=""
                    startIcon={
                      <FontAwesomeIcon
                        icon={faDownload}
                        className="text-white"
                      />
                    }
                  />
                </div>
                <div className="max-md:hidden">
                  <DaButton
                    label="Share"
                    startIcon={
                      <FontAwesomeIcon
                        icon={faShare}
                        className="text-primary text-lg"
                      />
                    }
                    fullRounded
                    className="border border-neutral-300 px-6 bg-[#f7f7f7] w-full"
                    onClick={() => {
                      //i want to copy the link to the clipboard
                      navigator.clipboard.writeText(
                        `${window.location.origin}/public/pdf/${id}`
                      );
                      toast.success("Link Copied");
                    }}
                  />
                </div>
                <div className="md:hidden">
                  <DaButton
                    label=""
                    startIcon={
                      <FontAwesomeIcon
                        icon={faShare}
                        className="text-primary text-lg"
                      />
                    }
                    fullRounded
                    className="border border-neutral-300 px-6 bg-[#f7f7f7] w-full"
                    onClick={() => {
                      //i want to copy the link to the clipboard
                      navigator.clipboard.writeText(
                        `${window.location.origin}/public/pdf/${id}`
                      );
                      toast.success("Link Copied");
                    }}
                  />
                </div>
                {data.solution && (
                  <div className="">
                    <DaButton
                      label="Check Solution"
                      fullRounded
                      className="border border-neutral-300 px-6 bg-[#f7f7f7] w-full"
                      onClick={() => {
                        router.push(`/public/solutions/${data?.solution}?solution=true`);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <Suspense>
              <ViewPdf
                url={data.doc?.url}
                LoadSuccess={(e: boolean) => {
                  setSuccess(e);
                }}
                outerStyle={{
                  height: "100% !important",
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
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default PublicPdfViewPage;

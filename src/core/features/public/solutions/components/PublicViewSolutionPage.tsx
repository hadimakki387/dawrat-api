"use client";
import DaButton from "@/components/global/DaButton";
import LandingNavBar from "@/components/layout/LandingNavBar";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetPublicSolutionsByIdQuery } from "@/core/rtk-query/public";
import { useGetSingleSolutionQuery } from "@/core/rtk-query/solutions";
import { useGetStudylistQuery } from "@/core/rtk-query/user";
import {
  faAngleRight,
  faDownload,
  faPen,
  faShare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, Skeleton } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { Suspense, lazy, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
const ViewPdf = lazy(() => import("@/core/features/pdf/ViewPdf"));

function PublicViewSolutionPage() {
  const param = useParams();
  const id = param?.id;
  const { data } = useGetPublicSolutionsByIdQuery(id as string);
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
  const isOwner = data?.userId === user?.id;
  return (
    <div className="bg-[#38071f]">
      <div className="h-[10vh]">
        <LandingNavBar />
      </div>
      {data ? (
        <>
          <div className={`${success ? "" : "hidden"}  h-screen px-2`}>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-primary hover:cursor-pointer hover:underline" onClick={()=>{
                  router.push(`/pdf/${data?.document}`)
                }}>
                  {data?.documentName}
                </p>
                <FontAwesomeIcon icon={faAngleRight}  className="text-titleText"/>
                <p className="text-titleText">solution</p>
              </div>
              <h1 className="text-titleText text-lg my-4">
                {data?.title}
              </h1>
            </div>
            <div className="flex items-center gap-4 justify-between max-md:flex-col max-md:gap-2">
              <div className="flex items-center gap-4 max-md:w-full">
                <div className="max-md:w-1/2">
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
                <div className="max-md:w-1/2">
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
                        `${window.location.origin}/public/solution/${id}`
                      );
                      toast.success("Link Copied");
                    }}
                  />
                </div>
              </div>
              
            </div>
            <Suspense>
              <ViewPdf
                url={data.doc?.url}
                LoadSuccess={(e: boolean) => {
                  setSuccess(e);
                }}
                outerStyle={{}}
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

export default PublicViewSolutionPage;

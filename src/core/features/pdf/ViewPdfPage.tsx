"use client";
import { StudylistInterface } from "@/backend/modules/studylist/studylist.interface";
import DaButton from "@/components/global/DaButton";
import { useAppSelector } from "@/core/StoreWrapper";
import {
  useDownvoteDocumentMutation,
  useGetDocumentsByOwnerIdQuery,
  useGetSingleDocumentQuery,
  useUpvoteDocumentMutation,
} from "@/core/rtk-query/documents";
import { useGetStudylistQuery } from "@/core/rtk-query/user";
import {
  faBookmark,
  faDownload,
  faPen,
  faShare,
  faThumbsDown,
  faThumbsUp,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, Skeleton } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { Suspense, lazy, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import SaveForStudyListDialog from "../courses/components/SaveForStudyList";
import {
  setSaveCourseDialog,
  setSelectedDocInCourse,
} from "../courses/redux/courses-slice";

const ViewPdf = lazy(() => import("./ViewPdf"));

function ViewPdfPage() {
  const param = useParams();
  const id = param?.id;
  const { data, isError } = useGetSingleDocumentQuery(id as string);
  const [success, setSuccess] = useState(false);
  const [upvote] = useUpvoteDocumentMutation();
  const [downvote] = useDownvoteDocumentMutation();
  const { user } = useAppSelector((state) => state.global);
  const dispatch = useDispatch();
  const [voting, setVoting] = useState(false);
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

  const handleUpvote = () => {
    const id = toast.loading("Upvoting...");
    if (user)
      upvote({ id: data?.id as string, user: user })
        .unwrap()
        .then((res) => {
          toast.dismiss(id);
          toast.success("Upvoted");
          setVoting(false);
        })
        .catch((err) => {
          toast.dismiss(id);
          toast.error(`${err?.data?.message}`);
          setVoting(false);
        });
  };
  const handleDownvote = () => {
    const id = toast.loading("Downvoting...");
    if (user)
      downvote({ id: data?.id as string, user: user })
        .unwrap()
        .then((res) => {
          toast.dismiss(id);
          toast.success("Downvoted");
          setVoting(false);
        })
        .catch((err) => {
          toast.dismiss(id);
          toast.error(`${err?.data?.message}`);
          setVoting(false);
        });
  };
  const { data: Studylist } = useGetStudylistQuery(user?.id as string);
  //i want to check if the document is already saved in the studylist
  const checkSaved = Studylist?.some((studylist: StudylistInterface) => {
    if (data) return studylist.documents.includes(data?.id);
  });
  const isOwner = data?.ownerId === user?.id;

  return (
    <div>
      {isError ? (
        <div className="text-titleText font-semibold text-xl h-[80vh] grid place-items-center">
          Document Not Found
        </div>
      ) : data ? (
        <>
          <SaveForStudyListDialog />
          <div className={`${success ? "" : "hidden"}`}>
            <div className="flex items-center gap-4 justify-between max-md:flex-col max-md:gap-2">
              <div className="flex items-center gap-4 max-md:w-full ">
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
                {isOwner && !data?.solution && (
                  <div className="">
                    <DaButton
                      label="Upload Solution"
                      startIcon={
                        <FontAwesomeIcon
                          icon={faUpload}
                          className="text-primary text-lg"
                        />
                      }
                      fullRounded
                      className="border border-neutral-300 px-6 bg-[#f7f7f7] w-full"
                      onClick={() => {
                        router.push(`/solutions/create/${id}`);
                      }}
                    />
                  </div>
                )}
                {data?.solution && (
                  <div className="max-md:w-1/2">
                    <DaButton
                      label="Check Solution"
                      // startIcon={
                      //   <FontAwesomeIcon
                      //     icon={faUpload}
                      //     className="text-primary text-lg"
                      //   />
                      // }
                      fullRounded
                      className="border border-neutral-300 px-6 bg-[#f7f7f7] w-full"
                      onClick={() => {
                        router.push(`/solutions/${data?.solution}`);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 max-md:justify-between max-md:w-full">
                <DaButton
                  label="Save"
                  startIcon={
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className={`${
                        checkSaved && checkSaved ? "text-primary" : ""
                      }`}
                    />
                  }
                  fullRounded
                  className="border border-neutral-300 px-6 bg-[#f7f7f7]"
                  onClick={() => {
                    dispatch(setSaveCourseDialog(true));
                    dispatch(setSelectedDocInCourse(data));
                  }}
                />
                <DaButton
                  onClick={() => {
                    setVoting(true);
                    if (!voting) handleUpvote();
                  }}
                  className={`${
                    user?.likedDocuments?.includes(data?.id as string)
                      ? "text-primary"
                      : "text-titleText"
                  } bg-white border ${
                    voting
                      ? "border-subTitleText"
                      : user?.likedDocuments?.includes(data?.id as string)
                      ? "border-success"
                      : "border-neutral-200"
                  } w-24 `}
                  style={{ justifyContent: "center" }}
                  label={`${data.upvotes}`}
                  fullRounded
                  startIcon={
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className={`${
                        voting ? "text-subTborder-subTitleText" : "text-success"
                      }`}
                    />
                  }
                />

                <DaButton
                  onClick={() => {
                    setVoting(true);
                    if (!voting) handleDownvote();
                  }}
                  className={`${
                    user?.dislikedDocuments?.includes(data?.id as string)
                      ? "text-primary"
                      : "text-titleText"
                  } bg-white border ${
                    voting
                      ? "border-subTitleText"
                      : user?.dislikedDocuments?.includes(data?.id as string)
                      ? "border-error"
                      : "border-neutral-200"
                  } w-24 `}
                  style={{ justifyContent: "center" }}
                  label={`${data.downvotes}`}
                  fullRounded
                  startIcon={
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      className={`${
                        voting ? "text-subTborder-subTitleText" : "text-error"
                      }`}
                    />
                  }
                />
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

export default ViewPdfPage;

"use client";
import { StudylistInterface } from "@/backend/modules/studylist/studylist.interface";
import DaButton from "@/components/global/DaButton";
import { useAppSelector } from "@/core/StoreWrapper";
import {
  useDownvoteDocumentMutation,
  useGetSingleDocumentQuery,
  useUpvoteDocumentMutation,
} from "@/core/rtk-query/documents";
import { useGetStudylistQuery } from "@/core/rtk-query/user";
import { ToastType } from "@/services/constants";
import { generateToast, updateToast } from "@/services/global-function";
import {
  faBookmark,
  faDownload,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, Skeleton } from "@mui/material";
import { useParams } from "next/navigation";
import { Suspense, lazy, useState } from "react";
import { useDispatch } from "react-redux";
import SaveForStudyListDialog from "../courses/components/SaveForStudyList";
import {
  setSaveCourseDialog,
  setSelectedDocInCourse,
} from "../courses/redux/courses-slice";

const ViewPdf = lazy(() => import("./ViewPdf"));

function ViewPdfPage() {
  const param = useParams();
  const id = param?.id;
  const { data } = useGetSingleDocumentQuery(id as string);
  const [success, setSuccess] = useState(false);
  const [upvote] = useUpvoteDocumentMutation();
  const [downvote] = useDownvoteDocumentMutation();
  const { user } = useAppSelector((state) => state.global);
  const dispatch = useDispatch();

  const handleDownload = () => {
    // Fetch the PDF file
    if (!data?.doc?.url) return;
    const id = generateToast({
      message: "Downloading...",
      isLoading: true,
    });
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
        updateToast(id, "Downloaded", {
          toastType: ToastType.success,
          isLoading: false,
          duration: 2000,
        });
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
        updateToast(id, `${error}`, {
          toastType: ToastType.error,
          isLoading: false,
          duration: 2000,
        });
      });
  };

  const handleUpvote = () => {
    const id = generateToast({
      message: "Upvoting...",
      isLoading: true,
    });
    if (user)
      upvote({ id: data?.id as string, user: user })
        .unwrap()
        .then((res) => {
          updateToast(id, "Upvoted", {
            toastType: ToastType.success,
            isLoading: false,
            duration: 2000,
          });
        })
        .catch((err) => {
          updateToast(id, `${err?.data?.message}`, {
            toastType: ToastType.error,
            isLoading: false,
            duration: 2000,
          });
        });
  };
  const handleDownvote = () => {
    const id = generateToast({
      message: "Downvoting...",
      isLoading: true,
    });
    if (user)
      downvote({ id: data?.id as string, user: user })
        .unwrap()
        .then((res) => {
          updateToast(id, "Downvoted", {
            toastType: ToastType.success,
            isLoading: false,
            duration: 2000,
          });
        })
        .catch((err) => {
          updateToast(id, `${err?.data?.message}`, {
            toastType: ToastType.error,
            isLoading: false,
            duration: 2000,
          });
        });
  };
  console.log(user);
  const { data: Studylist } = useGetStudylistQuery(user?.id as string);
  //i want to check if the document is already saved in the studylist
  const checkSaved = Studylist?.some((studylist: StudylistInterface) => {
    if (data) return studylist.documents.includes(data?.id);
  });

  return (
    <div>
      {data ? (
        <>
          <SaveForStudyListDialog />
          <div className={`${success ? "" : "hidden"}`}>
            <div className="flex items-center gap-4 justify-between max-md:flex-col max-md:gap-2">
              <DaButton
                fullRounded
                className="flex items-center justify-end gap-4 text-white my-4 hover:cursor-pointer bg-green-500 font-semibold max-md:min-w-full"
                onClick={() => handleDownload()}
                label="Download"
                startIcon={
                  <FontAwesomeIcon icon={faDownload} className="text-white" />
                }
              />
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
                    handleUpvote();
                  }}
                  className={`${
                    user?.likedDocuments?.includes(data?.id as string)
                      ? "text-primary"
                      : "text-titleText"
                  } bg-white border ${
                    user?.likedDocuments?.includes(data?.id as string)
                      ? "border-success"
                      : "border-neutral-200"
                  } w-24 `}
                  style={{ justifyContent: "center" }}
                  label={`${data.upvotes}`}
                  fullRounded
                  startIcon={
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="text-success"
                    />
                  }
                />

                <DaButton
                  onClick={() => {
                    handleDownvote();
                  }}
                  className={`${
                    user?.dislikedDocuments?.includes(data?.id as string)
                      ? "text-primary"
                      : "text-titleText"
                  } bg-white border ${
                    user?.dislikedDocuments?.includes(data?.id as string)
                      ? "border-error"
                      : "border-neutral-200"
                  } w-24 `}
                  style={{ justifyContent: "center" }}
                  label={`${data.downvotes}`}
                  fullRounded
                  startIcon={
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      className="text-error"
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

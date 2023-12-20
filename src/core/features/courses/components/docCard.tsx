"use client";
import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import Document from "@/components/SVGs/Document";
import DaButton from "@/components/global/DaButton";
import { useAppSelector } from "@/core/StoreWrapper";
import { useUpdateReviewedDocumentsMutation } from "@/core/rtk-query/documents";
import { useGetStudylistQuery } from "@/core/rtk-query/user";
import { faBookmark, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setSaveCourseDialog,
  setSelectedDocInCourse,
} from "../redux/courses-slice";
import GetThumbnail from "./GetThumbnail";
import { StudylistInterface } from "@/backend/modules/studylist/studylist.interface";

function DocCard({ doc }: { doc: DocumentInterface }) {
  const router = useRouter();
  const [updateReviewsDocs] = useUpdateReviewedDocumentsMutation();
  const { user } = useAppSelector((state) => state.global);
  const [numPages, setNumPages] = useState<number>(0);
  const dispatch = useDispatch();
  const { data: Studylist } = useGetStudylistQuery(user?.id as string);
  //i want to check if the document is already saved in the studylist
  const checkSaved = Studylist?.some((studylist: StudylistInterface) => {
    return studylist.documents.includes(doc?.id);
  });

console.log("checkSaved", checkSaved)
  return (
    <div className="flex justify-between items-center hover:bg-primaryBg hover:cursor-pointer transition-all duration-200 p-4 rounded-2xl">
      <div
        className="flex items-center gap-4"
        onClick={() => {
          updateReviewsDocs({
            id: user?.id,
            body: {
              document: doc?.id,
            },
            limit: 3,
          });
          router.push(`/pdf/${doc?.id}`);
        }}
      >
        <div className="p-2 bg-silverBg rounded-xl">
          <div className="overflow-hidden rounded-xl h-20 w-28">
            <GetThumbnail doc={doc} setNumPages={(num) => setNumPages(num)} />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div
            className="text-primary hover:underline"
            onClick={() => {
              updateReviewsDocs({
                id: user?.id,
                body: {
                  document: doc?.id,
                },
                limit: 3,
              });
              router.push(`/pdf/${doc?.id}`);
            }}
          >
            {doc?.title}
          </div>
          <div className="flex gap-3 items-center py-2 text-titleText">
            <div className="flex items-center gap-2 text-sm hover:text-primary hover:underline transition-all duration-200 font-semibold">
              <Document
                fill="var(--silver-bg)"
                patternFill="var(--sub-title-text)"
              />{" "}
              {numPages} pages
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center h-full gap-6">
        <div className="flex justify-center items-center gap-2  rounded-md py-1">
          <FontAwesomeIcon icon={faThumbsUp} className="text-green-400" />
          <p className="text-titleText text-sm font-medium">
            {!doc?.upvotes && !doc?.downvotes
              ? "0%"
              : doc?.upvotes === doc?.downvotes
              ? "100%"
              : (
                  (doc?.upvotes / (doc?.upvotes + doc?.downvotes)) *
                  100
                ).toFixed(2) + "%"}
          </p>
          <p className="text-subTitleText text-sm">
            ({doc?.upvotes + doc?.downvotes})
          </p>
        </div>

        <DaButton
          label="Save"
          startIcon={
            <FontAwesomeIcon
              icon={faBookmark}
              className={`${checkSaved && checkSaved ? "text-primary" : ""}`}
            />
          }
          fullRounded
          className="border border-neutral-300 px-6 bg-[#f7f7f7]"
          onClick={() => {
            dispatch(setSaveCourseDialog(true));
            dispatch(setSelectedDocInCourse(doc));
          }}
        />
      </div>
    </div>
  );
}

export default DocCard;

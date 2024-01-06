"use client";
import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import Folder from "@/components/SVGs/Folder";
import Institution from "@/components/SVGs/Institution";
import { useAppSelector } from "@/core/StoreWrapper";
import { useUpdateReviewedDocumentsMutation } from "@/core/rtk-query/documents";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import GetPdfThumbnail from "../../pdf/GetPdfThumbnail";
import { useUpdateReviewdCoursesMutation } from "@/core/rtk-query/courses";
import { useMemo } from "react";

function DocCard({ doc }: { doc: DocumentInterface }) {
  const router = useRouter();
  const [updateReviewsDocs] = useUpdateReviewedDocumentsMutation();
  const { user } = useAppSelector((state) => state.global);
  const [updateReviewdCourses] = useUpdateReviewdCoursesMutation();
  const getPdfThumbnail = useMemo(
    () => (
      <GetPdfThumbnail
        width={1500}
        pageIndex={1}
        fileUrl={doc?.doc?.url}
        getNumPages={(e) => {}}
      />
    ),
    [doc?.doc?.url]
  );
  return (
    <div className="select-none flex justify-between items-center hover:bg-primaryBg hover:cursor-pointer transition-all duration-200 p-4 max-sm:p-2 rounded-2xl max-sm:flex-col max-sm:items-start">
      <div className="flex items-center gap-4 max-sm:items-start">
        <div className="p-2 bg-silverBg rounded-xl">
          <div className="overflow-hidden rounded-xl h-20 w-28 max-sm:w-24 max-sm:h-20">
            {getPdfThumbnail}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div
            className="text-primary max-sm:text-sm hover:underline transition-all duration-200"
            onClick={() => {
              updateReviewsDocs({
                id: user?.id,
                body: {
                  document: doc.id,
                },
                limit: 3,
              });
              router.push(`/pdf/${doc.id}`);
            }}
          >
            {doc?.title}
          </div>
          <div className="flex gap-3 items-center py-2 text-titleText max-sm:flex-col max-sm:items-start">
            <div
              onClick={() => {
                updateReviewdCourses({
                  id: user?.id as string,
                  body: { course: doc?.course },
                });
                router.push(`/courses/${doc?.course}`);
              }}
              className="flex items-center gap-2 text-sm hover:text-primary hover:underline transition-all duration-200 font-semibold max-sm:text-xs"
            >
              <Folder fill="var(--title-text)" /> {doc?.courseName}
            </div>
            <div
              className="flex items-center gap-2 text-sm hover:text-primary hover:underline transition-all duration-200 font-semibold max-sm:text-xs"
              onClick={() => {
                router.push(`/universities/${doc?.university}`);
              }}
            >
              <Institution fill="var(--title-text)" />
              {doc?.universityName}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start h-full max-sm:items-center max-sm:justify-center max-sm:w-full">
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
      </div>
    </div>
  );
}

export default DocCard;

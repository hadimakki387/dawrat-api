"use client";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import MissingDataMessage from "./MissingDataMessage";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetRecentlyReviewedDataQuery } from "@/core/rtk-query/user";
import ItemCard from "./ItemCard";
import { useRouter } from "next/navigation";
import RecentlyViewedCard from "./RecentlyViewedCard";
import { Skeleton } from "@mui/material";

function RecentlyReviewed() {
  const { user } = useAppSelector((state) => state.global);

  const reviewedDocuments =
    user?.reviewedDocuments
      ?.filter((item, index) => index < 3)
      .map((item) => ({
        id: item,
        type: "doc",
      })) || [];

  const reviewedCourses =
    user?.reviewedCourses
      ?.filter((item, index) => index < 3)
      .map((item) => ({
        id: item,
        type: "course",
      })) || [];

  console.log([...reviewedDocuments, ...reviewedCourses]);

  const { data: RecentlyReviewed } = useGetRecentlyReviewedDataQuery(
    [...reviewedDocuments, ...reviewedCourses],
    { skip: !user || !reviewedDocuments || !reviewedCourses }
  );

  const router = useRouter();

  return (
    <div className="space-y-1">
      <h1 className="text-darkText font-bold text-2xl tracking-wide ">
        Recently Reviewed
      </h1>
      {RecentlyReviewed && RecentlyReviewed.length === 0 && (
        <MissingDataMessage
          message="You are not following any courses yet. Use the search bar to find your
          courses and follow them."
        />
      )}
      <div className="w-full flex items-center gap-4">
        {RecentlyReviewed
          ? RecentlyReviewed.map((doc: any, index: number) => {
              return <RecentlyViewedCard key={index} doc={doc} />;
            })
          : Array.from(new Array(4)).map((_, index) => {
              return (
                <div
                  key={index}
                  className={`w-44 h-40 flex flex-col justify-between items-start hover:cursor-pointer rounded-xl mt-4 p-4 shadow-md`}
                >
                  <Skeleton variant="text" width="100%" height="1.5rem" />
                  <Skeleton variant="text" width="100%" height="1.5rem" />
                  <Skeleton variant="text" width="100%" height="1.5rem" />
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default RecentlyReviewed;

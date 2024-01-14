"use client";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetRecentlyReviewedDataQuery } from "@/core/rtk-query/user";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import MissingDataMessage from "./MissingDataMessage";
import RecentlyViewedCard from "./RecentlyViewedCard";
import DaCarousel from "@/components/global/carousel/DaCarousel";

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

  const { data: RecentlyReviewed, isLoading: loadingDocuments } =
    useGetRecentlyReviewedDataQuery(
      [...reviewedDocuments, ...reviewedCourses],
      { skip: !user || !reviewedDocuments || !reviewedCourses }
    );

  const router = useRouter();

  return (
    <div className="space-y-1">
      <h1 className="text-darkText font-bold text-xl md:text-2xl tracking-wide ">
        Recently Reviewed
      </h1>

      <div className="">
        {RecentlyReviewed && RecentlyReviewed.length > 0 ? (
          <DaCarousel
            options={{ containScroll: "trimSnaps" }}
          >
            {RecentlyReviewed?.map((doc: any, index: number) => {
              return <RecentlyViewedCard key={index} doc={doc} />;
            })}
          </DaCarousel>
        ) : RecentlyReviewed &&
          !loadingDocuments &&
          RecentlyReviewed.length === 0 ? (
          <MissingDataMessage
            message="You are not following any courses yet. Use the search bar to find your
          courses and follow them."
          />
        ) : (
          <div className="flex items-center gap-3">
            <DaCarousel
              options={{ containScroll: "trimSnaps" }}
            >
              {Array.from(new Array(10)).map((_, index) => {
                return (
                  <div
                    key={index}
                    className={`w-44 h-40 min-w-[176px]  flex flex-col justify-between items-start hover:cursor-pointer rounded-xl mt-4 p-4 shadow-md`}
                  >
                    <Skeleton variant="text" width="100%" height="1.5rem" />
                  </div>
                );
              })}
            </DaCarousel>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentlyReviewed;

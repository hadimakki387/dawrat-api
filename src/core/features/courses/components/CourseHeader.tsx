import AI from "@/components/SVGs/AI";
import Document from "@/components/SVGs/Document";
import Folder from "@/components/SVGs/Folder";
import DaButton from "@/components/global/DaButton";
import SearchInput from "@/components/global/SearchInput";
import { useGetCourseByIdQuery } from "@/core/rtk-query/courses";
import { useGetUniversityByIdQuery } from "@/core/rtk-query/universities";
import {
  faAngleDoubleRight,
  faAngleRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import CourseHeaderSkeleton from "./CourseHeaderSkeleton";
import DaSearch from "@/components/global/DaSearch/DaSearch";
import { useFollowCourseMutation } from "@/core/rtk-query/user";
import { useAppSelector } from "@/core/StoreWrapper";
import { toast } from "sonner";

function CourseHeader() {
  const params = useParams();
  const id = params?.id;
  const { user } = useAppSelector((state) => state.global);
  const following = user?.followedCourses?.includes(id as string);

  const { data } = useGetCourseByIdQuery(id as string);
  const { data: university } = useGetUniversityByIdQuery(
    { id: data?.university as string },
    { skip: !data?.university }
  );
  const router = useRouter();
  const [followCourse] = useFollowCourseMutation();

  return (
    <>
      {!data || !university ? (
        <CourseHeaderSkeleton />
      ) : (
        <div className="rounded-2xl bg-greenBg py-4 space-y-8 max-md:px-4 md:px-40">
          <div className="flex items-center gap-2">
            <p
              className="text-primary font-semibold hover:underline hover:cursor-pointer"
              onClick={() => {
                router.push(`/universities`);
              }}
            >
              University
            </p>
            <FontAwesomeIcon
              icon={faAngleRight}
              className="text-sm font-light text-subTitleText"
            />
            <p
              className="text-primary font-semibold hover:underline hover:cursor-pointer"
              onClick={() => {
                router.push(`/universities/${university?.id}`);
              }}
            >
              {university?.abr}
            </p>
            <FontAwesomeIcon
              icon={faAngleRight}
              className="text-sm font-light text-subTitleText"
            />
            <p className="text-titleText font-semibold">{data?.title}</p>
          </div>
          <div className="flex items-center gap-5">
            <Folder fill="var(--green-text)" size={50} />
            <div className="flex flex-col items-start gap-2">
              <div className="text-darkText text-3xl font-semibold">
                {data?.title}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Document size={14} fill="var(--sub-title-text)" />
                  <p className="text-sm font-semibold text-titleText">
                    {data?.docsCount} documents
                  </p>
                </div>
                {/* <AI size={14} fill="var(--sub-title-text)" /> */}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between max-md:gap-2">
            <div>
              <DaButton
                startIcon={
                  following ? <FontAwesomeIcon icon={faCheck} /> : null
                }
                label={following ? "Following" : "Follow"}
                fullRounded
                className={`${
                  following ? "bg-white" : "bg-primary text-white"
                } font-medium max-md:h-full`}
                onClick={() => {
                  const toastId = toast.loading("Following...");
                  followCourse({
                    course: id as string,
                    userId: user?.id as string,
                  })
                    .unwrap()
                    .then((res) => {
                      toast.dismiss(toastId)
                      toast.success("Followed")
                    })
                    .catch((err) => {
                      toast.dismiss(toastId)
                      toast.error(`${err?.data?.message}`)
                    });
                }}
              />
            </div>
            <div className="w-[25rem]">
              <DaSearch
                placeholder="Find in Algebra"
                padding="max-md:p-0"
                handleSubmit={(e) => {
                  router.push(
                    `/search/${e}?searchCourse=${data?.title}&selectedCourse=${data?.id}`
                  );
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseHeader;

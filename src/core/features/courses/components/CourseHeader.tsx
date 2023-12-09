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
import { useParams } from "next/navigation";
import React from "react";
import CourseHeaderSkeleton from "./CourseHeaderSkeleton";

function CourseHeader() {
  const following = true;
  const params = useParams();
  const id = params?.id;

  const { data } = useGetCourseByIdQuery(id as string);
  const { data: university } = useGetUniversityByIdQuery(
    { id: data?.university as string },
    { skip: !data?.university }
  );

  return (
    <>
      {!data || !university ? (
        <CourseHeaderSkeleton />
      ) : (
        <div className="rounded-2xl bg-greenBg py-4 px-40 space-y-8 ">
          <div className="flex items-center gap-2">
            <p className="text-primary font-semibold">University</p>
            <FontAwesomeIcon
              icon={faAngleRight}
              className="text-sm font-light text-subTitleText"
            />
            <p className="text-primary font-semibold">{university?.abr}</p>
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
          <div className="flex items-center justify-between">
            <div>
              <DaButton
                startIcon={<FontAwesomeIcon icon={faCheck} />}
                label={following ? "Following" : "Follow"}
                fullRounded
                className={`${
                  following ? "bg-white" : "bg-primary"
                } font-medium`}
              />
            </div>
            <div className="w-[25rem]">
              <SearchInput placeholder="Find in Algebra" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseHeader;

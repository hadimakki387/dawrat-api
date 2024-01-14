"use client";
import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useSearchDataQuery } from "@/core/rtk-query/search";
import CourseCard from "./CourseCard";
import { courseInterface } from "@/backend/modules/Courses/courses.interface";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import SearchHeader from "./SearchHeader";
import DocCard from "./DocCard";
import { DocumentI } from "@/services/types";
import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import CourseCardSkeleton from "./CourseCardSkeleton";
import DocCardSkeleton from "./DocCardSkeleton";
import FiltersDrawer from "./FiltersDrawer";
import DaCarousel from "@/components/global/carousel/DaCarousel";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import {
  useGetAllCoursesQuery,
  useGetCoursesByUniversityIdQuery,
  useGetCoursesByUserIdQuery,
} from "@/core/rtk-query/courses";
import MissingDataMessage from "../../HomePage/Components/MissingDataMessage";
import { useAppSelector } from "@/core/StoreWrapper";

function Search() {
  const param = useParams();
  const search = param?.search;

  const {
    selectedCourse,
    selectedUniversity,
    category,
    searchCourse,
    searchUniversity,
  } = useAppSelector((state) => state.search);

  const { data, isLoading } = useSearchDataQuery({
    title: search as string,
    university: selectedUniversity?.value,
    course: selectedCourse?.value,
  });
  const { data: Universities, isLoading: loadingUniversities } =
    useGetUniversitiesQuery({
      limit: 5,
      title: searchUniversity,
    });
  const { data: courses } = useGetAllCoursesQuery(
    { limit: 5, title: searchCourse },
    {
      skip: !!selectedUniversity,
    }
  );
  const { data: UniversityCourses } = useGetCoursesByUniversityIdQuery(
    {
      id: selectedUniversity?.value,
      limit: 5,
    },
    {
      skip: !selectedUniversity,
    }
  );
  return (
    <>
      {isLoading || loadingUniversities ? (
        <div className="md:px-20  w-full">
          <SearchHeader />
          <div>
            <DaCarousel
              options={{ containScroll: "trimSnaps" }}
            >
              {Array(3)
                .fill(3)
                .map((_, index) => {
                  return <CourseCardSkeleton key={index} />;
                })}
            </DaCarousel>
          </div>

          <div className="my-4">Sort By</div>
          {Array(15)
            .fill(15)
            .map((_, index) => {
              return <DocCardSkeleton key={index} />;
            })}
        </div>
      ) : !isLoading && data.length === 0 && data ? (
        <div className="w-full mt-16">
          <MissingDataMessage message="No results found" />
        </div>
      ) : (
        <>
          <FiltersDrawer
            universities={Universities}
            courses={UniversityCourses || courses}
          />
          <div className="md:px-20 w-full">
            <SearchHeader
              universities={Universities}
              courses={UniversityCourses || courses}
            />
            {(!category || category === "courses") && (
              <div className="flex items-center gap-4 w-full">
                <DaCarousel
                  options={{ containScroll: "trimSnaps" }}
                >
                  {data?.map((item: any, index: number) => {
                    if (!item.course)
                      return (
                        <CourseCard
                          course={item as courseInterface}
                          key={index}
                        />
                      );
                  })}
                </DaCarousel>
              </div>
            )}
            {(!category || category === "documents") && (
              <>
                <div className="my-4">Sort By</div>
                {data?.map((item: any, index: number) => {
                  if (item.course)
                    return (
                      <DocCard doc={item as DocumentInterface} key={index} />
                    );
                })}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Search;

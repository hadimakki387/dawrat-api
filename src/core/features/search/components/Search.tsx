"use client";
import React from "react";
import { useParams } from "next/navigation";
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

function Search() {
  const param = useParams();
  const search = param?.search;
  const { data, isLoading } = useSearchDataQuery({ title: search });
  return (
    <>
      <FiltersDrawer />
      {isLoading ? (
        <div className="md:px-20  w-full">
          <SearchHeader />
          <div >
            <DaCarousel
              hasButtons={false}
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
      ) : (
        <div className="md:px-20 w-full ">
          <SearchHeader />
          <div className="flex items-center gap-4 w-full">
            <DaCarousel
              hasButtons={false}
              options={{ containScroll: "trimSnaps" }}
            >
              {data.map((item: any, index: number) => {
                if (!item.course)
                  return (
                    <CourseCard course={item as courseInterface} key={index} />
                  );
              })}
            </DaCarousel>
          </div>
          <div className="my-4">Sort By</div>
          {data.map((item: any, index: number) => {
            if (item.course)
              return <DocCard doc={item as DocumentInterface} key={index} />;
          })}
        </div>
      )}
    </>
  );
}

export default Search;

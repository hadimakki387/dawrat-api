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

function Search() {
  const param = useParams();
  const search = param?.search;
  const { data, isLoading } = useSearchDataQuery({ title: search });
  return (
    <>
    
      {isLoading ? (
        <div className="px-20 w-full">
          <SearchHeader />
          <div className="flex items-center gap-4 w-full">
            {Array(3)
              .fill(3)
              .map((_, index) => {
                return <CourseCardSkeleton key={index} />;
              })}
          </div>

          <div className="my-4">Sort By</div>
          {Array(15)
            .fill(15)
            .map((_, index) => {
              return <DocCardSkeleton key={index} />;
            })}
        </div>
      ) : (
        <div className="px-20 w-full ">
          <SearchHeader />
          <div className="flex items-center gap-4 w-full">
            {data.map((item: any, index: number) => {
              if (!item.course)
                return (
                  <CourseCard course={item as courseInterface} key={index} />
                );
            })}
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
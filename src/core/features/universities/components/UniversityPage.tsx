"use client";
import SearchInput from "@/components/global/SearchInput";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import UniversityHeader from "./UniversityHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import DaCarousel from "@/components/global/carousel/DaCarousel";
import ItemCard from "../../HomePage/Components/ItemCard";
import Folder from "@/components/SVGs/Folder";
import PopularDocuments from "./PopularDocuments";
import RecentDocuments from "./RecentDocuments";
import UniversityCourse from "./UniversityCourse";
import { CircularProgress, Divider } from "@mui/material";
import DocsAnalytics from "./DocsAnalytics";
import {
  useGetUniversitiesQuery,
  useGetUniversityByIdQuery,
} from "../../../rtk-query/universities";
import {
  useGetDocumentByUniversityIdQuery,
  useGetPopularDocumentsInUniversityQuery,
  useGetRecentDocumentsInUniversityQuery,
} from "@/core/rtk-query/documents";
import { useGetCoursesByUniversityIdQuery } from "@/core/rtk-query/courses";

type Props = {};

function UniversityPage({}: Props) {
  const id = useParams()?.id;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const { data: university } = useGetUniversityByIdQuery({ id: id as string });
  const { data: popularDocuments } = useGetPopularDocumentsInUniversityQuery({
    id: id as string,
  });
  const { data: recentDocuments } = useGetRecentDocumentsInUniversityQuery({
    id: id as string,
  });
  const { data: courses } = useGetCoursesByUniversityIdQuery({
    id: id as string,
  });
  const router = useRouter();
  const title = params.get("search");
  const { data: universities } = useGetUniversitiesQuery({
    limit: 5,
    title: title as string,
  });

  return (
    <>
      {university &&
      popularDocuments &&
      recentDocuments &&
      courses &&
      universities ? (
        <div className="lg:relative lg:mr-8 space-y-8 lg:mb-12">
          <UniversityHeader
            University={university}
            universities={universities}
            setSearch={(e: string) => {
              params.set("search", e);
              router.push(`?${params.toString()}`);
            }}
            setSelectedUniversity={(e: string) => {
              params.set("selectedUniversity", e);
              router.push(`?${params.toString()}`);
            }}
            handleSubmit={(e) => {
              router.push(
                `/search/${e}?selectedUniversity=${id}&searchUniversity=${university?.title}`
              );
            }}
            value={
              universities?.find(
                (item) =>
                  item.id === (params.get("selectedUniversity") as string)
              )?.title
            }
          />
          <div className=" lg:px-40 space-y-8">
            <p className="font-medium flex items-center gap-2">
              <span className="text-primary hover:underline hover:cursor-pointer">
                University
              </span>
              <FontAwesomeIcon
                icon={faAngleRight}
                className="text-sm text-subTitleText"
              />
              <span className="text-subTitleText">{university?.title}</span>
            </p>
            <div className="flex items-start gap-4 max-lg:flex-col">
              <div className="lg:w-[70%] w-full space-y-8">
                <PopularDocuments
                  docs={popularDocuments}
                  onClick={(id: string) => {
                    router.push(`/pdf/${id}`);
                  }}
                />
                <RecentDocuments
                  docs={recentDocuments}
                  onClick={(id: string) => {
                    router.push(`/pdf/${id}`);
                  }}
                />
                <UniversityCourse
                  Courses={courses}
                  onClick={(id: string) => {
                    router.push(`/courses/${id}`);
                  }}
                />
              </div>
              <div className="lg:w-[30%] w-full border border-neutral-300 rounded-2xl p-4 space-y-4 mt-8">
                <DocsAnalytics
                  documentsCount={popularDocuments.length}
                  coursesCounts={courses.length}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[84vh]">
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default UniversityPage;

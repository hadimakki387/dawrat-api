import { courseInterface } from "@/backend/modules/Courses/courses.interface";
import { UniversityInterface } from "@/backend/modules/universities/universities.interface";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import DaButton from "@/components/global/DaButton";
import DaSearch from "@/components/global/DaSearch/DaSearch";
import { faFilter, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  universities?: UniversityInterface[];
  courses?: courseInterface[];
}

function SearchHeader({ universities, courses }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const search = params.get("search");
  const UniTitle = universities?.find(
    (university: UniversityInterface) =>
      university?.id === searchParams.get("selectedUniversity")
  )?.title;
  const CourseTitle = courses?.find(
    (course: courseInterface) =>
      course?.id === searchParams.get("selectedCourse")
  )?.title;

  return (
    <>
      <div
        className={` flex ${
          searchParams.get("selectedUniversity") || searchParams.get("selectedCourse") || searchParams.get("category")
            ? "justify-between"
            : "justify-end"
        } gap-2 items-center mb-4 font-semibold text-titleText`}
      >
        <div className="flex items-center gap-4 max-sm:max-w-[70%] max-sm:flex-wrap">
          { UniTitle && (
            <DaButton
              label={UniTitle || ""}
              endIcon={<FontAwesomeIcon icon={faX} className="text-xs" />}
              className="border border-neutral-300"
              fullRounded
              onClick={() => {
                params.delete("searchUniversity");
                params.delete("selectedUniversity");
                router.push(`?${params.toString()}`);
              }}
            />
          )}
          { CourseTitle && (
            <DaButton
              label={CourseTitle || ""}
              endIcon={<FontAwesomeIcon icon={faX} className="text-xs" />}
              className="border border-neutral-300"
              fullRounded
              onClick={() => {
                params.delete("searchCourse");
                params.delete("selectedCourse");
                router.push(`?${params.toString()}`);
              }}
            />
          )}
          {searchParams.get("category") && (
            <DaButton
              label={searchParams.get("category") || ""}
              endIcon={<FontAwesomeIcon icon={faX} className="text-xs" />}
              className="border border-neutral-300"
              fullRounded
              onClick={() => {
                params.delete("category");
                router.push(`?${params.toString()}`);
              }}
              
            />
          )}
        </div>
        <div
          className="flex flex-col items-center hover:cursor-pointer"
          onClick={() => {
            params.set("showFilterPanel", "true");
            router.push(`?${params.toString()}`);
          }}
        >
          <FontAwesomeIcon icon={faFilter} className="text-titleText" />
          <p className="text-xs font-semibold text-titleText">Filters</p>
        </div>
      </div>
    </>
  );
}

export default SearchHeader;

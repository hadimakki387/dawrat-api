"use client";
import { courseInterface } from "@/backend/modules/Courses/courses.interface";
import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import DaCarousel from "@/components/global/carousel/DaCarousel";
import { useAppSelector } from "@/core/StoreWrapper";
import {
  useGetAllCoursesQuery,
  useGetCoursesByUniversityIdQuery
} from "@/core/rtk-query/courses";
import {  useSearchDataQuery } from "@/core/rtk-query/search";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import { useParams } from "next/navigation";
import MissingDataMessage from "../../HomePage/Components/MissingDataMessage";
import CourseCard from "./CourseCard";
import CourseCardSkeleton from "./CourseCardSkeleton";
import DocCard from "./DocCard";
import DocCardSkeleton from "./DocCardSkeleton";
import FiltersDrawer from "./FiltersDrawer";
import SearchHeader from "./SearchHeader";
import { useGetLanguagesQuery, useGetSemestersQuery } from "@/core/rtk-query/aditionalData";

function Search() {
  const param = useParams();
  const search = param?.search;

  const {
    selectedCourse,
    selectedUniversity,
    category,
    searchCourse,
    searchUniversity,
    selectedLanguage,
    selectedSemester
  } = useAppSelector((state) => state.search);

  const { data, isLoading } = useSearchDataQuery({
    title: search as string,
    university: selectedUniversity?.value,
    course: selectedCourse?.value,
    language: selectedLanguage?.value,
    semester: selectedSemester?.value
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
  const {data:languages} = useGetLanguagesQuery()
  const {data:semesters} = useGetSemestersQuery()

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
          <FiltersDrawer
            universities={Universities}
            courses={UniversityCourses || courses}
            languages={languages}
            semesters={semesters}
          />
          <SearchHeader />
          <MissingDataMessage message="No results found" />
        </div>
      ) : (
        <>
          <FiltersDrawer
            universities={Universities}
            courses={UniversityCourses || courses}
            semesters={semesters}
            languages={languages}
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

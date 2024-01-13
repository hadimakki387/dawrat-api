import { courseInterface } from "@/backend/modules/Courses/courses.interface";
import { UniversityInterface } from "@/backend/modules/universities/universities.interface";
import DaButton from "@/components/global/DaButton";
import { useAppSelector } from "@/core/StoreWrapper";
import { faFilter, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setCategory,
  setDrawer,
  setSearchCourse,
  setSearchUniversity,
  setSelectedCourse,
  setSelectedUniversity,
} from "../redux/search-slice";

interface Props {
  universities?: UniversityInterface[];
  courses?: courseInterface[];
}

function SearchHeader({ universities, courses }: Props) {
  const { selectedUniversity, selectedCourse, category } = useAppSelector(
    (state) => state.search
  );
  const UniTitle = universities?.find(
    (university: UniversityInterface) =>
      university?.id === selectedUniversity?.value
  )?.title;
  const CourseTitle = courses?.find(
    (course: courseInterface) => course?.id === selectedCourse?.value
  )?.title;
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={` flex ${
          selectedUniversity || selectedCourse || category
            ? "justify-between"
            : "justify-end"
        } gap-2 items-center mb-4 font-semibold text-titleText`}
      >
        <div className="flex items-center gap-4 max-sm:max-w-[70%] max-sm:flex-wrap">
          {UniTitle && (
            <DaButton
              label={UniTitle || ""}
              endIcon={<FontAwesomeIcon icon={faX} className="text-xs" />}
              className="border border-neutral-300"
              fullRounded
              onClick={() => {
                dispatch(setSelectedUniversity(null));
                dispatch(setSearchUniversity(""));
              }}
            />
          )}
          {CourseTitle && (
            <DaButton
              label={CourseTitle || ""}
              endIcon={<FontAwesomeIcon icon={faX} className="text-xs" />}
              className="border border-neutral-300"
              fullRounded
              onClick={() => {
                dispatch(setSelectedCourse(null));
                dispatch(setSearchCourse(""));
              }}
            />
          )}
          {category && (
            <DaButton
              label={category || ""}
              endIcon={<FontAwesomeIcon icon={faX} className="text-xs" />}
              className="border border-neutral-300"
              fullRounded
              onClick={() => {
                dispatch(setCategory(null));
              }}
            />
          )}
        </div>
        <div
          className="flex flex-col items-center hover:cursor-pointer"
          onClick={() => {
            dispatch(setDrawer(true));
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

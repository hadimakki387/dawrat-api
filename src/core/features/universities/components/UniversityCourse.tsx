import { courseInterface } from "@/backend/modules/Courses/courses.interface";
import Folder from "@/components/SVGs/Folder";
import React from "react";

type Props = {
    Courses:courseInterface[]
};

function UniversityCourse({
    Courses
}: Props) {
  return (
    <div>
      <p className="text-xl font-medium text-titleText mb-4">Courses ({Courses.length})</p>

      <div className="grid grid-cols-2 gap-4">
        {Courses.map((course, index) => {
          return (
            <div
              className="col-span-2 md:col-span-1 p-6 hover:bg-primaryBg hover:cursor-pointer rounded-md transition-all duration-300 flex items-center gap-4"
              key={index}
            >
              <Folder fill="var(--green-text)" size={20} />{" "}
              <span className="text-primary hover:underline font-medium ">
                {course?.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UniversityCourse;

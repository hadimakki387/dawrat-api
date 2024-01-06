"use client";
import { courseInterface } from "@/backend/modules/Courses/courses.interface";
import Folder from "@/components/SVGs/Folder";
import { useAppSelector } from "@/core/StoreWrapper";
import { useUpdateReviewdCoursesMutation } from "@/core/rtk-query/courses";
import { useRouter } from "next/navigation";
import React from "react";

function CourseCard({ course }: { course: courseInterface }) {
  const router = useRouter();
  const [reviewedCourses] = useUpdateReviewdCoursesMutation()
  const {user} = useAppSelector(state=>state.global)
  return (
    <div
      onClick={() => {
        reviewedCourses({
          id: user?.id as string,
          body: {
            course: course.id,
          },
        });
        router.push(`/courses/${course.id}`);
      }}
      className="select-none min-w-[60%] lg:min-w-[25%]  h-44  rounded-2xl border border-neutral-300 p-4 flex flex-col justify-between hover:bg-primaryBg hover:cursor-pointer transition-all duration-200 max-sm:h-36"
    >
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 text-sm text-subTitleText">
          <Folder fill="green" size={20} /> Course
        </div>
        <div className="text-primary text-2xl max-sm:text-lg hover:underline"> {course.title} </div>
      </div>
      <div className="text-subTitleText max-sm:text-sm">{course.universityName}</div>
    </div>
  );
}

export default CourseCard;

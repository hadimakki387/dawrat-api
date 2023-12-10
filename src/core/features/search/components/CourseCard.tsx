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
      className="w-1/3 h-44 rounded-2xl border border-neutral-300 p-4 flex flex-col justify-between hover:bg-primaryBg hover:cursor-pointer transition-all duration-200"
    >
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 text-sm text-subTitleText">
          <Folder fill="green" size={20} /> Course
        </div>
        <div className="text-primary text-2xl"> {course.title} </div>
      </div>
      <div className="text-subTitleText">{course.universityName}</div>
    </div>
  );
}

export default CourseCard;

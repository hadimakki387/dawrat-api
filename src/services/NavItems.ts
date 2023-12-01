//check the items in sideBar and add them here as navItems with the probability of having subItems
import AI from "@/components/SVGs/AI";
import Book from "@/components/SVGs/Book";
import Clock from "@/components/SVGs/Clock";
import Folder from "@/components/SVGs/Folder";
import Home from "@/components/SVGs/Home";
import Questions from "@/components/SVGs/Questions";
import StudyList from "@/components/SVGs/StudyList";
import { useGetUserQuery } from "@/core/rtk-query/auth";
import { useGetManyCoursesQuery } from "@/core/rtk-query/courses";
import { useGetManyDocumentsByIdQuery } from "@/core/rtk-query/documents";
import Cookies from "js-cookie";

interface items {
  label: string;
  path: string;
  icon: any;
  hasSubItems?: boolean;
}

// get User through the id in cookies

export const NavItems = () => {
  const id = Cookies.get("dawratUserId");
  const { data: user, isSuccess, isLoading, isError } = useGetUserQuery(id);
  const { data: courses } = useGetManyCoursesQuery(user.reviewedCourses, {
    skip: !user,
  });

  const {data:reviewedDocuments} = useGetManyDocumentsByIdQuery(user.reviewedDocuments, {
    skip: !user,
  });

  if (user && courses && reviewedDocuments)
    return [
      {
        title: "",
        links: [
          {
            label: "Home",
            path: "/",
            icon: Home,
          },
          {
            label: "Ask AI",
            path: "/ask-ai",
            icon: AI,
          },
        ],
      },
      {
        title: "My Library",
        links: [
          {
            label: "Courses",
            path: "/courses",
            icon: Folder,
            hasSubItems: true,
            subItems: courses,
          },
          {
            label: "Books",
            path: "/books",
            icon: Book,
            hasSubItems: true,
            subItems: [],
          },
          {
            label: "Studylists",
            path: "/study-lists",
            icon: StudyList,
            hasSubItems: true,
            subItems: [],
          },
          {
            label: "Questions",
            path: "/questions",
            icon: Questions,
          },
          {
            label: "Recent Documents",
            path: "/recent-documents",
            icon: Clock,
            hasSubItems: true,
            subItems: reviewedDocuments,
          },
        ],
      },
    ];
};

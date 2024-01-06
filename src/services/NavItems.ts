//check the items in sideBar and add them here as navItems with the probability of having subItems
import AI from "@/components/SVGs/AI";
import Book from "@/components/SVGs/Book";
import Clock from "@/components/SVGs/Clock";
import Folder from "@/components/SVGs/Folder";
import Home from "@/components/SVGs/Home";
import Questions from "@/components/SVGs/Questions";
import StudyList from "@/components/SVGs/StudyList";
import { useGetStudylistQuery, useGetUserQuery } from "@/core/rtk-query/user";
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
  const { data: user, isSuccess, isLoading, isError } = useGetUserQuery(id as string);
  const { data: courses } = useGetManyCoursesQuery(user?.reviewedCourses as string[], {
    skip: !user,
  });
  const {data:studyList} = useGetStudylistQuery(id as string);

  const { data: reviewedDocuments } = useGetManyDocumentsByIdQuery(
    { body: user?.reviewedDocuments as string[], limit: 3 },
    {
      skip: !user,
    }
  );

  if (user && courses && reviewedDocuments && studyList)
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
            label: "Studylists",
            path: "/study-lists",
            icon: StudyList,
            hasSubItems: true,
            subItems: studyList,
          },
          {
            label: "Questions",
            path: "/questions",
            icon: Questions,
          },
          {
            label: "Recent Documents",
            path: "/pdf",
            icon: Clock,
            hasSubItems: true,
            subItems: reviewedDocuments,
          },
        ],
      },
    ];
};

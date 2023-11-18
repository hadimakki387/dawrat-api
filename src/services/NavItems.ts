//check the items in sideBar and add them here as navItems with the probability of having subItems
import AI from "@/components/SVGs/AI";
import Book from "@/components/SVGs/Book";
import Folder from "@/components/SVGs/Folder";
import Home from "@/components/SVGs/Home";
import { useGetUserQuery } from "@/core/rtk-query/auth";
import Cookies from "js-cookie";

// get User through the id in cookies
const items = [
    {
        label: "Home",
        path: "/",
        icons: Home,
      },
      {
        label: "Ask AI",
        path: "experts",
        icon: AI,
      },
      {
        label: "Courses",
        path: "courses",
        icon: Folder,
        subItems: [],
      },
      {
        label: "Books",
        path: "books",
        icon: Book,
        subItems: [],
      },
      {
        label: "Studylists",
        path: "studylists",
        icon: Folder,
        subItems: [],
      },
      {
        label: "Questions",
        path: "questions",
        icon: Folder,
        subItems: [],
      },
      {
        label: "Recent Documents",
        path: "recent-documents",
        icon: Folder,
        subItems: [],
      },
      
]

export const NavItems = () => {
    //we can get the data from the database
  return items;
};

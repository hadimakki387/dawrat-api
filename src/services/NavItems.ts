//check the items in sideBar and add them here as navItems with the probability of having subItems
import AI from "@/components/SVGs/AI";
import Book from "@/components/SVGs/Book";
import Clock from "@/components/SVGs/Clock";
import Folder from "@/components/SVGs/Folder";
import Home from "@/components/SVGs/Home";
import Questions from "@/components/SVGs/Questions";
import StudyList from "@/components/SVGs/StudyList";

interface items {
  label: string;
  path: string;
  icon: any;
  hasSubItems?: boolean;
}

// get User through the id in cookies
const items = [
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
        subItems: [{ title: "course 1", id: 1 },{ title: "course 2", id: 2 }],
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
        path: "/studylists",
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
        subItems: [],
      },
    ],
  },
];

export const NavItems = () => {
  //we can get the data from the database
  return items;
};

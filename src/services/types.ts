import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { IconProps } from "@mui/material";
import { ReactNode } from "react";

export interface DropdownValue {
  value: any;
  label: string;
  group?: string;
  priority?: number;
}

export interface UserI {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  university: {
    id: string;
    title: string;
    abr: string;
  };
  domain: {
    id: string;
    title: string;
    university: string;
  };
  currentYearOfStudying: string;
  phone: string;
  uploads: number;
  reviewedDocuments: string[];
  reviewedCourses: string[];
  questionsCount: number;
  studylist: string[];
  likedDocuments: string[];
  dislikedDocuments: string[];
  followedCourses: string[];
}

export interface MenuItemType {
  name: string;
  icon?: any;
  suffix?: ReactNode;
  onClick: () => void;
  className?: string;
}

export interface DocumentI {
  _id: string;
  id: string;
  title: string;
  description: string;
  domain: string;
  university: string;
  year: string;
  course: string;
  ownerId: string;
  doc: {
    name: string;
    size: number;
    key: string;
    url: string;
  };
  createdAt: string;
  modifiedAt: string;
  courseName: string;
  upvotes: number;
  downvotes: number;
  universityName: string;
  language: string;
}

export interface sideBarInterface {
  title: string;
  label: string;
  path: string;
  icon: any;
  hasSubItems: boolean;
  subItems: any;
}

export interface UploadThingResponse {
  url: string;
  name: string;
  size: number;
  key: string;
}

export interface YearInterface{
  id: string;
  title: string;
  year: string;
  _id: string;
}
export interface LanguageInterface{
  id?: string;
  title: string;
  _id?: string;
  abr: string;
}
export interface SemesterInterface{
  id?: string;
  title: string;
  _id?: string;
  value: number;
}
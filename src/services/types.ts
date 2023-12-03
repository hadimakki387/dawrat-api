import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { IconProps } from "@mui/material";
import { ReactNode } from "react";

export interface DropdownValue {
    value: any;
    label: string;
    group?: string;
    priority?: number;
  }

 export  interface UserI{
    id:string ;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    university: {
      id:string;
      title:string;
      abr:string;
    };
    domain: string;
    currentYearOfStudying: string;
    phone?: string;
    uploads?: number;
    reviewedDocuments?: string[];
    reviewedCourses?: string[];
  }

  export interface MenuItemType {
    name: string;
    icon?: any;
    suffix?: ReactNode;
    onClick: () => void;
    className?:string;
  }

  export interface DocumentI{
    id:string;
    title:string;
    description:string;
    course:string;
    domain:string;
    university:string;
    ownerId:string;
    documents:string[];
    url:string;
    createdAt:string;
    updatedAt:string;
    domainTitle:string;
    courseTitle:string;
  }
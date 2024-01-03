"use client";
import SearchInput from "@/components/global/SearchInput";
import { useParams } from "next/navigation";
import React from "react";
import UniversityHeader from "./UniversityHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import DaCarousel from "@/components/global/carousel/DaCarousel";
import ItemCard from "../../HomePage/Components/ItemCard";
import Folder from "@/components/SVGs/Folder";
import PopularDocuments from "./PopularDocuments";
import RecentDocuments from "./RecentDocuments";
import UniversityCourse from "./UniversityCourse";
import { Divider } from "@mui/material";
import DocsAnalytics from "./DocsAnalytics";

type Props = {};

function UniversityPage({}: Props) {
  const id = useParams()?.id;
  const doc = {
    id: "6579f539ec4891f842e1aa66",
    _id: "6579f539ec4891f842e1aa66",
    title: "test upload 4",
    description: "Doloribus est ipsum",
    domain: "6564f28d0b89eef46d9fefaa",
    university: "65630baf41254c84abc07117",
    course: "6565035ef02b60f1709e7cd5",
    ownerId: "65573975d1514963f263b311",
    documents: [],
    createdAt: "2023-12-13T18:08:13.464Z",
    modifiedAt: "2023-12-13T18:08:13.464Z",
    upvotes: 3,
    downvotes: 1,
    courseName: "algebra",
    universityName: "Lebanese University",
    doc: {
      name: "2017-2018.pdf",
      size: 609874,
      key: "1168719d-602e-44e5-9cdd-b846b37d8318-4f20uq.pdf",
      url: "https://utfs.io/f/1168719d-602e-44e5-9cdd-b846b37d8318-4f20uq.pdf",
    },
    currentYearOfStudying: "1",
  };
  const dataArr = Array.from(Array(8)).map((_, index) => {
    return doc;
  });
  const CoursesData = Array.from(Array(8)).map((_, index) => {
    return {
      _id: "1",
      id: "1",
      title: "Introduction to Programming",
      description: "This course introduces the basics of programming.",
      domain: "Computer Science",
      university: "Harvard University",
      ownerId: "123",
      createdAt: "2022-01-01T00:00:00Z",
      updatedAt: "2022-01-02T00:00:00Z",
      universityName: "Harvard University",
      docsCount: 10,
    };
  });
  return (
    <div className="lg:relative lg:mr-8 space-y-8 lg:mb-12">
      <UniversityHeader />
      <div className=" lg:px-40 space-y-8">
        <p className="font-medium flex items-center gap-2">
          <span className="text-primary hover:underline hover:cursor-pointer">
            University
          </span>
          <FontAwesomeIcon
            icon={faAngleRight}
            className="text-sm text-subTitleText"
          />
          <span className="text-subTitleText">Lebanese University</span>
        </p>
        <div className="flex items-start gap-4 max-lg:flex-col">
          <div className="lg:w-[70%] w-full space-y-8">
            <PopularDocuments docs={dataArr} />
            <RecentDocuments docs={dataArr} />
            <UniversityCourse Courses={CoursesData} />
          </div>
          <div className="lg:w-[30%] w-full border border-neutral-300 rounded-2xl p-4 space-y-4 mt-8">
            <DocsAnalytics
              documentsCount={dataArr.length}
              coursesCounts={CoursesData.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversityPage;

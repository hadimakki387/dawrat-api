"use client";
import DaButton from "@/components/global/DaButton";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetCoursesByUserIdQuery } from "@/core/rtk-query/courses";
import {
  useGetDocumentsByOwnerIdQuery,
  useGetManyDocumentsByIdQuery,
} from "@/core/rtk-query/documents";
import { faChartLine, faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  setDeleteDocumentDialog,
  setEditDocumentDialog,
  setSelectedDoc,
} from "../redux/profile-slice";
import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import { useRouter } from "next/navigation";

function UploadedDocs() {
  const { user } = useAppSelector((state) => state.global);
  const { data, isLoading } = useGetDocumentsByOwnerIdQuery(user?.id as string);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className=" bg-white rounded-sm border border-neutral-200  my-8 relative h-[20rem] overflow-hidden">
      <div className="absolute text-darkText font-semibold top-0 w-full flex items-center p-4 px-8 pr-11 bg-white border-b border-neutral-200 max-md:px-4 max-md:pr-11 max-md:text-sm">
        <div className="w-2/3 max-md:w-1/2">Title</div>
        <div className="w-1/3 flex items-center max-md:w-1/2 max-sm:hidden">
          <div className="w-1/4">Views</div>
          <div className="w-1/4">Rating</div>
          <div className="w-1/2 flex items-center">
            <div className="w-1/2">Delete</div>
            <div className="w-1/2">Edit</div>
          </div>
        </div>
        <div className="w-1/3 flex items-center max-md:w-1/2 sm:hidden ml-3">
          <div className="w-1/4 mr-2">
            <FontAwesomeIcon icon={faEye} className="text-xs text-titleText" />
          </div>
          <div className="w-1/4"><FontAwesomeIcon icon={faChartLine} className="text-xs text-titleText" /></div>
          <div className="w-1/2 flex items-center">
            <div className="w-1/2"></div>
            <div className="w-1/2"></div>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto h-full p-4 pt-16 max-md:p-0 max-md:pt-14">
        {!isLoading ? (
          data?.map((doc: DocumentInterface) => {
            return (
              <div
                key={doc.id}
                className="p-4 border-b border-neutral-200 w-full flex items-center text-titleText font-medium "
              >
                <div className="w-2/3 text-primary hover:underline hover:cursor-pointer max-md:w-1/2 max-md:text-sm md:hidden">
                  {doc?.title.length > 17
                    ? `${doc?.title.slice(0, 17)}...`
                    : doc?.title}
                </div>
                <div
                  className="w-2/3 text-primary hover:underline hover:cursor-pointer max-md:w-1/2 max-md:text-sm max-md:hidden"
                  onClick={() => {
                    router.push(`/pdf/${doc?.id}`);
                  }}
                >
                  {doc?.title}
                </div>
                <div className="w-1/3 flex items-center max-md:w-1/2 max-md:text-sm">
                  <div className="w-1/4">0</div>
                  <div className="w-1/4">{doc?.upvotes}</div>
                  <div className="w-1/2 flex items-center">
                    <div className="w-1/2">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="text-titleText hover:cursor-pointer hover:text-error transition-all duration-200"
                        onClick={() => {
                          dispatch(setSelectedDoc(doc));
                          dispatch(setDeleteDocumentDialog(true));
                        }}
                      />
                    </div>
                    <div className="w-1/2">
                      <FontAwesomeIcon
                        icon={faPen}
                        className="text-titleText hover:cursor-pointer hover:text-primary transition-all duration-200"
                        onClick={() => {
                          dispatch(setSelectedDoc(doc));
                          dispatch(setEditDocumentDialog(true));
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadedDocs;

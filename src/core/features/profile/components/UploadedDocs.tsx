"use client";
import DaButton from "@/components/global/DaButton";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetCoursesByUserIdQuery } from "@/core/rtk-query/courses";
import {
  useGetDocumentsByOwnerIdQuery,
  useGetManyDocumentsByIdQuery,
} from "@/core/rtk-query/documents";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  setDeleteDocumentDialog,
  setSelectedDoc,
} from "../redux/profile-slice";

function UploadedDocs() {
  const { user } = useAppSelector((state) => state.global);
  const { data, isLoading } = useGetDocumentsByOwnerIdQuery(user?.id as string);
  const dispatch = useDispatch();
  return (
    <div className=" bg-white rounded-sm border border-neutral-200  my-8 relative h-[20rem] overflow-hidden">
      <div className="absolute text-darkText font-semibold top-0 w-full flex items-center p-4 px-8 pr-11 bg-white border-b border-neutral-200">
        <div className="w-2/3">Title</div>
        <div className="w-1/3 flex items-center">
          <div className="w-1/4">Views</div>
          <div className="w-1/4">Rating</div>
          <div className="w-1/2">Delete</div>
        </div>
      </div>
      <div className="overflow-y-auto h-full p-4 pt-16 ">
        {!isLoading ? (
          data?.map((doc) => {
            return (
              <div
                key={doc.id}
                className="p-4 border-b border-neutral-200 w-full flex items-center text-titleText font-medium"
              >
                <div className="w-2/3 text-primary hover:underline hover:cursor-pointer">
                  {doc?.title}
                </div>
                <div className="w-1/3 flex items-center">
                  <div className="w-1/4">0</div>
                  <div className="w-1/4">{doc?.upvotes}</div>
                  <div className="w-1/2">
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-titleText hover:cursor-pointer hover:text-error transition-all duration-200"
                      onClick={() => {
                        dispatch(setSelectedDoc(doc?.doc));
                        dispatch(setDeleteDocumentDialog(true));
                      }}
                    />
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

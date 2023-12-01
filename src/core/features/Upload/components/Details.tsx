"use client";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import { useAppSelector } from "@/core/StoreWrapper";
import React, { useEffect, useState } from "react";
import {
  setSearchCourse,
  setSearchDomain,
  setSearchUploadUniversity,
  setSelectedCourse,
  setSelectedDomain,
  setSelectedUniversity,
  setUploadedDocs,
} from "../redux/upload-slice";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import Institution from "@/components/SVGs/Institution";
import DaCard from "@/components/SVGs/DaCard";
import Document from "@/components/SVGs/Document";
import Convert from "convert-units";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDeleteUploadedPdfMutation } from "@/core/rtk-query/upload";
import { generateToast, updateToast } from "@/services/global-function";
import { ToastType } from "@/services/constants";
import { useDispatch } from "react-redux";
import { set } from "mongoose";
import {
  useGetCoursesByDomainIdQuery,
  useGetCoursesByUniversityIdQuery,
} from "@/core/rtk-query/courses";
import Folder from "@/components/SVGs/Folder";
import { CircularProgress } from "@mui/material";
import { useGetDomainsUsingUniversityIdQuery } from "@/core/rtk-query/domain";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useFormik } from "formik";
import * as Yup from "yup";

function Details() {
  const dispatch = useDispatch();
  const {
    searchUploadUniversity,
    selectedUniversity,
    uploadedDocs,
    selectedCourse,
    selectedDomain,
  } = useAppSelector((state) => state.upload);
  const { data } = useGetUniversitiesQuery({
    title: searchUploadUniversity,
    limit: 5,
  });
  const { data: courses, isLoading: loadingCourse } =
    useGetCoursesByDomainIdQuery(selectedDomain, {
      skip: !selectedDomain,
    });
  const { data: domains, isLoading: loadingDomains } =
    useGetDomainsUsingUniversityIdQuery(selectedUniversity, {
      skip: !selectedUniversity,
    });

  const storedDocs = localStorage.getItem("uploadedDocs");
  const parsedStoredDocs = storedDocs && JSON.parse(storedDocs);

  useEffect(() => {
    console.log(parsedStoredDocs);
    if (parsedStoredDocs?.length > 0) {
      dispatch(setUploadedDocs(parsedStoredDocs));
    }
  }, []);

  const [deleteUploadedPdf] = useDeleteUploadedPdfMutation();

  console.log("this is selected Course");
  console.log(selectedCourse);

  const formik = useFormik({
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
      university: Yup.string().required("University is required"),
    }),
    initialValues: {
      description: "",
      university: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });



  return (
    <div className="border border-neutral-300 rounded-2xl p-8 flex flex-col  gap-4">
      {uploadedDocs?.length > 0
        ? uploadedDocs?.map((doc, index) => {
            return (
              <div className="flex justify-between items-center" key={index}>
                <div className="flex items-center gap-2 ">
                  <div>
                    <Document
                      fill="var(--icon-bg)"
                      patternFill="var(--primary)"
                      width="40px"
                      height="40px"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="text-darkText">{doc.name}</div>
                    <div className="text-xs text-subTitleText">
                      {Convert(doc.size).from("B").to("MB").toFixed(2)} MB{" "}
                    </div>
                  </div>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="text-primary w-12 hover:cursor-pointer"
                    onClick={() => {
                      const id = generateToast({
                        message: "Deleting Document",
                        toastType: ToastType.default,
                        isLoading: true,
                      });
                      deleteUploadedPdf([doc.key])
                        .unwrap()
                        .then((res) => {
                          console.log(res);
                          updateToast(id, "Document Deleted", {
                            toastType: ToastType.success,
                            isLoading: false,
                            duration: 2000,
                          });

                          dispatch(
                            setUploadedDocs(
                              uploadedDocs.filter(
                                (item: any) => item.key !== doc.key
                              )
                            )
                          );
                          localStorage.setItem(
                            "uploadedDocs",
                            JSON.stringify(
                              uploadedDocs.filter(
                                (item: any) => item.key !== doc.key
                              )
                            )
                          );
                        })
                        .catch((err) => {
                          console.log(err);
                          updateToast(id, `${err.data.message}`, {
                            toastType: ToastType.success,
                            isLoading: false,
                            duration: 2000,
                          });
                        });
                    }}
                  />
                </div>
              </div>
            );
          })
        : null}
      <div className="w-full h-[1px] bg-neutral-400"></div>
      <div className="w-full space-y-4">
        <div className="mb-8 flex flex-col gap-4">
          <p >Enter University Title</p>
          <div>
            <TextFieldComponent
              placeholder="Title"
              name="description"
              formik={formik}
            />
          </div>
          <p>Enter University Description</p>
          <div>
            <TextFieldComponent placeholder="Description" />
          </div>
        </div>
        <div className="flex items-center w-full">
          <div className="w-[15vw] flex items-center gap-4">
            <Institution
              fill="var(--sub-title-text)"
              upperFill="var(--title-text)"
              width="20px"
              height="20px"
            />
            <p>University</p>
          </div>
          <div className="w-full">
            <AutoCompleteSearch
              data={data}
              placeholder="Search for your university"
              setSearch={setSearchUploadUniversity}
              setSelectedItem={setSelectedUniversity}
              style={{ borderRadius: "0.7rem" }}
              className="mr-4 p-1"
              name="university"
              formik={formik}
            />
          </div>
          <div
            className="text-sm text-primary w-32 hover:cursor-pointer text-right"
            onClick={() => console.log("clicked")}
          >
            Add University
          </div>
        </div>

        {loadingDomains ? (
          <div className="w-full flex justify-center items-center m-auto">
            <CircularProgress size={30} />
          </div>
        ) : (
          domains && (
            <div className="flex items-center w-full">
              <div className="w-[15vw] flex items-center gap-4">
                <Folder
                  fill="var(--sub-title-text)"
                  width="20px"
                  height="20px"
                />
                <p>Domain</p>
              </div>
              <div className="w-full">
                <AutoCompleteSearch
                  data={domains}
                  placeholder="Search for course"
                  setSearch={setSearchDomain}
                  setSelectedItem={setSelectedDomain}
                  style={{ borderRadius: "0.7rem" }}
                  className="mr-4 p-1"
                />
              </div>
              <div
                className="text-sm text-primary w-32 hover:cursor-pointer text-right"
                onClick={() => console.log("clicked")}
              >
                Add Domain
              </div>
            </div>
          )
        )}

        {loadingCourse ? (
          <div className="w-full flex justify-center items-center m-auto">
            <CircularProgress size={30} />
          </div>
        ) : (
          courses && (
            <div className="flex items-center w-full">
              <div className="w-[15vw] flex items-center gap-4">
                <Folder
                  fill="var(--sub-title-text)"
                  width="20px"
                  height="20px"
                />
                <p>Course</p>
              </div>
              <div className="w-full">
                <AutoCompleteSearch
                  data={courses}
                  placeholder="Search for course"
                  setSearch={setSearchCourse}
                  setSelectedItem={setSelectedCourse}
                  style={{ borderRadius: "0.7rem" }}
                  className="mr-4 p-1"
                />
              </div>
              <div
                className="text-sm text-primary w-32 hover:cursor-pointer text-right"
                onClick={() => console.log("clicked")}
              >
                Add Course
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Details;

"use client";
import { courseInterface } from "@/backend/modules/Courses/courses.interface";
import Document from "@/components/SVGs/Document";
import Folder from "@/components/SVGs/Folder";
import Institution from "@/components/SVGs/Institution";
import DaAutocomplete from "@/components/global/DaAutoComplete";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetCoursesByDomainIdQuery } from "@/core/rtk-query/courses";
import { useGetDomainsUsingUniversityIdQuery } from "@/core/rtk-query/domain";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import { useDeleteUploadedPdfMutation } from "@/core/rtk-query/upload";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Convert from "convert-units";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  setAddCourseDialog,
  setAddDomainDialog,
  setMultipleUploadedDocs,
  setSelectedCourse,
  setSelectedDomain,
  setSelectedLanguage,
  setSelectedSemester,
  setSelectedUniversity,
  setSelectedYear,
} from "../redux/upload-slice";
import UploadedDocCard from "./UploadedDocCard";
import { useCreateManyDocumentsMutation } from "@/core/rtk-query/documents";
import { setUser } from "../../global/redux/global-slice";
import {
  useGetLanguagesQuery,
  useGetSemestersQuery,
  useGetYearsQuery,
} from "@/core/rtk-query/aditionalData";

type Props = {};

function MultipleUploadDetails({}: Props) {
  const {
    searchUploadUniversity,
    selectedUniversity,
    uploadedDocs,
    selectedCourse,
    selectedDomain,
    handleMultiSubmit,
    selectedYear,
    selectedLanguage,
    selectedSemester,
  } = useAppSelector((state) => state.upload);
  const { user } = useAppSelector((state) => state.global);
  const { data } = useGetUniversitiesQuery({
    title: searchUploadUniversity,
  });
  const { data: domains, isLoading: loadingDomains } =
    useGetDomainsUsingUniversityIdQuery(selectedUniversity?.value as string, {
      skip: !selectedUniversity?.value ? true : false,
    });
  const { data: courses, isLoading: loadingCourse } =
    useGetCoursesByDomainIdQuery(selectedDomain?.value as string, {
      skip: !selectedDomain?.value ? true : false,
    });
  const { data: years } = useGetYearsQuery();
  const { data: languages } = useGetLanguagesQuery();
  const { data: semesters } = useGetSemestersQuery();
  const { multipleUploadedDocs } = useAppSelector((state) => state.upload);
  const dispatch = useDispatch();
  const storedDocs = localStorage.getItem("multiUploadedDocs");
  const parsedStoredDocs = storedDocs && JSON.parse(storedDocs);
  const [uploadManyDocs] = useCreateManyDocumentsMutation();

  useEffect(() => {
    if (parsedStoredDocs?.length > 0) {
      dispatch(setMultipleUploadedDocs(parsedStoredDocs));
    }
  }, []);

  useEffect(() => {
    const uploadedDocs = multipleUploadedDocs?.map((doc) => ({
      name: doc?.name,
      size: doc?.size,
      key: doc?.key,
      url: doc?.url,
    }));
    if (handleMultiSubmit !== 0) {
      const id = toast.loading("Uploading...");
      uploadManyDocs({
        docs: uploadedDocs,
        university: selectedUniversity?.value as string,
        domain: selectedDomain?.value as string,
        course: selectedCourse?.value as string,
        ownerId: user?.id,
        year: selectedYear?.value as string,
        language: selectedLanguage?.value as string,
        semester: selectedSemester?.value as string,
      })
        .unwrap()
        .then((res) => {
          toast.dismiss(id);
          toast.success("Uploaded");
          dispatch(setMultipleUploadedDocs([]));
          localStorage.removeItem("multiUploadedDocs");
          dispatch(setUser({ ...user, uploads: res.updatedUser.uploads }));
        })
        .catch((err) => {
          toast.dismiss(id);
          toast.error(`${err?.data?.message}`);
        });
    }
  }, [handleMultiSubmit]);

  return (
    <div className="space-y-4">
      {multipleUploadedDocs?.length > 0
        ? multipleUploadedDocs?.map((doc: any, index: number) => {
            return (
              <Fragment key={index}>
                <UploadedDocCard doc={doc} />
                <div className="w-full h-[1px] bg-neutral-400"></div>
              </Fragment>
            );
          })
        : null}
      <div className="w-full space-y-4">
        <div className="flex items-center w-full max-md:flex-col gap-4">
          <div className="w-[15vw] flex items-center gap-4 max-md:w-full">
            <Institution
              fill="var(--sub-title-text)"
              upperFill="var(--title-text)"
              size={20}
            />
            <p>Year</p>
          </div>
          <div className="w-full">
            <DaAutocomplete
              options={
                years?.map((item) => ({
                  value: item?.id,
                  label: item?.title,
                })) || [
                  {
                    label: "loading...",
                    value: "",
                  },
                ]
              }
              label="Select Document Year"
              onChange={(e) => {
                dispatch(setSelectedYear(e));
              }}
              name="university"
            />
            {!selectedYear?.value && (
              <p className="text-sm text-error font-semibold">
                Please Select the year
              </p>
            )}
          </div>
          <div
            className="text-sm text-primary w-32 hover:cursor-pointer text-right"
            // onClick={() => {
            //   dispatch(setAddUniverisityDialog(true));
            // }}
          >
            {/* Add University */}
          </div>
        </div>
        <div className="flex items-center w-full max-md:flex-col gap-4">
          <div className="w-[15vw] flex items-center gap-4 max-md:w-full">
            <Institution
              fill="var(--sub-title-text)"
              upperFill="var(--title-text)"
              size={20}
            />
            <p>Semester</p>
          </div>
          <div className="w-full">
            <DaAutocomplete
              options={
                semesters?.map((item) => ({
                  value: item?.id,
                  label: item?.title,
                })) || [
                  {
                    label: "loading...",
                    value: "",
                  },
                ]
              }
              label="What semester is this pdf?"
              onChange={(e) => {
                dispatch(setSelectedSemester(e));
              }}
              name="university"
            />
            {!selectedSemester?.value && (
              <p className="text-sm text-error font-semibold">
                Please Select the semester
              </p>
            )}
          </div>
          <div
            className="text-sm text-primary w-32 hover:cursor-pointer text-right"
            // onClick={() => {
            //   dispatch(setAddUniverisityDialog(true));
            // }}
          >
            {/* Add University */}
          </div>
        </div>
        <div className="flex items-center w-full max-md:flex-col gap-4">
          <div className="w-[15vw] flex items-center gap-4 max-md:w-full">
            <Institution
              fill="var(--sub-title-text)"
              upperFill="var(--title-text)"
              size={20}
            />
            <p>Language</p>
          </div>
          <div className="w-full">
            <DaAutocomplete
              options={
                languages?.map((item) => ({
                  value: item?.id,
                  label: item?.title,
                })) || [
                  {
                    label: "loading...",
                    value: "",
                  },
                ]
              }
              label="Select Document Language"
              onChange={(e) => {
                dispatch(setSelectedLanguage(e));
              }}
              name="university"
            />
            {!selectedLanguage?.value && (
              <p className="text-sm text-error font-semibold">
                Please Select the Language
              </p>
            )}
          </div>
          <div
            className="text-sm text-primary w-32 hover:cursor-pointer text-right"
            // onClick={() => {
            //   dispatch(setAddUniverisityDialog(true));
            // }}
          >
            {/* Add University */}
          </div>
        </div>
        <div className="flex items-center w-full max-md:flex-col gap-2">
          <div className="w-[15vw] flex items-center gap-4 max-md:w-full">
            <Institution
              fill="var(--sub-title-text)"
              upperFill="var(--title-text)"
              size={20}
            />
            <p>University</p>
          </div>
          <div className="w-full">
            <DaAutocomplete
              options={
                data?.map((item) => ({
                  value: item?.id,
                  label: item?.title,
                })) || [
                  {
                    label: "loading...",
                    value: "",
                  },
                ]
              }
              label="Search for your university"
              onChange={(e) => {
                dispatch(setSelectedUniversity(e));
              }}
              name="university"
              onInputChange={(e) => {
                console.log(e);
              }}
            />
            {!selectedUniversity?.value && (
              <p className="text-sm text-error font-semibold">
                Please Select University
              </p>
            )}
          </div>
          <div
            className="text-sm text-primary w-32 hover:cursor-pointer text-right"
            // onClick={() => {
            //   dispatch(setAddUniverisityDialog(true));
            // }}
          >
            {/* Add University */}
          </div>
        </div>
        <div className="flex items-center w-full max-md:flex-col gap-2">
          <div className="md:w-[15vw] flex items-center justify-between max-md:w-full">
            <div className=" flex items-center gap-4 ">
              <Folder fill="var(--sub-title-text)" size={20} />
              <p>Domain</p>
            </div>
            <div
              className={`text-sm text-primary w-32 hover:cursor-pointer text-right md:hidden ${
                !selectedUniversity && "hover:cursor-not-allowed "
              }`}
              onClick={() => {
                if (selectedUniversity) dispatch(setAddDomainDialog(true));
              }}
            >
              Add Domain
            </div>
          </div>
          <div className={`w-full `}>
            <DaAutocomplete
              options={
                domains?.map((item) => ({
                  value: item?.id,
                  label: item?.title,
                })) || [
                  {
                    label: "loading...",
                    value: "",
                  },
                ]
              }
              label="Search for your domain"
              onChange={(e) => {
                dispatch(setSelectedDomain(e));
              }}
              name="domain"
            />
            {!selectedDomain?.value && (
              <p className="text-sm text-error font-semibold">
                Please Select Domain
              </p>
            )}
          </div>
          <div
            className={`text-sm text-primary w-32 hover:cursor-pointer text-right max-md:hidden ${
              !selectedUniversity && "hover:cursor-not-allowed "
            }`}
            onClick={() => {
              if (selectedUniversity) dispatch(setAddDomainDialog(true));
            }}
          >
            Add Domain
          </div>
        </div>
        <div className="flex items-center w-full max-md:flex-col gap-2">
          <div className="md:w-[15vw] flex items-center justify-between max-md:w-full">
            <div className=" flex items-center gap-4 ">
              <Folder fill="var(--sub-title-text)" size={20} />
              <p>Course</p>
            </div>
            <div
              className={`text-sm text-primary w-32 hover:cursor-pointer text-right md:hidden ${
                !selectedDomain && "hover:cursor-not-allowed "
              }`}
              onClick={() => {
                if (selectedDomain) dispatch(setAddCourseDialog(true));
              }}
            >
              Add Course
            </div>
          </div>
          <div className="w-full">
            <DaAutocomplete
              options={
                courses?.map((item: courseInterface) => ({
                  value: item?.id,
                  label: item?.title,
                })) || [
                  {
                    label: "loading...",
                    value: "",
                  },
                ]
              }
              label="Search for your Course"
              onChange={(e) => {
                dispatch(setSelectedCourse(e));
              }}
              name="course"
            />
            {!selectedCourse?.value && (
              <p className="text-sm text-error font-semibold">
                Please Select Course
              </p>
            )}
          </div>
          <div
            className={`text-sm text-primary w-32 hover:cursor-pointer text-right max-md:hidden ${
              !selectedDomain && "hover:cursor-not-allowed "
            }`}
            onClick={() => {
              if (selectedDomain) dispatch(setAddCourseDialog(true));
            }}
          >
            Add Course
          </div>
        </div>
        <div className="text-xs text-error font-semibold">
          <p>
            NOTE: IF ANY OF THE OPTIONS GOES WRONG PLEASE REFRESH THE PAGE OR
            RESELECT THE SECTION WITH ERROR
          </p>
          {/* <p>
            NOTE: IF YOU WANT TO ADD A SOLUTION GO TO PROFILE CHECK YOU&apos;RE
            PROFILE <br /> {"->"} GO TO THE DOCUMENT YOU UPLOADED <br /> {"->"} YOU WILL SEE
            AN UPLOAD SOLUTION BUTTON
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default MultipleUploadDetails;

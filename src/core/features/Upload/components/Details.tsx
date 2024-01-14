"use client";
import { courseInterface } from "@/backend/modules/Courses/courses.interface";
import Document from "@/components/SVGs/Document";
import Folder from "@/components/SVGs/Folder";
import Institution from "@/components/SVGs/Institution";
import DaAutocomplete from "@/components/global/DaAutoComplete";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetCoursesByDomainIdQuery } from "@/core/rtk-query/courses";
import { useCreateDocumentMutation } from "@/core/rtk-query/documents";
import { useGetDomainsUsingUniversityIdQuery } from "@/core/rtk-query/domain";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import { useDeleteUploadedPdfMutation } from "@/core/rtk-query/upload";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Convert from "convert-units";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from "yup";
import { setUser } from "../../global/redux/global-slice";
import {
  setAddCourseDialog,
  setAddDomainDialog,
  setSelectedCourse,
  setSelectedDomain,
  setSelectedUniversity,
  setUploadedDocs
} from "../redux/upload-slice";
import AddCourseDialog from "./AddCourseDialog";
import AddDomainDialog from "./AddDomainDialog";
import CreateUniversityDialog from "./CreateUniversityDialog";

function Details() {
  const dispatch = useDispatch();
  const formik = useFormik({
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    initialValues: {
      title: "",
      description: "",
      university: {
        label: "",
        value: "",
      },
      domain: {
        label: "",
        value: "",
      },
    },
    onSubmit: (values) => {
      const id = toast.loading("Uploading Document");

      const { serverData, ...actualDoc } = uploadedDocs[0];
      createDocument({
        title: values.title,
        description: values.description,
        university: selectedUniversity?.value,
        domain: selectedDomain?.value,
        course: selectedCourse?.value,
        ownerId: user?.id,
        doc: {
          name: actualDoc?.name,
          size: actualDoc?.size,
          key: actualDoc?.key,
          url: actualDoc?.url,
        },
      })
        .unwrap()
        .then((res) => {
          toast.dismiss(id);
          toast.success("Document Uploaded");
          localStorage.setItem("uploadedDocs", "");
          dispatch(setUploadedDocs([]));
          dispatch(setUser({ ...user, uploads: res.updatedUser.uploads }));
          formik.resetForm();
          
        })
        .catch((err) => {
          toast.dismiss(id);
          toast.error(`${err?.data?.message}`);
        });
    },
  });

  const {
    searchUploadUniversity,
    selectedUniversity,
    uploadedDocs,
    selectedCourse,
    selectedDomain,
    handleSubmit,
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

  const storedDocs = localStorage.getItem("uploadedDocs");
  const parsedStoredDocs = storedDocs && JSON.parse(storedDocs);

  useEffect(() => {
    if (parsedStoredDocs?.length > 0) {
      dispatch(setUploadedDocs(parsedStoredDocs));
    }
  }, []);

  const [createDocument] = useCreateDocumentMutation();

  const [deleteUploadedPdf] = useDeleteUploadedPdfMutation();

  useEffect(() => {
    if (handleSubmit !== 0) formik.handleSubmit();
  }, [handleSubmit]);

  useEffect(() => {
    if (parsedStoredDocs)
      formik.setFieldValue("title", parsedStoredDocs?.name as string);
    if (uploadedDocs.length > 0)
      formik.setFieldValue("title", uploadedDocs[0]?.name);
  }, [uploadedDocs]);

  useEffect(() => {
    if (!selectedUniversity?.value) {
      dispatch(setSelectedCourse(null));
      dispatch(setSelectedDomain(null));
    }
  }, [selectedUniversity]);
  useEffect(() => {
    if (!selectedCourse?.value) {
      dispatch(setSelectedDomain(null));
    }
  }, [selectedCourse]);
  console.log("this is loading University");
  console.log(loadingDomains);

  return (
    <div className="border border-neutral-300 rounded-2xl p-8 flex flex-col  gap-4">
      <AddCourseDialog />
      <AddDomainDialog />
      <CreateUniversityDialog />
      {uploadedDocs?.length > 0
        ? uploadedDocs?.map((doc, index) => {
            return (
              <div className="flex justify-between items-center" key={index}>
                <div className="flex items-center gap-2 ">
                  <div>
                    <Document
                      fill="var(--icon-bg)"
                      patternFill="var(--primary)"
                      size={40}
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
                      const id = toast.loading("Deleting Document");
                      deleteUploadedPdf([doc.key])
                        .unwrap()
                        .then((res) => {
                          toast.dismiss(id);
                          toast.success("Document Deleted");

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
                          formik.resetForm();
                        })
                        .catch((err) => {
                          toast.dismiss(id);
                          toast.error(`${err?.data?.message}`);
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
          <p>Enter Document Title</p>
          <div>
            <TextFieldComponent
              placeholder="Title"
              name="title"
              formik={formik}
            />
          </div>
          <p>Enter Document Description</p>
          <div>
            <TextFieldComponent
              placeholder="Description"
              name="description"
              formik={formik}
            />
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
              options={data?.map((item) => ({
                value: item?.id,
                label: item?.title,
              })) || [{
                label:"loading...",
                value:""
              }]}
             
              getOptionDisabled={()=>data && data.length>0?false:true}
              label="Search for your university"
              onChange={(e) => {
                dispatch(setSelectedUniversity(e));
              }}
              name="university"
              onInputChange={(e)=>{
                console.log(e)
              }}
            />
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
              options={domains?.map((item) => ({
                value: item?.id,
                label: item?.title,
              })) || [{
                label:"loading...",
                value:""
              }]}
              getOptionDisabled={()=>domains && domains.length>0?false:true}
              label="Search for your domain"
              onChange={(e) => {
                dispatch(setSelectedDomain(e));
              }}
              name="domain"
              disabled={!selectedUniversity?.value}
             
            />
   
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
              options={courses?.map((item:courseInterface) => ({
                value: item?.id,
                label: item?.title,
              }))|| [{
                label:"loading...",
                value:""
              }]}
              getOptionDisabled={()=>courses && courses.length>0?false:true}
              label="Search for your Course"
              onChange={(e) => {
                dispatch(setSelectedCourse(e));
              }}
              name="course"
              disabled={!selectedDomain?.value}
            />
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
      </div>
    </div>
  );
}

export default Details;

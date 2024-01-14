"use client";
import Document from "@/components/SVGs/Document";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useCreateSolutionMutation } from "@/core/rtk-query/solutions";
import { useDeleteUploadedPdfMutation } from "@/core/rtk-query/upload";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Convert from "convert-units";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from "yup";
import { setUploadedSolutions } from "../redux/solutions-slice";



function CreateSolutionDetails() {
  const dispatch = useDispatch();
  const {handleSolutionSubmit,uploadedSoutions} = useAppSelector(state=>state.solutions)
  const [createSolution] = useCreateSolutionMutation()
  const params = useParams()
  const docId = params?.id
  const router = useRouter()
  const formik = useFormik({
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      const id = toast.loading("Uploading Document");

      const { serverData, ...actualDoc } = uploadedSoutions[0];
      createSolution({
        title: values.title,
        description: values.description,
        doc: {
          name: actualDoc?.name,
          size: actualDoc?.size,
          key: actualDoc?.key,
          url: actualDoc?.url,
        },
        document:docId as string
      })
        .unwrap()
        .then((res) => {
          toast.dismiss(id);
          toast.success("Document Uploaded");
          localStorage.setItem("uploadedDocs", "");
          dispatch(setUploadedSolutions([]));
          formik.resetForm();
          router.push(`/solutions/${res?.id}`)
        })
        .catch((err) => {
          toast.dismiss(id);
          toast.error(`${err?.data?.message}`);
        });
    },
  });

  const { user } = useAppSelector((state) => state.global);

  const storedDocs = localStorage.getItem("uploadedSolutions");
  const parsedStoredDocs = storedDocs && JSON.parse(storedDocs);

  useEffect(() => {
    if (parsedStoredDocs?.length > 0) {
      dispatch(setUploadedSolutions(parsedStoredDocs));
    }
  }, []);


  const [deleteUploadedPdf] = useDeleteUploadedPdfMutation();

  useEffect(() => {
    if (handleSolutionSubmit !== 0) formik.handleSubmit();
  }, [handleSolutionSubmit]);

  useEffect(() => {
    if (parsedStoredDocs)
      formik.setFieldValue("title", parsedStoredDocs?.name as string);
    if (uploadedSoutions.length > 0)
      formik.setFieldValue("title", uploadedSoutions[0]?.name);
  }, [uploadedSoutions]);


  return (
    <div className="border border-neutral-300 rounded-2xl p-8 flex flex-col  gap-4">
      {uploadedSoutions?.length > 0
        ? uploadedSoutions?.map((doc, index) => {
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
                            setUploadedSolutions(
                              uploadedSoutions.filter(
                                (item: any) => item.key !== doc.key
                              )
                            )
                          );
                          localStorage.setItem(
                            "uploadedDocs",
                            JSON.stringify(
                              uploadedSoutions.filter(
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
      </div>
    </div>
  );
}

export default CreateSolutionDetails;

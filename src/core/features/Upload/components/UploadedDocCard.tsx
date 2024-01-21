"use client";
import Document from "@/components/SVGs/Document";
import { useAppSelector } from "@/core/StoreWrapper";
import { useDeleteUploadedPdfMutation } from "@/core/rtk-query/upload";
import { UploadThingResponse } from "@/services/types";
import { faAngleUp, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import convert from "convert-units";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setMultipleUploadedDocs } from "../redux/upload-slice";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useFormik } from "formik";
import * as Yup from "yup";

type Props = {
  doc: UploadThingResponse;
};

function UploadedDocCard({ doc }: Props) {
  const { multipleUploadedDocs } = useAppSelector((state) => state.upload);
  const dispatch = useDispatch();
  const [deleteUploadedPdf] = useDeleteUploadedPdfMutation();
  const [open, setOpen] = useState(false);
  const formik = useFormik({
    validationSchema: Yup.object({
      title: Yup.string().required("title is required"),
      description: Yup.string().required("description is required"),
    }),
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  useEffect(() => {
    if (open) {
      formik.setFieldValue("title", doc.name);
      formik.setFieldValue("description", doc.name);
    }
  }, [open]);
  return (
    <div>
      {!open ? (
        <div className="flex justify-between items-center">
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
                {convert(doc.size).from("B").to("MB").toFixed(2)} MB{" "}
              </div>
            </div>
          </div>
          <div>
            <FontAwesomeIcon
              icon={open ? faAngleUp : faAngleDown}
              className="text-primary w-12 hover:cursor-pointer"
              onClick={() => {
                setOpen(!open);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 ">
              <div className="flex flex-col justify-between">
                <div className="text-darkText">{doc.name}</div>
              </div>
            </div>
            <div>
              <FontAwesomeIcon
                icon={open ? faAngleUp : faAngleDown}
                className="text-primary w-12 hover:cursor-pointer"
                onClick={() => {
                  setOpen(!open);
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
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
                  {convert(doc.size).from("B").to("MB").toFixed(2)} MB{" "}
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
                        setMultipleUploadedDocs(
                          multipleUploadedDocs.filter(
                            (item: any) => item.key !== doc.key
                          )
                        )
                      );
                      localStorage.setItem(
                        "multiUploadedDocs",
                        JSON.stringify(
                          multipleUploadedDocs.filter(
                            (item: any) => item.key !== doc.key
                          )
                        )
                      );
                    })
                    .catch((err) => {
                      toast.dismiss(id);
                      toast.error(`${err?.data?.message}`);
                    });
                }}
              />
            </div>
            
          </div>
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
      )}
    </div>
  );
}

export default UploadedDocCard;

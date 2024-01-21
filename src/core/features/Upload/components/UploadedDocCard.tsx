"use client";
import Document from "@/components/SVGs/Document";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useDeleteUploadedPdfMutation } from "@/core/rtk-query/upload";
import { faAngleUp, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import convert from "convert-units";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { UploadFileResponse } from "uploadthing/client";
import { setMultipleUploadedDocs } from "../redux/upload-slice";

type Props = {
  doc: UploadFileResponse;
};

function UploadedDocCard({ doc }: Props) {
  const { multipleUploadedDocs } = useAppSelector((state) => state.upload);
  const dispatch = useDispatch();
  const [deleteUploadedPdf] = useDeleteUploadedPdfMutation();
  const [open, setOpen] = useState(false);
  console.log(multipleUploadedDocs)

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
              <div className={`text-darkText`}>{doc.name}</div>
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
                {/* <div className="text-darkText">{doc.name}</div> */}
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
                defaultValue={doc.name}
                onChange={(e) => {
                  const index = multipleUploadedDocs.findIndex(
                    (item: any) => item.key === doc.key
                  );
                  dispatch(
                    setMultipleUploadedDocs([
                      ...multipleUploadedDocs.slice(0, index),
                      { ...multipleUploadedDocs[index], name: e.target.value },
                      ...multipleUploadedDocs.slice(index + 1),
                    ])
                  );
                }}
              />
            </div>
            <p>Enter Document Description</p>
            <div>
              <TextFieldComponent
                placeholder="Description"
                name="description"
                defaultValue={doc.name}
                onChange={(e) => {
                  const index = multipleUploadedDocs.findIndex(
                    (item: any) => item.key === doc.key
                  );
                  dispatch(
                    setMultipleUploadedDocs([
                      ...multipleUploadedDocs.slice(0, index),
                      {
                        ...multipleUploadedDocs[index],
                        description: e.target.value,
                      },
                      ...multipleUploadedDocs.slice(index + 1),
                    ])
                  );
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadedDocCard;

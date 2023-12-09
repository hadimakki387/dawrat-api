import DaButton from "@/components/global/DaButton";
import DaDialog from "@/components/global/DaDialog";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { setEditDocumentDialog, setSelectedDoc } from "../redux/profile-slice";
import { useDispatch } from "react-redux";
import { useUpdateDocumentMutation } from "@/core/rtk-query/documents";
import { generateToast, updateToast } from "@/services/global-function";
import { ToastType } from "@/services/constants";

function EditDocumentDialog() {
  const { editDocumentDialog, selectedDoc } = useAppSelector(
    (state) => state.profile
  );

  const dispatch = useDispatch();
  const [updateDocument] = useUpdateDocumentMutation();

  const formik = useFormik({
    validationSchema: Yup.object({
      title: Yup.string().required("Title Required"),
      description: Yup.string().required("Description Required"),
    }),
    initialValues: {
      title: selectedDoc?.title,
      description: selectedDoc?.description,
    },
    onSubmit: (values) => {
      const id = generateToast({
        message: "Updating...",
        isLoading: true,
      });
      if (selectedDoc?.id)
        updateDocument({
          id: selectedDoc?.id,
          body: {
            title: values.title || "",
            description: values.description || "",
          },
          ownerId: selectedDoc?.ownerId,
        })
          .unwrap()
          .then((res) => {
            dispatch(setEditDocumentDialog(false));
            dispatch(setSelectedDoc(null));
            updateToast(id, "Document Updated", {
              toastType: ToastType.success,
              isLoading: false,
              duration: 2000,
            });
          })
          .catch((err) => {
            updateToast(id, `${err?.data?.message}`, {
              toastType: ToastType.error,
              isLoading: false,
              duration: 2000,
            });
          });
    },
  });
  return (
    <DaDialog
      open={editDocumentDialog}
      onClose={() => {
        dispatch(setEditDocumentDialog(false));
      }}
    >
      <div className="space-y-4">
        <div>Edit Document</div>
        <TextFieldComponent
          formik={formik}
          placeholder="Enter Title"
          name="title"
        />
        <TextFieldComponent
          formik={formik}
          placeholder="Enter Description"
          name="description"
        />
        <div className="flex justify-end gap-2">
          <DaButton
            label="Cancel"
            className="bg-white border border-primary  w-[5rem]"
            style={{ color: "var(--primary)" }}
            onClick={() => {
              dispatch(setEditDocumentDialog(false));
              dispatch(setSelectedDoc(null));
            }}
          />
          <DaButton
            label="Edit"
            className="bg-primary text-white w-[5rem]"
            onClick={() => {
              formik.handleSubmit();
            }}
          />
        </div>
      </div>
    </DaDialog>
  );
}

export default EditDocumentDialog;

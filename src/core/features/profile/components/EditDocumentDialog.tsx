import DaButton from "@/components/global/DaButton";
import DaDialog from "@/components/global/DaDialog";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useUpdateDocumentMutation } from "@/core/rtk-query/documents";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from "yup";
import { setEditDocumentDialog, setSelectedDoc } from "../redux/profile-slice";

function EditDocumentDialog() {
  const { editDocumentDialog, selectedDoc } = useAppSelector(
    (state) => state.profile
  );

  const dispatch = useDispatch();
  const [updateDocument] = useUpdateDocumentMutation();
  console.log(selectedDoc)

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
      const id = toast.loading("Updating Document...");
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
            toast.dismiss(id);
            toast.success("Document Updated");
          })
          .catch((err) => {
            toast.dismiss(id);
            toast.error(`${err?.data?.message}`);
          });
    },
  });
  useEffect(() => {
    formik.setValues({
      title: selectedDoc?.title,
      description: selectedDoc?.description,
    });
  }, [selectedDoc]);
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

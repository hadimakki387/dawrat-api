import { SolutionInterface } from "@/backend/modules/solutions/solutions.interface";
import DaDialog from "@/components/global/DaDialog";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from "yup";
import { setEditSolution } from "../redux/solutions-slice";
import DaButton from "@/components/global/DaButton";
import { useUpdateSolutionMutation } from "@/core/rtk-query/solutions";

type Props = {
  solution: SolutionInterface;
};

function EditSolutionDialog({ solution }: Props) {
  const { editSolution } = useAppSelector((state) => state.solutions);
  const dispatch = useDispatch();
  const [updateSolution] = useUpdateSolutionMutation();
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
      updateSolution({
        title: values.title,
        document: solution.id,
        description: values.description,
      })
        .unwrap()
        .then((res) => {
          toast.dismiss(id);
          toast.success("Solution updated");
          dispatch(setEditSolution(false));
          formik.resetForm()
        })
        .catch((err) => {
          toast.dismiss(id);
          toast.error(`${err?.data?.message}`);
        });
    },
  });
  console.log(formik.errors);
  useEffect(() => {
    if (solution) {
      formik.setFieldValue("title", solution.title);
      formik.setFieldValue("description", solution.description);
    }
  }, []);
  return (
    <DaDialog
      open={editSolution}
      onClose={() => {
        dispatch(setEditSolution(false));
      }}
    >
      <div className="space-y-4">
        <div className="text-2xl text-titleText">Edit Solution</div>
        <TextFieldComponent
          placeholder="Enter Title"
          name="title"
          formik={formik}
        />
        <TextFieldComponent
          placeholder="Enter Description"
          name="description"
          formik={formik}
        />
        <div className="flex items-center justify-end w-full gap-2">
          <DaButton
            className=" border border-primary font-semibold"
            label="cancel"
            style={{
              color: "var(--primary)",
            }}
            onClick={()=>{
                dispatch(setEditSolution(false));
                formik.resetForm()
            }}
          />
          <DaButton
            className="text-white bg-primary font-semibold"
            label="confirm"
            onClick={()=>{
                formik.handleSubmit()
            }}
          />
        </div>
      </div>
    </DaDialog>
  );
}

export default EditSolutionDialog;

"use client";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import DaButton from "@/components/global/DaButton";
import DaDialog from "@/components/global/DaDialog";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useCreateDomainMutation } from "@/core/rtk-query/domain";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from "yup";
import {
  setAddDomainDialog,
  setSearchUniversityAddDomain,
  setSelectedUniversityAddDomain,
} from "../redux/upload-slice";

function AddDomainDialog() {
  const {
    addDomainDialog,
    searchUniversityAddDomain,
    selectedUniversityAddDomain,
  } = useAppSelector((state) => state.upload);
  const [createDomain] = useCreateDomainMutation();
  const { data } = useGetUniversitiesQuery({
    title: searchUniversityAddDomain,
    limit: 5,
  });
  const dispatch = useDispatch();
  const formik = useFormik({
    validationSchema: Yup.object({
      title: Yup.string().required("Title Required"),
    }),
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      if (selectedUniversityAddDomain) {
        const id = toast.loading("Creating Domain...");
        createDomain({
          body: {
            title: values.title,
            university: selectedUniversityAddDomain,
          },
          univerisityId: selectedUniversityAddDomain,
        })
          .unwrap()
          .then((res) => {
            toast.dismiss(id);
            toast.success("Domain Created");
            dispatch(setAddDomainDialog(false));
          })
          .catch((err) => {
            toast.dismiss(id);
            toast.error(`${err?.data?.message}`);
          });
      } else {
        toast.error("Select University");
      }
    },
  });
  return (
    <DaDialog open={addDomainDialog}>
      <div className="space-y-4">
        <div>Create Domain</div>

        <TextFieldComponent label="Domain Name" name="title" formik={formik} />
        <AutoCompleteSearch
          data={data || []}
          placeholder="Search for your university"
          setSearch={(search) => dispatch(setSearchUniversityAddDomain(search))}
          setSelectedItem={(selectedItem) => {
            dispatch(setSelectedUniversityAddDomain(selectedItem));
          }}
          style={{ borderRadius: "0.7rem" }}
          className="mr-4 p-1"
          loading={true}
        />
        <div className="flex items-center justify-end gap-2">
          <DaButton
            label="Cancel"
            className="border border-primary "
            style={{ color: "var(--primary)" }}
            onClick={() => {
              dispatch(setAddDomainDialog(false));
              formik.resetForm();
            }}
          />
          <DaButton
            label="Submit"
            className="bg-primary text-white "
            onClick={() => formik.handleSubmit()}
          />
        </div>
      </div>
    </DaDialog>
  );
}

export default AddDomainDialog;

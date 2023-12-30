"use client";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import DaDialog from "@/components/global/DaDialog";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useCreateDomainMutation } from "@/core/rtk-query/domain";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setAddDomainDialog,
  setSearchUniversityAddDomain,
  setSelectedUniversityAddDomain,
} from "../redux/upload-slice";
import { generateToast, updateToast } from "@/services/global-function";
import { ToastType } from "@/services/constants";
import { useDispatch } from "react-redux";
import DaButton from "@/components/global/DaButton";

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
        const id = generateToast({
          message: "Creating...",
          isLoading: true,
        });
        createDomain({
          body: {
            title: values.title,
            university: selectedUniversityAddDomain,
          },
          univerisityId: selectedUniversityAddDomain,
        })
          .unwrap()
          .then((res) => {
            updateToast(id, "Domain Created", {
              toastType: ToastType.success,
              isLoading: false,
              duration: 2000,
            });
            dispatch(setAddDomainDialog(false));
          })
          .catch((err) => {
            updateToast(id, `${err?.data?.message}`, {
              toastType: ToastType.error,
              isLoading: false,
              duration: 2000,
            });
          });
      } else {
        generateToast({
          message: "Please select a university",
          toastType: ToastType.error,
          duration: 2000,
        });
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

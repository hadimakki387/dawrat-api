"use client";
import DaButton from "@/components/global/DaButton";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useUpdateUserMutation } from "@/core/rtk-query/user";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { toast } from "sonner";

function Account() {
  const { user } = useAppSelector((state) => state.global);
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const formik = useFormik({
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
    }),
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.firstName,
    },
    onSubmit: (values) => {
      const id = toast.loading("Updating...")
      updateUser({ id: user?.id, body: values })
        .unwrap()
        .then((res) => {
          toast.success("Updated Successfully")
          toast.dismiss(id)
        })
        .catch((err) => {
          toast.error(`${err?.data?.message}`)
          toast.dismiss(id)
        });

    },
  });
  useEffect(() => {
    if (user) {
      formik.setFieldValue("firstName", user?.firstName);
      formik.setFieldValue("lastName", user?.lastName);
    }
  }, [user]);
  return (
    <div className="space-y-6 w-[25rem] max-md:w-full">
      <h2 className="text-xl text-titleText font-medium">Account</h2>
      <div className="mb-4">
        <p className="text-titleText mb-2">First Name</p>
        <TextFieldComponent
          placeholder="Enter First Name..."
          formik={formik}
          name="firstName"
        />
      </div>
      <div className="mb-4">
        <p className="text-titleText mb-2">Last Name</p>
        <TextFieldComponent
          placeholder="Enter Last Name..."
          formik={formik}
          name="lastName"
        />
      </div>
      <DaButton
        label="Submit"
        className="bg-primary text-white font-semibold w-full"
        fullRounded
        onClick={() => formik.handleSubmit()}
      />
    </div>
  );
}

export default Account;

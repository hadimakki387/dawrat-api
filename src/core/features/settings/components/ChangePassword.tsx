"use client";

import DaButton from "@/components/global/DaButton";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useChangePasswordMutation } from "@/core/rtk-query/user";
import { ToastType } from "@/services/constants";
import { generateToast, updateToast } from "@/services/global-function";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

function ChangePassword() {
  const { user } = useAppSelector((state) => state.global);
  const formik = useFormik({
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Required").trim(),
      newPassword: Yup.string().required("Required").trim(),
      confirmNewPassword: Yup.string()
        .required("Required")
        .test("password-match", "Passwords must match", function (value) {
          return value === this.parent.newPassword;
        })
        .trim(),
    }),
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: (values) => {
      const id = generateToast({
        message: "Updating...",
        isLoading: true,
        toastType:ToastType.default
      });
      changePassword({
        id: user?.id,
        body: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
      })
        .unwrap()
        .then((res) => {
          updateToast(id, "Updated Successfully", {
            isLoading: false,
            duration: 2000,
            toastType:ToastType.success
          });
        })
        .catch((err) => {
          updateToast(id, `${err.data.message}`, {
            isLoading: false,
            duration: 2000,
            toastType:ToastType.error
          });
        });
    },
  });
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    React.useState(false);

  const [changePassword] = useChangePasswordMutation();
  return (
    <div className="space-y-6 w-[25rem]">
      <h2 className="text-xl text-titleText font-medium">Change Password</h2>
      <div className="mb-4">
        <p className="text-titleText mb-2">Old Password</p>
        <TextFieldComponent
          placeholder="Old Password ..."
          name="oldPassword"
          formik={formik}
          type={showOldPassword ? "text" : "password"}
          trailingIcon={
            <FontAwesomeIcon
              icon={faEye}
              className="text-titleText hover:cursor-pointer"
              onClick={() => {
                setShowOldPassword(!showOldPassword);
              }}
            />
          }
        />
      </div>
      <div className="mb-4">
        <p className="text-titleText mb-2">New Password</p>
        <TextFieldComponent
          placeholder="New Password ..."
          name="newPassword"
          formik={formik}
          type={showNewPassword ? "text" : "password"}
          trailingIcon={
            <FontAwesomeIcon
              icon={faEye}
              className="text-titleText hover:cursor-pointer"
              onClick={() => {
                setShowNewPassword(!showNewPassword);
              }}
            />
          }
        />
      </div>
      <div className="mb-4">
        <p className="text-titleText mb-2">Confirm New Password</p>
        <TextFieldComponent
          placeholder="Confirm New Password ..."
          name="confirmNewPassword"
          formik={formik}
          type={showConfirmNewPassword ? "text" : "password"}
          trailingIcon={
            <FontAwesomeIcon
              icon={faEye}
              className="text-titleText hover:cursor-pointer"
              onClick={() => {
                setShowConfirmNewPassword(!showConfirmNewPassword);
              }}
            />
          }
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

export default ChangePassword;

"use client";
import DaButton from "@/components/global/DaButton";
import DaDialog from "@/components/global/DaDialog";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { setOtpSent, setResetPassword } from "../redux/homePage-slice";
import { generateToast, updateToast } from "@/services/global-function";
import {
  useGenerateOtpMutation,
  useVerifyOtpAndChangePasswordMutation,
} from "@/core/rtk-query/user";
import { ToastType } from "@/services/constants";

type Props = {};

function ForgetPasswordDialog({}: Props) {
  const { resetPassword, otpSent } = useAppSelector((state) => state.homePage);
  const [generateOtp] = useGenerateOtpMutation();
  const [verifyOtpAndChangePassword] = useVerifyOtpAndChangePasswordMutation();
  const dispatch = useDispatch();
  const preOtpFormik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string().email().required("email is required"),
    }),
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      const id = generateToast({
        message: "Sending OTP",
        isLoading: true,
        toastType: ToastType.default,
      });
      generateOtp(values)
        .unwrap()
        .then(() => {
          updateToast(id, "OTP Sent", {
            isLoading: false,
            toastType: ToastType.success,
          });
          dispatch(setOtpSent(true));
        })
        .catch((err) => {
          updateToast(id, `${err?.data?.message}`, {
            isLoading: false,
            toastType: ToastType.error,
          });
        });
    },
  });
  const otpFormik = useFormik({
    validationSchema: Yup.object({
      otp: Yup.number().required("otp is required"),
      password: Yup.string().required("password is required"),
    }),
    initialValues: {
      otp: 0,
      password: "",
    },
    onSubmit: (values) => {
      const id = generateToast({
        message: "Resetting Password",
        isLoading: true,
        toastType: ToastType.default,
      });
      verifyOtpAndChangePassword({
        email: preOtpFormik.values.email,
        ...values,
      })
        .unwrap()
        .then(() => {
          updateToast(id, "Password Reset", {
            isLoading: false,
            toastType: ToastType.success,
          });
          preOtpFormik.resetForm();
          otpFormik.resetForm();
          dispatch(setOtpSent(false));
          dispatch(setResetPassword(false));
        })
        .catch((err) => {
          updateToast(id, `${err?.data?.message}`, {
            isLoading: false,
            toastType: ToastType.error,
          });
        });
    },
  });
  return (
    <DaDialog
      open={resetPassword}
      closeIcon
      onClose={() => {
        preOtpFormik.resetForm();
        otpFormik.resetForm();
        dispatch(setOtpSent(false));
        dispatch(setResetPassword(false));
      }}
    >
      <h1 className="text-2xl text-titleText font-medium mb-4">
        Forget Password
      </h1>
      {!otpSent ? (
        <div className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="space-y-4"
          >
            <TextFieldComponent
              placeholder="Enter Your Email"
              name="email"
              formik={preOtpFormik}
            />
            <DaButton
              label="Recieve a code"
              fullRounded
              className="bg-primary text-white font-medium w-full"
              onClick={() => {
                preOtpFormik.handleSubmit();
              }}
            />
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <div className="text-lg text-titleText">
              You will recieve a code on your email
            </div>
            <div className="text-error ">
              Note: This code will expire in 5 minutes.
            </div>
          </div>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-4"
            >
              <TextFieldComponent
                placeholder="Enter Your Code"
                name="otp"
                formik={otpFormik}
              />
              <TextFieldComponent
                placeholder="Enter Your New Password"
                name="password"
                formik={otpFormik}
              />
              <DaButton
                label="Reset Password"
                fullRounded
                className="bg-primary text-white font-medium w-full"
                onClick={() => {
                  otpFormik.handleSubmit();
                }}
              />
            </form>
          </div>
        </div>
      )}
    </DaDialog>
  );
}

export default ForgetPasswordDialog;

import Button from "@/components/global/Button";
import DaDialog from "@/components/global/DaDialog";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { sign } from "crypto";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { setSignIn } from "../redux/homePage-slice";
import { useDispatch } from "react-redux";
import { generateToast } from "@/services/global-function";
import { ToastType } from "@/services/constants";

function SignInDialog() {
  const formik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string().email().required("email is required"),
      password: Yup.string().required("password is required"),
    }),
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const id = generateToast({
        message: "Signing You In",
        isLoading: true,
        toastType: ToastType.default
      });
      console.log("this is the id")
      console.log(id)
      console.log(values);
    },
  });
  const { signIn, signUp } = useAppSelector((state) => state.homePage);
  const dispatch = useDispatch();
  return (
    <DaDialog
      open={signIn}
      title="Sign In"
      message="this is sign In"
      onClose={() => dispatch(setSignIn(false))}
      defaultButtoms={false}
      PaperProps={{ borderRadius: "1rem" }}
      closeIcon
    >
      <div className="flex flex-col gap-4">
        <TextFieldComponent
          leadingText="Email"
          label="Enter Email"
          name="email"
          formik={formik}
        />

        <TextFieldComponent
          type="password"
          leadingText="Password"
          label="Password"
          name="password"
          formik={formik}
        />
        <Button
          label="signIn"
          className="w-full bg-primary font-medium text-white"
          fullRounded
          onClick={formik.handleSubmit}
        />
      </div>
    </DaDialog>
  );
}

export default SignInDialog;

import Button from "@/components/global/Button";
import DaDialog from "@/components/global/DaDialog";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { sign } from "crypto";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { setSignUp } from "../redux/homePage-slice";

function SignUpDialog() {
  const formik = useFormik({
    validationSchema: Yup.object({
      firstName: Yup.string().required("first name is required").trim(),
      lastName: Yup.string().required("last name is required").trim(),
      email: Yup.string().email().required("email is required").trim(),
      password: Yup.string().required("password is required").trim(),
    }),
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { signIn, signUp } = useAppSelector((state) => state.homePage);
  const dispatch = useDispatch();
  return (
    <DaDialog
      open={signUp}
      title="Sign Up"
  
      onClose={() => dispatch(setSignUp(false))}
      onConfirm={() => console.log("suxxess")}
      defaultButtoms={false}
      PaperProps={{ borderRadius: "1rem" }}
      closeIcon
    >
      <div className="flex flex-col gap-4">
        <TextFieldComponent
          leadingText="First name"
          label="Enter first name"
          name="firstName"
          formik={formik}
        />
        <TextFieldComponent
          leadingText="Last Name"
          label="Enter Last Name"
          name="lastName"
          formik={formik}
        />
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

export default SignUpDialog;

import DaButton from "@/components/global/DaButton";
import DaDialog from "@/components/global/DaDialog";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useLoginMutation } from "@/core/rtk-query/landingPage";
import { ToastType } from "@/services/constants";
import { generateToast, updateToast } from "@/services/global-function";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  setIsAuth,
  setResetPassword,
  setSignIn,
} from "../redux/homePage-slice";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function SignInDialog() {
  const { signIn, signUp } = useAppSelector((state) => state.homePage);
  const dispatch = useDispatch();
  const [login, { isSuccess }] = useLoginMutation();
  const router = useRouter();

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
        toastType: ToastType.default,
      });
      login(values)
        .unwrap()
        .then(() => {
          updateToast(id, "Your Signed In", {
            isLoading: false,
            toastType: ToastType.success,
          });
          dispatch(setSignIn(false));
          formik.resetForm();
          dispatch(setIsAuth(true));
        })
        .catch((err) => {
          updateToast(id, `${err?.data?.message}`, {
            isLoading: false,
            toastType: ToastType.error,
          });
          dispatch(setSignIn(false));
          formik.resetForm();
        });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
    }
  }, [isSuccess]);
  const [showPassword, setShowPassword] = useState(false);

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
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <TextFieldComponent
          leadingText="Email"
          label="Enter Email"
          name="email"
          formik={formik}
        />

        <p>Password</p>
        <div className="flex items-center gap-2">
          <div className="w-full">
            <TextFieldComponent
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              formik={formik}
            />
          </div>

          <FontAwesomeIcon
            icon={faEye}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className="hover:cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-end text-primary font-semibold">
          <div
            onClick={() => {
              dispatch(setSignIn(false));
              dispatch(setResetPassword(true));
            }}
            className="hover:cursor-pointer"
          >
            Forget Password?
          </div>
        </div>
        <DaButton
          label="signIn"
          className="w-full bg-primary font-medium text-white"
          fullRounded
          onClick={formik.handleSubmit}
        />
      </form>
    </DaDialog>
  );
}

export default SignInDialog;

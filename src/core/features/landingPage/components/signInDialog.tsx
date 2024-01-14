import DaButton from "@/components/global/DaButton";
import DaDialog from "@/components/global/DaDialog";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useLoginMutation } from "@/core/rtk-query/landingPage";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from "yup";
import { setIsAuth, setSignIn, setSignUp } from "../redux/homePage-slice";
import "./index.css";

function SignInDialog() {
  const { signIn, signUp } = useAppSelector((state) => state.homePage);
  const dispatch = useDispatch();
  const [login, { isSuccess }] = useLoginMutation();
  const router = useRouter();
  const params = useParams();
  const PdfId = params?.id;

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
      const id = toast.loading("Signing In...");
      login(values)
        .unwrap()
        .then(() => {
          toast.dismiss(id);
          toast.success("Signed In");
          dispatch(setSignIn(false));
          formik.resetForm();
          dispatch(setIsAuth(true));
          setTimeout(() => {
            if (id) {
              router.push(`/pdf/${PdfId}`);
            } else {
              router.push("/");
            }
          }, 200);
        })
        .catch((err) => {
          toast.dismiss(id);
          toast.error(`${err?.data?.message}`);
          dispatch(setSignIn(false));
          formik.resetForm();
        });
    },
  });

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
          {/* <div
            onClick={() => {
              dispatch(setSignIn(false));
              dispatch(setResetPassword(true));
            }}
            className="hover:cursor-pointer"
          >
            Forget Password?
          </div> */}
          <div>
            <DaButton
              label="Sign Up"
              className="bg-white text-primary font-semibold"
              onClick={() => {
                dispatch(setSignIn(false));
                dispatch(setSignUp(true));
              }}
              type="button"
            />
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

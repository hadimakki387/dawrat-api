import DaButton from "@/components/global/DaButton";
import DaDialog from "@/components/global/DaDialog";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useLoginMutation } from "@/core/rtk-query/landingPage";
import { ToastType } from "@/services/constants";
import { generateToast, updateToast } from "@/services/global-function";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { setIsAuth, setSignIn } from "../redux/homePage-slice";
import "./index.css";

function SignInDialog() {
  const { signIn, signUp } = useAppSelector((state) => state.homePage);
  const dispatch = useDispatch();
  const [login, { isSuccess }] = useLoginMutation();
  const router = useRouter()

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
          dispatch(setSignIn(false))
          formik.resetForm()
          dispatch(setIsAuth(true))
        })
        .catch((err) => {
          updateToast(id, `${err?.data?.message}`, {
            isLoading: false,
            toastType: ToastType.error,
          });
          dispatch(setSignIn(false))
          formik.resetForm()
        });
       
    },
  });

  useEffect(()=>{
    if(isSuccess){
      window.location.reload()
    }
  },[isSuccess])

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
        <DaButton
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

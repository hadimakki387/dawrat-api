import DaButton from "@/components/global/DaButton";
import DaDialog from "@/components/global/DaDialog";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useRegisterMutation } from "@/core/rtk-query/landingPage";
import { ToastType } from "@/services/constants";
import { generateToast, updateToast } from "@/services/global-function";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { setIsAuth, setSignUp } from "../redux/homePage-slice";
import { useRouter } from "next/navigation";

function SignUpDialog() {
  const { signIn, signUp } = useAppSelector((state) => state.homePage);
  const dispatch = useDispatch();
  const [register,{data}] = useRegisterMutation()
  const router = useRouter()

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
      const id = generateToast({
        message: "Creating Your Account",
        isLoading: true,
        toastType: ToastType.default,
      });
      register(values)
        .unwrap()
        .then(() => {
          updateToast(id, "Your Account has been created", {
            isLoading: false,
            toastType: ToastType.success,
          });
          dispatch(setSignUp(false))
          formik.resetForm()
          window.location.reload()
        })
        .catch((err) => {
          updateToast(id, `${err.data.message}`, {
            isLoading: false,
            toastType: ToastType.error,
          });
          dispatch(setSignUp(false))
          formik.resetForm()
          dispatch(setIsAuth(true))
        });
     
    },
  });
  
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

export default SignUpDialog;

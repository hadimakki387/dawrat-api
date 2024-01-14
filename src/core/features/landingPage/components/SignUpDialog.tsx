import DaButton from "@/components/global/DaButton";
import DaDialog from "@/components/global/DaDialog";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useRegisterMutation } from "@/core/rtk-query/landingPage";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from "yup";
import { setIsAuth, setSignIn, setSignUp } from "../redux/homePage-slice";

function SignUpDialog() {
  const { signIn, signUp } = useAppSelector((state) => state.homePage);
  const dispatch = useDispatch();
  const [register,{data}] = useRegisterMutation()
  const router = useRouter()
  const params = useParams();
  const PdfId = params?.id;

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
      const id = toast.loading("Signing you In")
      register(values)
        .unwrap()
        .then(() => {
          toast.success("You Are Signed In",{id})
          dispatch(setSignUp(false))
          formik.resetForm()
          setTimeout(() => {
            if (PdfId) {
              router.push(`/pdf/${PdfId}`);
            } else {
              router.push("/");
            }
          }, 200);
        })
        .catch((err) => {
          toast.error(`${err?.data?.message}`,{id})
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
        <div className="flex max-sm:justify-between sm:gap-4">
          Already have an account?
          <span
            className="text-primary font-semibold cursor-pointer hover:underline"
            onClick={() => {
              dispatch(setSignUp(false));
              dispatch(setSignIn(true));
            }}
          >
            Sign In
          </span>
        </div>
      </div>
    </DaDialog>
  );
}

export default SignUpDialog;

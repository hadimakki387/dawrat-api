import { UniversityInterface } from "@/backend/modules/universities/universities.interface";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import DaButton from "@/components/global/DaButton";
import DaDialog from "@/components/global/DaDialog";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { useCreateCourseMutation } from "@/core/rtk-query/courses";
import { useGetDomainsUsingUniversityIdQuery } from "@/core/rtk-query/domain";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from "yup";
import {
  setAddCourseDialog,
  setSearchDomainCreate,
  setSearchUniversityCreate,
  setSearchUploadUniversity,
  setSelectedDomainCreate,
  setSelectedUniversity,
  setSelectedUniversityCreate
} from "../redux/upload-slice";
import DaAutocomplete from "@/components/global/DaAutoComplete";
import { DropdownValue } from "@/services/types";

function AddCourseDialog() {
  const {
    addCourseDialog,
    searchUniversityCreate,
    selectedUniversityCreate,
    selectedDomainCreate,
    searchDomainCreate,
  } = useAppSelector((state) => state.upload);
  const { data } = useGetUniversitiesQuery({
    title: searchUniversityCreate,
    limit: 5,
  });

  const { data: domains, isLoading: loadingDomains } =
    useGetDomainsUsingUniversityIdQuery(selectedUniversityCreate?.value, {
      skip: !selectedUniversityCreate?.value,
    });
  const { user } = useAppSelector((state) => state.global);

  const dispatch = useDispatch();

  const [createCourse] = useCreateCourseMutation();

  const formik = useFormik({
    validationSchema: Yup.object({
      title: Yup.string().required("Title Required"),
      description: Yup.string().required("Description Required"),
    }),
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      const id = toast.loading("Creating Course...");

      const selectedUniveristy = data?.find(
        (university: UniversityInterface) =>
          university.id === selectedUniversityCreate?.value
      );
      if (
        selectedUniveristy?.id &&
        selectedDomainCreate?.value &&
        selectedUniversityCreate?.value
      ) {
        createCourse({
          domainId: selectedDomainCreate?.value,
          body: {
            title: values?.title,
            description: values?.description,
            university: selectedUniveristy?.id,
            domain: selectedDomainCreate?.value,
            ownerId: user?.id as string,
            universityName: selectedUniveristy?.title,
          },
        })
          .unwrap()
          .then((res) => {
            toast.dismiss(id);
            toast.success("Course Created");
            dispatch(setAddCourseDialog(false));
            dispatch(setSearchUploadUniversity(""));
            dispatch(setSelectedUniversity(null));
          })
          .catch((err) => {
            toast.dismiss(id);
            toast.error(`${err?.data?.message}`);
          });
      } else {
        toast.dismiss(id);
        toast.error("Please Select University and Domain");
      }
    },
  });
  console.log("these are the universities")
  console.log(data)

  return (
    <DaDialog open={addCourseDialog}>
      <div className="space-y-4">
        <div className="text-xl text-titleText">Create a course</div>
        <TextFieldComponent
          formik={formik}
          name="title"
          placeholder="Enter The Title"
        />
        <TextFieldComponent
          formik={formik}
          name="description"
          placeholder="Enter The Description"
        />
        <DaAutocomplete
          options={data?.map((item) => ({
            label: item?.title,
            value: item?.id,
          })) || [
            {
              value: "",
              label: "loading...",
            },
          ]
        }
          placeholder="Search for your university"
          onInputChange={(search) => dispatch(setSearchUniversityCreate(search))}
          onChange={(selectedItem) => {
            dispatch(setSelectedUniversityCreate(selectedItem as DropdownValue));
          }}
          style={{ borderRadius: "0.7rem" }}
          className="mr-4 p-1"
          loading={true}
        />

        {loadingDomains ? (
          <div className="w-full flex justify-center items-center m-auto">
            <CircularProgress size={30} />
          </div>
        ) : (
          domains && (
            <DaAutocomplete
              options={domains?.map((item) => ({
                label: item?.title,
                value: item?.id,
              })) || [
                {
                  value: "",
                  label: "loading...",
                },
              ]
            }
              placeholder="Search for Domain"
              onInputChange={(search) => dispatch(setSearchDomainCreate(search))}
              onChange={(selectedItem) => {
                dispatch(setSelectedDomainCreate(selectedItem as DropdownValue));
              }}
              style={{ borderRadius: "0.7rem" }}
              className="mr-4 p-1"
            />
          )
        )}

        <div className="flex items-center gap-2 justify-end">
          <DaButton
            label="Cancel"
            className="border border-primary text-primary font-medium w-[5rem]"
            onClick={() => {
              dispatch(setSearchUploadUniversity(""));
              dispatch(setSelectedUniversity(null));
              dispatch(setAddCourseDialog(false));
            }}
            style={{ color: "var(--primary)" }}
          />
          <DaButton
            label="Create"
            className="bg-primary text-white w-[5rem]"
            onClick={() => {
              formik.handleSubmit();
            }}
          />
        </div>
      </div>
    </DaDialog>
  );
}

export default AddCourseDialog;

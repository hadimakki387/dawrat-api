import { courseInterface } from "@/backend/modules/Courses/courses.interface";
import { UniversityInterface } from "@/backend/modules/universities/universities.interface";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import DaButton from "@/components/global/DaButton";
import DaLoader from "@/components/global/DaLoader";
import { useAppSelector } from "@/core/StoreWrapper";
import { setUser } from "@/core/features/global/redux/global-slice";
import { useGetCoursesByUniversityIdQuery } from "@/core/rtk-query/courses";
import { useCreateQuestionMutation } from "@/core/rtk-query/questions";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import { subjects, universities } from "@/services/constants";
import { CircularProgress } from "@mui/material";
import CharacterCount from "@tiptap/extension-character-count";
import Collaboration from "@tiptap/extension-collaboration";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Y from "yjs";
import * as Yup from "yup";
import {
  decrementQuestionStep,
  resetQuestionStep,
  setContent,
  setSearchCourse,
  setSearchUniversity,
  setSelectedCourse,
  setSelectedUniversity,
} from "../../redux/askAi-slice";
import DaAutocomplete from "@/components/global/DaAutoComplete";

const ydoc = new Y.Doc();

//use formik for form validation

function Step3() {
  const dispatch = useDispatch();
  const {
    subject,
    subIndex,
    content,
    searchUniversity,
    selectedUniversity,
    searchCourse,
    selectedCourse,
    isPrivate,
  } = useAppSelector((state) => state.askAi);
  const { user } = useAppSelector((state) => state.global);
  const { data } = useGetUniversitiesQuery({
    title: searchUniversity,
    limit: 5,
  });

  const { data: courses, isLoading: loadingCourses } =
    useGetCoursesByUniversityIdQuery(
      { id: selectedUniversity?.value as string },
      {
        skip: !selectedUniversity ? true : false,
      }
    );

  const [createQuestion] = useCreateQuestionMutation();
  const editor = useEditor({
    editable: false,
    extensions: [
      Placeholder.configure({
        placeholder: "Ask a study question",
      }),
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,

      CharacterCount.configure({
        limit: 10000,
      }),
      Collaboration.configure({
        document: ydoc,
      }),
    ],
    content: content,
  });
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      university: "",
    },
    validationSchema: Yup.object({
      university: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const id = toast("Genearating answer...");
      createQuestion({
        body: {
          question: content,
          university: data?.find(
            (item: UniversityInterface) => item.id === selectedUniversity?.value
          )?.title,
          course: courses?.find(
            (item: courseInterface) => item.id === selectedCourse?.value
          )?.title,
          public: !isPrivate,
          subject: subjects[subject].title,
          topic: subjects[subject].subItems[subIndex],
          userId: user?.id,
          ownerName: user?.firstName + " " + user?.lastName,
        },
        id: user?.id,
      })
        .unwrap()
        .then(() => {
          toast.dismiss(id);
          toast.success("Answer generated successfully");
          dispatch(
            setUser({
              ...user,
              questionsCount: user?.questionsCount && user?.questionsCount + 1,
            })
          );
          dispatch(setContent(""));
          localStorage.setItem("contentSaved", "");
          router.push("/questions");
        })
        .catch((err) => {
          toast.dismiss(id);
          toast.success("Answer generated successfully");
          dispatch(resetQuestionStep());
        });
    },
  });

  return (
    <>
      {data ? (
        <>
          <div className="flex justify-between items-center">
            <EditorContent editor={editor} />
            <div
              className="text-primary hover:cursor-pointer font-semibold"
              onClick={() => dispatch(resetQuestionStep())}
            >
              Edit
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-12">
              <div className="text-xs text-titleText">Subject</div>
              <div className="flex flex-col ">
                <div className="text-darkText font-semibold">
                  {subjects[subject].subItems[subIndex]}
                </div>
                <div className="text-titleText text-sm">
                  {subjects[subject].title}
                </div>
              </div>
            </div>
            <div
              className="text-primary hover:cursor-pointer font-semibold"
              onClick={() => dispatch(decrementQuestionStep())}
            >
              Edit
            </div>
          </div>
          <div className="w-1/4 max-xl:w-full">
            <DaAutocomplete
              options={
                data?.map((item) => ({
                  label: item?.title,
                  value: item?.id,
                })) || [
                  {
                    label: "loading...",
                    value: "",
                  },
                ]
              }
              getOptionDisabled={() =>
                data && data?.length > 0 ? false : true
              }
              placeholder="Search for your university"
              onChange={(e) => {
                dispatch(setSelectedUniversity(e));
              }}
              onInputChange={(e) => {
                dispatch(setSearchUniversity(e));
              }}
              style={{ borderRadius: "0.7rem" }}
              className=" p-1"
              name="university"
            />
          </div>

          <div className="flex justify-end items-center gap-2 w-1/4 max-xl:w-full">
            <div className="w-full">
              <DaAutocomplete
                options={
                  courses?.map((item) => ({
                    label: item?.title,
                    value: item?.id,
                  })) || [
                    {
                      label: "loading...",
                      value: "",
                    },
                  ]
                }
                placeholder={
                  universities
                    ? "Search for your course"
                    : "Select a university first"
                }
                getOptionDisabled={() =>
                  courses && courses?.length > 0 ? false : true
                }
                onChange={(e) => {
                  dispatch(setSelectedCourse(e));
                }}
                style={{ borderRadius: "0.7rem", width: "100%" }}
                className="mr-4 p-1 w-full"
                disabled={!courses}
              />
            </div>
            {loadingCourses && <CircularProgress size={20} className="ml-2" />}
          </div>

          <div className="flex justify-end">
            <DaButton
              label="finish"
              className="bg-primary text-white px-8"
              onClick={() => {
                formik.handleSubmit();
                dispatch(resetQuestionStep());
              }}
            />
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <DaLoader />
        </div>
      )}
    </>
  );
}

export default Step3;

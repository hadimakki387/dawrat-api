import DaButton from "@/components/global/DaButton";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import { ToastType, subjects, universities } from "@/services/constants";
import CharacterCount from "@tiptap/extension-character-count";
import Collaboration from "@tiptap/extension-collaboration";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
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
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import DaLoader from "@/components/global/DaLoader";
import { useGetCoursesByUniversityIdQuery } from "@/core/rtk-query/courses";
import { CircularProgress } from "@mui/material";
import { useCreateQuestionMutation } from "@/core/rtk-query/questions";
import { UniversityInterface } from "@/backend/modules/universities/universities.interface";
import { courseInterface } from "@/backend/modules/Courses/courses.interface";
import { useRouter } from "next/navigation";
import { generateToast, updateToast } from "@/services/global-function";
import { setUser } from "@/core/features/global/redux/global-slice";

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
    useGetCoursesByUniversityIdQuery(selectedUniversity, {
      skip: !selectedUniversity ? true : false,
    });

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
      const id = generateToast({
        message: "Genearating answer...",
        isLoading: true,
      });
      createQuestion({
        body: {
          question: content,
          university: data?.find(
            (item: UniversityInterface) => item.id === selectedUniversity
          )?.title,
          course: courses?.find(
            (item: courseInterface) => item.id === selectedCourse
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
          updateToast(id, "Answer generated successfully", {
            isLoading: false,
            toastType: ToastType.success,
            duration: 2000,
          });
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
          updateToast(id, `${err.data.message}`, {
            isLoading: false,
            toastType: ToastType.error,
            duration: 2000,
          });
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
            <AutoCompleteSearch
              data={data}
              placeholder="Search for your university"
              setSearch={setSearchUniversity}
              setSelectedItem={setSelectedUniversity}
              style={{ borderRadius: "0.7rem" }}
              className="mr-4 p-1"
              name="university"
              formik={formik}
            />
          </div>

          <div className="flex justify-end items-center gap-2 w-1/4 max-xl:w-full">
            <div className="w-full">
              <AutoCompleteSearch
                data={courses}
                placeholder={
                  universities
                    ? "Search for your course"
                    : "Select a university first"
                }
                setSearch={setSearchCourse}
                setSelectedItem={setSelectedCourse}
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

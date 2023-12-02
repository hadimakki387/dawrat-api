import DaButton from "@/components/global/DaButton";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import { useAppSelector } from "@/core/StoreWrapper";
import { subjects } from "@/services/constants";
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
} from "../../redux/askAi-slice";

const ydoc = new Y.Doc();

//use formik for form validation

function Step3() {
  const dispatch = useDispatch();
  const { subject, subIndex, content } = useAppSelector((state) => state.askAi);
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


  const formik = useFormik({
    initialValues: {
      university: "",
    },
    validationSchema: Yup.object({
      university: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(resetQuestionStep());
    },
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <EditorContent editor={editor} />
        <div
          className="text-primary hover:cursor-pointer font-semibold"
          onClick={() => dispatch(decrementQuestionStep())}
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
      <div>
        <TextFieldComponent
          placeholder="Choose Your Univerity"
          name="university"
          formik={formik}
        />
      </div>
      <div className="flex justify-end">
        <DaButton
          label="finish"
          className="bg-primary text-white px-8"
          onClick={() => {
            formik.handleSubmit();
          }}
        />
      </div>
    </>
  );
}

export default Step3;

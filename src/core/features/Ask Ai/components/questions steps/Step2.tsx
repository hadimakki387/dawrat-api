import DaButton from "@/components/global/DaButton";
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
import { useDispatch } from "react-redux";
import * as Y from "yjs";
import {
  decrementQuestionStep,
  incrementQuestionStep,
  resetQuestionStep,
  setSelectedSubject,
  setSubIndex,
} from "../../redux/askAi-slice";

const ydoc = new Y.Doc();

function Step2() {
  const dispatch = useDispatch();
  const { content, subject, subIndex } = useAppSelector((state) => state.askAi);
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




  return (
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
      <div >
        <div className="text-xl font-bold mb-2">Select your subject</div>
        <div className="flex gap-2 max-md:flex-wrap max-md:gap-1">
          {subjects.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  dispatch(setSelectedSubject(index));
                  dispatch(setSubIndex(0));
                }}
                className={`w-1/6 h-28 flex justify-center items-center rounded-lg border-[2px] border-neutral-200 max-md:w-[49%]  ${
                  index !== subject ? "hover:bg-neutral-50" : ""
                } hover:cursor-pointer ${index === subject ? "bg-myPink" : ""}`}
              >
                <p
                  className={`${
                    index === subject ? "text-white" : "text-black"
                  } font-semibold text-xl text-center max-md:text-base`}
                >
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="text-xl font-bold mb-2">Select Topic</div>
        <div className="flex gap-2 max-md:flex-wrap">
          {subjects[subject].subItems.map((subItem, index) => {
            return (
              <div
                key={index}
                onClick={() => dispatch(setSubIndex(index))}
                className={`px-4 py-1 flex justify-center items-center rounded-full   hover:bg-myPink  hover:text-white    text-center hover:cursor-pointer ${
                  index === subIndex
                    ? "bg-myPink text-white"
                    : "bg-transparentPink text-myPink hover:text-white"
                }`}
              >
                {subItem}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <div>
            <DaButton
              label="Back"
              className="bg-primary text-white px-8"
              onClick={() => dispatch(decrementQuestionStep())}
            />
          </div>
          <div>
            <DaButton
              label="Next"
              className="bg-primary text-white px-8"
              onClick={() => {
                dispatch(incrementQuestionStep());
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Step2;

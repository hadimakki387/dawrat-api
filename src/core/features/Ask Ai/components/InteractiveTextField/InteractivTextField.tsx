"use client";
import CharacterCount from "@tiptap/extension-character-count";
import Collaboration from "@tiptap/extension-collaboration";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import "./styles.scss";
import Placeholder from "@tiptap/extension-placeholder";
import { useAppSelector } from "@/core/StoreWrapper";
import { useDispatch } from "react-redux";
import * as Y from "yjs";
import { setContent } from "../../redux/askAi-slice";
import MenuBar from "./MenuBar";

const ydoc = new Y.Doc();

const InteractiveTextField = () => {
  const dispatch = useDispatch();
  const { content, resetData } = useAppSelector((state) => state.askAi);
  const contentSaved = localStorage.getItem("contentSaved");

  const editor = useEditor({
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
    content: content || contentSaved,
    onUpdate: ({ editor }) => {
      localStorage.setItem("contentSaved", editor.getHTML());
      dispatch(setContent(editor.getHTML()));

    },
  });
  

  useEffect(() => {
    if (resetData > 0) {
      editor?.chain().setContent("").run();
    }
  }, [resetData]);


  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent className="editor__content" editor={editor} />
    </div>
  );
};

export default InteractiveTextField;

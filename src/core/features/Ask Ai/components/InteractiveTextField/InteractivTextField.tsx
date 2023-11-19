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
    content: content || contentSaved || "Ask ...",
    onUpdate: ({ editor }) => {
      localStorage.setItem("contentSaved", editor.getHTML());
      dispatch(setContent(editor.getHTML()));
    },
  });

  useEffect(() => {
    if (resetData > 0) {
      editor?.chain().setContent("Ask ...").run();
    }
  }, [resetData]);
  console.log("this is the editor")

  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent
        className="editor__content"
        editor={editor}
        placeholder="Ask any question..."
      />
    </div>
  );
};

export default InteractiveTextField;

"use client";
import React, { useCallback, useEffect, useState } from "react";
import "./styles.scss";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import CharacterCount from "@tiptap/extension-character-count";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";

import * as Y from "yjs";
import MenuBar from "./MenuBar";

const colors = [
  "#958DF1",
  "#F98181",
  "#FBBC88",
  "#FAF594",
  "#70CFF8",
  "#94FADB",
  "#B9F18D",
];
const names = [
  "Lea Thompson",
  "Cyndi Lauper",
  "Tom Cruise",
  "Madonna",
  "Jerry Hall",
  "Joan Collins",
  "Winona Ryder",
  "Christina Applegate",
  "Alyssa Milano",
  "Molly Ringwald",
  "Ally Sheedy",
  "Debbie Harry",
  "Olivia Newton-John",
  "Elton John",
  "Michael J. Fox",
  "Axl Rose",
  "Emilio Estevez",
  "Ralph Macchio",
  "Rob Lowe",
  "Jennifer Grey",
  "Mickey Rourke",
  "John Cusack",
  "Matthew Broderick",
  "Justine Bateman",
  "Lisa Bonet",
];

const getRandomElement = (list: any) =>
  list[Math.floor(Math.random() * list.length)];

const getRandomRoom = () => {
  const roomNumbers = "variables.collabRooms"?.trim()?.split(",") ?? [
    10, 11, 12,
  ];
  return getRandomElement(roomNumbers.map((number) => `rooms.${number}`));
};

const getRandomColor = () => getRandomElement(colors);
const getRandomName = () => getRandomElement(names);

const room = getRandomRoom();
const ydoc = new Y.Doc();
const websocketProvider = new TiptapCollabProvider({
  appId: "7j9y6m10",
  name: room,
  document: ydoc,
});

const getInitialUser = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    return JSON.parse(currentUser);
  }
  return {
    name: getRandomName(),
    color: getRandomColor(),
  };
};

const InteractiveTextField = () => {
  const [status, setStatus] = useState("connecting");
  const [currentUser, setCurrentUser] = useState(getInitialUser);

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
      CollaborationCursor.configure({
        provider: websocketProvider,
      }),
    ],
    content: "Ask ...",
  });

  PlaceHolder.configure({
    emptyEditorClass: "is-empty",
  });

  useEffect(() => {
    websocketProvider.on("status", (event: any) => {
      setStatus(event.status);
    });
  }, []);

  useEffect(() => {
    if (editor && currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      editor.chain().focus().updateUser(currentUser).run();
    }
  }, [editor, currentUser]);

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

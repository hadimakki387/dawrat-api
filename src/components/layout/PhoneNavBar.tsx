import React from "react";
import Home from "../SVGs/Home";
import AI from "../SVGs/AI";
import Questions from "../SVGs/Questions";
import Folder from "../SVGs/Folder";
import Institution from "../SVGs/Institution";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

function PhoneNavBar({}: Props) {
  const path = usePathname();
  const router = useRouter();
  return (
    <div className="w-full fixed flex justify-between items-center md:hidden bottom-0 bg-white z-50 p-4">
      <div
        onClick={() => {
          router.push("/");
        }}
      >
        <Home
          fill={`${path === "/" ? "var(--primary)" : "#4C5966"}`}
          size={25}
        />
      </div>
      <div
        onClick={() => {
          router.push("/ask-ai");
        }}
      >
        <AI
          fill={`${path === "/ask-ai" ? "var(--primary)" : "#4C5966"}`}
          size={25}
        />
      </div>
      <div
        onClick={() => {
          router.push("/questions");
        }}
      >
        <Questions
          fill={`${path === "/questions" ? "var(--primary)" : "#4C5966"}`}
          size={25}
        />
      </div>
      <div
        onClick={() => {
          router.push("/courses");
        }}
      >
        <Folder
          fill={`${path === "/courses" ? "var(--primary)" : "#4C5966"}`}
          size={25}
        />
      </div>
      <div
        onClick={() => {
          router.push("/universities");
        }}
      >
        <Institution
          fill={`${path === "/universities" ? "var(--primary)" : "#4C5966"}`}
          size={25}
        />
      </div>
    </div>
  );
}

export default PhoneNavBar;

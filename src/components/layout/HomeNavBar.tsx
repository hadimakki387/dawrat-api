import React from "react";
import SearchInput from "../global/SearchInput";
import { usePathname } from "next/navigation";

function HomeNavBar() {
  const path = usePathname()
  console.log(path)
  return (
    <nav className="flex items-center justify-between border-b-2 border-neutral-300  p-6 bg-white">
      <div className="flex gap-4">
        <div className={`text-xl font-bold ${path !== "/" ? "w-[10vw]" :""}`}>Dawrat</div>
        {path !== "/" && <div className="w-[20vw]"><SearchInput /></div>}
        <div className="flex items-center gap-4">
          <p className="text-subTitleText ">Universities</p>
          <p className="text-subTitleText ">Books</p>
          <p className="text-primary ">AI Questions</p>
        </div>
      </div>
      
      <div
        className="h-11 w-9 bg-yellow-800 flex justify-center items-center font-semibold text-2xl pb-1 text-white"
        style={{ borderRadius: "84% 16% 26% 69% / 31% 14% 85% 65%" }}
      >
        H
      </div>
    </nav>
  );
}

export default HomeNavBar;

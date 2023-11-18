import Document from "@/components/SVGs/Document";
import HandHoldingPhone from "@/components/SVGs/HandHoldingPhone";
import Institution from "@/components/SVGs/Institution";
import User from "@/components/SVGs/User";
import Image from "next/image";
import React from "react";

function AnalysticsSection() {
  return (
    <div className="bg-white py-24 flex flex-col justify-center text-center gap-16">
      <h1 className="text-4xl font-extrabold">
        17M students saved, and counting
      </h1>
      <p className="text-[22px] w-1/3 m-auto">
        20K new study notes added every day, from one of the world&apos;s most
        active student communities
      </p>
      <div className="flex items-center justify-end m-auto w-[50%] gap-8 relative">
          <div className="w-32">
            <h1 className="text-6xl font-bold">100</h1>
            <p className="text-sm"><Document width="15px" height="15px" fill="var(--hint)"/> Study Resource</p>
          </div>
          <div className="w-32">
            <h1 className="text-6xl font-bold">100</h1>
            <p className="text-sm"><User width="15px" height="15px" fill="var(--hint)"/> Study Resource</p>
          </div>
          <div className="absolute left-0 ">
            <HandHoldingPhone className="w-[20rem] "/>
          </div>
          
      </div>
    </div>
  );
}

export default AnalysticsSection;

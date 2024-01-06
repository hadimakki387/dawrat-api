import { useRouter } from "next/navigation";
import React from "react";

function RecentlyViewedCard({ doc }: { doc: any }) {
  const router = useRouter()
  return (
    <div
      onClick={()=>{
        if(doc?.course){
          router.push(`/pdf/${doc?.id}`)
        }else{
          router.push(`/courses/${doc?.id}`)
        }
      }}
      className={`select-none w-44 h-40 min-w-[176px] max-md:min-w-[150px] max-md:h-32  flex flex-col justify-between items-start hover:cursor-pointer ${
        doc.course
          ? "bg-greenBg text-greenText hover:bg-greenHover"
          : "bg-purpleBg text-purpleText hover:bg-purpleHover"
      } rounded-xl mt-4 p-4 transition-all duration-300`}
    >
      <div className="font-semibold text-lg max-md:text-sm">{doc?.title}</div>
      <div className="text-base max-md:text-sm">{
      // i want to trim the content to 50 characters
        doc?.description?.length > 20 ? doc?.description?.slice(0,20) + "..." : doc?.description
      }</div>
      <div
        className={`text-white  rounded-full flex justify-center items-center text-sm font-semibold w-20 max-md:text-sm ${
          doc.course ? "bg-greenText" : "bg-purpleText"
        }`}
      >
        {doc.course ? "document" : "course"}
      </div>
    </div>
  );
}

export default RecentlyViewedCard;

import React from "react";

function RecentlyViewedCard({ doc }: { doc: any }) {
  return (
    <div
      className={`w-44 h-40 flex flex-col justify-between items-start hover:cursor-pointer ${
        doc.course
          ? "bg-greenBg text-greenText hover:bg-greenHover"
          : "bg-purpleBg text-purpleText hover:bg-purpleHover"
      } rounded-xl mt-4 p-4`}
    >
      <div className="font-semibold text-lg">{doc?.title}</div>
      <div className="text-base">{
      // i want to trim the content to 50 characters
        doc?.description?.length > 20 ? doc?.description?.slice(0,20) + "..." : doc?.description
      }</div>
      <div
        className={`text-white  rounded-full flex justify-center items-center text-sm font-semibold w-20 ${
          doc.course ? "bg-greenText" : "bg-purpleText"
        }`}
      >
        {doc.course ? "document" : "course"}
      </div>
    </div>
  );
}

export default RecentlyViewedCard;

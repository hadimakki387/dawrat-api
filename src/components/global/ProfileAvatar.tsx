import React from "react";

//add custum letter and custom className

interface Props {
  className?: string;
  Letter?: string;
}

function ProfileAvatar({ className="",Letter="H" }: Props) {
  return (
    <div
      className={`h-11 w-9 bg-yellow-800 flex justify-center items-center font-semibold text-2xl pb-1 text-white ${className}`}
      style={{ borderRadius: "84% 16% 26% 69% / 31% 14% 85% 65%" }}
    >
      {Letter}
    </div>
  );
}

export default ProfileAvatar;

"use client"
import { useAppSelector } from "@/core/StoreWrapper";
import React from "react";

//add custum letter and custom className

interface Props {
  className?: string;
  Letter?: string;
}

function ProfileAvatar({ className="" }: Props) {
  const {user} = useAppSelector((state: { global: any; }) => state.global)
  return (
    <div
      className={`h-11 w-9 bg-[#8d6e63] flex justify-center items-center font-semibold text-2xl pb-1 text-white ${className}`}
      style={{ borderRadius: "81% 19% 37% 63%/44% 14% 86% 56%" }}
    >
      {user?.firstName[0].toUpperCase()}
    </div>
  );
}

export default ProfileAvatar;

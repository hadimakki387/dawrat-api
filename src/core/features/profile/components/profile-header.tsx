"use client";
import Institution from "@/components/SVGs/Institution";
import Trophy from "@/components/SVGs/Trophy";
import Info from "@/components/SVGs/Info";
import Document from "@/components/SVGs/Document";
import DaButton from "@/components/global/DaButton";
import ProfileAvatar from "@/components/global/ProfileAvatar";
import { useAppSelector } from "@/core/StoreWrapper";
import React from "react";
import MissingDataMessage from "../../HomePage/Components/MissingDataMessage";
import Upload from "@/components/SVGs/Upload";
import Heart from "@/components/SVGs/Heart";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import ProfileStats from "./ProfileStats";

function ProfileHeader() {
  const { user } = useAppSelector((state) => state.global);
  const router = useRouter();
  return (
    <div className="w-full h-full">
      <div className="flex flex-row justify-between  px-10">
        <div className="flex flex-row items-start gap-4 mt-7 ml-8">
          <ProfileAvatar className="h-[4.5rem] w-14" />

          <div className="flex flex-col text-left">
            <p className="font-semibold text-3xl mb-2">
              {user?.firstName} {user?.lastName}
            </p>
            <div className="flex flex-row  text-sm gap-2 items-center text-center">
              <Institution fill="var(--primary)" width="16" height="16" />
              <p className="text-primary text-lg"> {user?.university.title}</p>
            </div>
            <div className="flex flex-row gap-4 justify-start mt-2">
              <div className="flex flex-col items-center">
                <p className="font-bold">0</p>
                <p className="text-slate-500">Followers</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold">0</p>
                <p className="text-slate-500">Following</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl h-32 w-1/3 mr-6 mt-8 mb-12 flex flex-col">
          <div className="flex flex-row justify-between mx-4 mt-4 mb-5">
            <p className="font-semibold text-lg text-slate-700">Total Points</p>
            <p className="font-bold text-xl text-slate-600">0</p>
          </div>
          <div className="flex flex-row justify-between mx-4 ">
            <p className=" text-md text-slate-700">
              Level
              <span className="bg-primary rounded-md text-white px-2 pb-1 text-center mx-2">
                0
              </span>
              Contributor
            </p>
            <p className="font-normal text-md text-slate-600">
              50 points to level 1
            </p>
          </div>
          <div className="mx-4 mt-4">
            <hr className="w-full h-1 bg-gray-100 border-0 rounded"></hr>
          </div>
        </div>
      </div>


    </div>
  );
}

export default ProfileHeader;

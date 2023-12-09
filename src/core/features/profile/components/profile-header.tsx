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

      <div className="bg-white w-full h-full pl-20 pr-10 pt-5 pb-20">
        <p className="text-slate-700 text-2xl mt-8">Statistics</p>

        <div className="flex flex-row justify-between items-center w-full mt-4 pr-10">
          {/* Points */}
          <div className="border border-slate-200 flex flex-col w-2/5">
            <div className="text-slate-400 m-2 flex flex-row mt-3 gap-2 text-lg">
              <span className="mt-1">
                <Trophy fill="var(--yellow)" width="20" height="20" />
              </span>
              Points
            </div>
            <div className="h-0 border-t border-slate-200 text-2xl text-center"></div>
            <div className="flex flex-row mx-3 justify-around items-center my-2">
              <div className="flex flex-col items-center">
                <p className="font-bold text-lg text-slate-600">0</p>
                <p className="text-slate-400 text-sm font-normal">this month</p>
              </div>
              <Divider orientation="vertical" variant="middle" flexItem />
              <div className="flex flex-col items-center">
                <p className="font-bold text-lg text-slate-600">0</p>
                <p className="text-slate-400 text-sm font-normal">last month</p>
              </div>
              <Divider orientation="vertical" variant="middle" flexItem />
              <div className="flex flex-col items-center">
                <p className="font-bold text-lg text-slate-600">0</p>
                <p className="text-slate-400 text-sm font-normal">tickets</p>
              </div>
            </div>
          </div>

          {/* Your Documents */}
          <div className="border border-slate-200 flex flex-col w-2/5 ">
            <div className="text-slate-400 m-2 flex flex-row items-center mt-3 gap-2 text-lg">
              <Document fill="var(--secondary)" size={20} />
              <div>Your Documents</div>
            </div>
            <div className="h-0 border-t border-slate-200 text-2xl text-center"></div>
            <div className="flex flex-row mx-3 justify-around items-center my-2">
              <div className="flex flex-col items-center">
                <p className="font-bold text-lg text-slate-600">
                  {user?.uploads}
                </p>
                <p className="text-slate-400 text-sm font-normal">uploads</p>
              </div>
              <Divider orientation="vertical" variant="middle" flexItem />
              <div className="flex flex-col items-center">
                <p className="font-bold text-lg text-slate-600">0</p>
                <p className="text-slate-400 text-sm font-normal">upvotes</p>
              </div>
              <Divider orientation="vertical" variant="middle" flexItem />
              <div className="flex flex-col items-center">
                <p className="font-bold text-lg text-slate-600">0</p>
                <p className="text-slate-400 text-sm font-normal">comments</p>
              </div>
            </div>
          </div>

          {/* Your Documents */}
          <div className="border border-slate-200 flex flex-col w-1/6">
            <div className="text-slate-400 m-2 flex flex-row items-center mt-3 gap-2 text-lg">
              <Heart fill="var(--error)" width="20" height="20" />
              Impact
            </div>
            <div className="h-0 border-t border-slate-200 text-2xl text-center"></div>
            <div className="flex flex-row mx-3 gap-4 items-center my-2">
              <div className="flex flex-col items-center">
                <p className="font-bold text-lg text-slate-600">0</p>
                <p className="text-slate-400 text-sm font-normal">
                  students helped
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-slate-600 mt-10 flex flex-row justify-center gap-2">
          <span className="mt-3">
            <Info fill="var(--gray)" width="20" height="20" />
          </span>
          <p className="mt-3">
            You have until the end of December to upload and earn points for the
            January lottery!
          </p>
          <DaButton
            label={"Upload Documents"}
            className="text-white bg-primary font-semibold text-lg ml-2"
            fullRounded
            startIcon={<Upload fill="var(--white)" width="20" height="20" />}
            onClick={()=>router.push("/upload")}
          />
        </div>

        <div className="space-y-4 mt-10">
          <h1 className="text-darkText font-bold text-2xl tracking-wide ">
            Courses And Books
          </h1>
          <div className="mr-10 my-5">
            <MissingDataMessage message="You are not following any courses or books yet. Use the search bar to find your courses and books and follow them." />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;

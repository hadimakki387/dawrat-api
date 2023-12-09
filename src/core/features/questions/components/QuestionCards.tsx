"use client";
import { QuestionInterface } from "@/backend/modules/questions/questions.interface";
import CheckWithFlower from "@/components/SVGs/CheckWithFlower";
import DaCard from "@/components/SVGs/DaCard";
import Folder from "@/components/SVGs/Folder";
import Institution from "@/components/SVGs/Institution";
import DaButton from "@/components/global/DaButton";
import ProfileAvatar from "@/components/global/ProfileAvatar";
import { useAppSelector } from "@/core/StoreWrapper";
import { Divider } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
dayjs.extend(relativeTime);


function QuestionCards({ question }: { question: QuestionInterface }) {
  const { user } = useAppSelector((state) => state.global);


  return (
    <DaCard loading={!user} className="space-y-4">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div>
            <ProfileAvatar />
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-darkText font-semibold">
              {question.ownerName}
            </div>
            <div className="text-sm text-subTitleText">
              {dayjs(question.createdAt).fromNow()}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-darkText font-semibold">
            <span className="text-titleText">Question</span>{" "}
            {` #${question.id.slice(0, 7).toUpperCase()}`}
          </div>
          <DaButton
            label="Open question"
            className=" font-semibold border border-neutral-200"
            fullRounded
            style={{
              color: "var(--primary)",
            }}
          />
        </div>
      </header>
      <Divider />

      <div className="text-titleText">
        Subject:{" "}
        <span className="text-darkText font-semibold">{question.subject}</span>
      </div>
      <div className="text-titleText"><div dangerouslySetInnerHTML={{ __html: question.question }} /></div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-darkText font-semibold text-sm">
          <Institution
            width="18px"
            height="18px"
            fill="var(--sub-title-text)"
            upperFill="var(--dark-text)"
          />
          <div>{question.university}</div>
        </div>
        <div className="flex items-center gap-2 text-darkText font-semibold text-sm">
          <Folder width="18px" height="18px" fill="var(--sub-title-text)" />
          <div>{question.course}</div>
        </div>
      </div>
      <div className="flex items-center gap-4 text-darkText font-semibold text-lg">
        {" "}
        <CheckWithFlower width={40} height={40} />
        Answer
      </div>
      <div>
        {" "}
        <div
          className="text-titleText font-medium"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {question.answer.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>
    </DaCard>
  );
}

export default QuestionCards;

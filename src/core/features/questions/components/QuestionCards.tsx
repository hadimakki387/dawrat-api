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
import { useRouter } from "next/navigation";
import React from "react";
dayjs.extend(relativeTime);

function QuestionCards({
  question,
  hasOpenQuestionButton =true,
}: {
  question: QuestionInterface;
  hasOpenQuestionButton?: boolean;
}) {
  const { user } = useAppSelector((state) => state.global);
  const router = useRouter()

  return (
    <DaCard loading={!user} className="space-y-4">
      <header className="flex justify-between items-center max-sm:flex-col max-sm:items-start">
        <div className="flex items-center gap-2 ">
          <div>
            <ProfileAvatar />
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-darkText font-semibold">
              {question?.ownerName}
            </div>
            <div className="text-sm text-subTitleText">
              {dayjs(question?.createdAt).fromNow()}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 max-sm:gap-1">
          <div className="text-darkText font-semibold max-sm:text-sm">
            <span className="text-titleText">Question</span>{" "}
            {` #${question?.id?.slice(0, 7).toUpperCase()}`}
          </div>
          {hasOpenQuestionButton ? (
            <DaButton
              label="Open question"
              className=" font-semibold border border-neutral-200 max-sm:text-sm"
              fullRounded
              style={{
                color: "var(--primary)",
              }}
              onClick={()=>{
                router.push(`/questions/${question?.id}`)
              }}
            />
          ) : (
            <div />
          )}
        </div>
      </header>
      <Divider />

      <div className="text-titleText">
        Subject:{" "}
        <span className="text-darkText font-semibold">{question?.subject}</span>
      </div>
      <div className="text-titleText">
        <div dangerouslySetInnerHTML={{ __html: question?.question }} />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-darkText font-semibold text-sm">
          <Institution
            size={18}
            fill="var(--sub-title-text)"
            upperFill="var(--dark-text)"
          />
          <div>{question?.university}</div>
        </div>
        <div className="flex items-center gap-2 text-darkText font-semibold text-sm">
          <Folder size={18} fill="var(--sub-title-text)" />
          <div>{question?.course}</div>
        </div>
      </div>
      <div className="flex items-center gap-4 text-darkText font-semibold text-lg">
        {" "}
        <CheckWithFlower size={40} />
        Answer
      </div>
      <div>
        {" "}
        <div
          className="text-titleText font-medium"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {question?.answer?.split("\n").map((line, index) => (
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

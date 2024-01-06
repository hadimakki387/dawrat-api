"use client";
import React, { Fragment } from "react";
import QuestionCards from "./QuestionCards";
import { useAppSelector } from "@/core/StoreWrapper";
import {
  useGetQuestionByIdQuery,
  useGetQuestionsByUserIdQuery,
} from "@/core/rtk-query/questions";
import DaButton from "@/components/global/DaButton";
import CheckWithFlower from "@/components/SVGs/CheckWithFlower";
import QuestionCardSkeleton from "./QuestionCardSkeleton";
import { useRouter } from "next/navigation";

function Questions() {
  const { user } = useAppSelector((state) => state.global);
  const { data } = useGetQuestionsByUserIdQuery(user?.id as string, {
    skip: !user?.id,
  });

  const router = useRouter();

  return (
    <div className="space-y-4 mb-4">
      {data ? (
        data?.map((question, index) => (
          <Fragment key={index}>
            <QuestionCards question={question} />
            <div className="w-full flex justify-center items-center">
              <DaButton
                startIcon={<CheckWithFlower innerFill="white" size={25} />}
                label="Ask another question"
                fullRounded
                className="text-white font-bold bg-myPink"
                onClick={() => router.push("/ask-ai")}
              />
            </div>
          </Fragment>
        ))
      ) : (
        <>
          {Array(3)
            .fill(3)
            .map((line, index) => (
              <QuestionCardSkeleton key={index} />
            ))}
        </>
      )}
    </div>
  );
}

export default Questions;

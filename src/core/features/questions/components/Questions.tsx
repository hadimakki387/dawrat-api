"use client";
import React, { Fragment } from "react";
import QuestionCards from "./QuestionCards";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetQuestionByIdQuery } from "@/core/rtk-query/questions";
import DaButton from "@/components/global/DaButton";
import CheckWithFlower from "@/components/SVGs/CheckWithFlower";
import QuestionCardSkeleton from "./QuestionCardSkeleton";

function Questions() {
  const { user } = useAppSelector((state) => state.global);
  const { data } = useGetQuestionByIdQuery(user?.id as string, {
    skip: !user?.id,
  });
  return (
    <div className="space-y-4 mb-4">
      {data ? (
        data?.map((question, index) => (
          <Fragment key={index}>
            <QuestionCards question={question} />
            <div className="w-full flex justify-center items-center">
              <DaButton
                startIcon={
                  <CheckWithFlower innerFill="white" width={25} height={25} />
                }
                label="Ask another question"
                fullRounded
                className="text-white font-bold bg-myPink"
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

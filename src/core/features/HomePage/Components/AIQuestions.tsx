"use client";
import { faExclamation, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import MissingDataMessage from "./MissingDataMessage";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetQuestionsByUserIdQuery } from "@/core/rtk-query/questions";
import DaCarousel from "@/components/global/carousel/DaCarousel";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DaCard from "@/components/SVGs/DaCard";
import { useRouter } from "next/navigation";
import AI from "@/components/SVGs/AI";
import { Skeleton } from "@mui/material";
dayjs.extend(relativeTime);

function AiQuestions() {
  const { user } = useAppSelector((state) => state.global);
  const { data: questions, isLoading: loadingQuestions } =
    useGetQuestionsByUserIdQuery(user?.id as string, { skip: !user });
  const router = useRouter();
  return (
    <div className="space-y-1 w-full">
      <h1 className="text-darkText font-bold text-xl mb-2 md:text-2xl tracking-wide ">
        AI Questions
      </h1>
      {questions && questions.length > 0 && !loadingQuestions ? (
        <div className="w-full">
          <DaCarousel hasButtons={false}>
            {questions.map((question) => {
              return (
                <DaCard
                  className="max-md:min-w-[90%] md:min-w-[33.3333%] shadow-md shadow-neutral-200 hover:cursor-pointer hover:shadow-lg transition-all duration-300 "
                  key={question?.id}
                >
                  <div
                    className="flex flex-col justify-between gap-2 h-full"
                    onClick={() => {
                      router.push(`/questions/${question?.id}`);
                    }}
                  >
                    <div className="flex items-center justify-between text-xs text-subTitleText ">
                      <div className="flex items-center gap-2">
                        <AI size={16} fill="var(--pink)" />
                        <p>{question?.topic}</p>
                      </div>
                      <p>{dayjs(question?.createdAt).fromNow()}</p>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: question?.question }}
                    />
                    <div className="text-titleText font-medium">
                      {question?.answer?.slice(0, 50)}...
                    </div>
                  </div>
                </DaCard>
              );
            })}
          </DaCarousel>
        </div>
      ) : questions && questions.length === 0 && !loadingQuestions ? (
        <MissingDataMessage message="You did ask any question yet." />
      ) : (
        <div className="w-full">
          <DaCarousel hasButtons={false}>
            {Array.from(new Array(3)).map((_, index) => {
              return (
                <DaCard
                  key={index}
                  className="max-md:min-w-[75%] md:min-w-[33.3333%] shadow-md shadow-neutral-200 hover:cursor-pointer hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col justify-between gap-2 h-full">
                    <div className="flex items-center justify-between text-xs text-subTitleText ">
                      <div className="flex items-center gap-2">
                        <Skeleton variant="circular" width={16} height={16} />
                        <p>
                          <Skeleton variant="text" width={50} />
                        </p>
                      </div>
                      <p>
                        <Skeleton variant="text" width={50} />
                      </p>
                    </div>
                    <Skeleton variant="text" width={200} />
                    <div className="text-titleText font-medium">
                      <Skeleton variant="text" width={100} />
                    </div>
                  </div>
                </DaCard>
              );
            })}
          </DaCarousel>
        </div>
      )}
    </div>
  );
}

export default AiQuestions;

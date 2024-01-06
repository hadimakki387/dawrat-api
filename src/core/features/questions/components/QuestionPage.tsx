"use client";
import { useGetQuestionByIdQuery } from "@/core/rtk-query/questions";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import QuestionCards from "./QuestionCards";
import QuestionCardSkeleton from "./QuestionCardSkeleton";
import DaCard from "@/components/SVGs/DaCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";

type Props = {};

function QuestionPage({}: Props) {
  const params = useParams();
  const id = params?.id;
  const { data: question } = useGetQuestionByIdQuery(id as string);
  const router = useRouter();
  return (
    <>
      {question ? (
        <DaCard>
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="text-titleText hover:cursor-pointer"
            size="2x"
            onClick={() => {
              router.back();
            }}
          />
          <QuestionCards question={question} hasOpenQuestionButton={false} />
        </DaCard>
      ) : (
        <QuestionCardSkeleton />
      )}
    </>
  );
}

export default QuestionPage;

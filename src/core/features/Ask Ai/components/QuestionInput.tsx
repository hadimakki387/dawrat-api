"use client";
import DaCard from "@/components/SVGs/DaCard";
import DaToggle from "@/components/global/DaToggle";
import ProfileAvatar from "@/components/global/ProfileAvatar";
import { useAppSelector } from "@/core/StoreWrapper";
import InteractiveTextField from "./InteractiveTextField/InteractivTextField";
import { useDispatch } from "react-redux";
import {
  decrementQuestionStep,
  incrementQuestionStep,
  incrementResetData,
  resetQuestionStep,
  setIsPrivate,
} from "../redux/askAi-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/global/DaButton";
import Step1 from "./questions steps/Step1";
import Step2 from "./questions steps/Step2";
import Step3 from "./questions steps/Step3";
import Step4 from "./questions steps/Step4";

function QuestionInput() {
  const { isPrivate, QuestionStep, content } = useAppSelector(
    (state) => state.askAi
  );
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.global);

  return (
    <DaCard className="p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ProfileAvatar className="h-10 w-8" Letter={user?.firstName[0]}/>
          <p className="text-titleText font-semibold">{`${user?.firstName} ${user?.lastName}`}</p>
        </div>
        {QuestionStep === 0 && (
          <>
            <div className="text-green-600 bg-green-200 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-600 flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-success font-semibold"
                  size="xs"
                />
              </div>
              <p>You still have {user?.questionsCount && (30 - user?.questionsCount)} Question</p>
            </div>
            <div>
              <DaToggle
                text={isPrivate ? "Private" : "Public"}
                checked={isPrivate}
                onClick={() => {
                  dispatch(setIsPrivate(!isPrivate));
                }}
              />
            </div>
          </>
        )}
      </div>
      {QuestionStep === 0 ? (
        <Step1 />
      ) : QuestionStep === 1 ? (
        <Step2 />
      ) : (
        <Step3 />
      )}
    </DaCard>
  );
}

export default QuestionInput;

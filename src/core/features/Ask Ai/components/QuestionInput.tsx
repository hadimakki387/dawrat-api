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
import Button from "@/components/global/Button";

function QuestionInput() {
  const { isPrivate, QuestionStep } = useAppSelector((state) => state.askAi);
  const dispatch = useDispatch();
  console.log(QuestionStep);

  return (
    <DaCard className="p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ProfileAvatar className="h-10 w-8" />
          <p className="text-titleText font-semibold">Hadi Makki</p>
        </div>
        <div className="text-green-600 bg-green-200 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-600 flex justify-center items-center">
            <FontAwesomeIcon
              icon={faCheck}
              className="text-success font-semibold"
              size="xs"
            />
          </div>
          <p>You Asked 30 Question</p>
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
      </div>
      {QuestionStep === 0 ? (
        <>
          <InteractiveTextField />
          <div className="flex justify-end">

            <div className="flex items-center gap-2">
              <div>
                <Button
                  label="Reset Content"
                  className="bg-primary text-white px-8"
                  onClick={() => dispatch(incrementResetData())}
                />
              </div>
              <div>
                <Button
                  label="Next"
                  className="bg-primary text-white px-8"
                  onClick={() => {
                    dispatch(incrementQuestionStep());
                  }}
                />
              </div>
            </div>
          </div>
        </>
      ) : QuestionStep === 1 ? (
        <>
          <div>step 2</div>
          <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <div>
                <Button
                  label="Back"
                  className="bg-primary text-white px-8"
                  onClick={() => dispatch(decrementQuestionStep())}
                />
              </div>
              <div>
                <Button
                  label="Next"
                  className="bg-primary text-white px-8"
                  onClick={() => {
                    dispatch(incrementQuestionStep());
                  }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>step 3</div>
          <div className="flex justify-end">
            <Button label="finish" className="bg-primary text-white px-8"  onClick={() => {
                    dispatch(resetQuestionStep());
                  }}/>
          </div>
        </>
      )}
    </DaCard>
  );
}

export default QuestionInput;

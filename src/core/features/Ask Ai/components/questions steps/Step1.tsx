import React from "react";
import InteractiveTextField from "../InteractiveTextField/InteractivTextField";
import Button from "@/components/global/Button";
import { useDispatch } from "react-redux";
import {
  incrementQuestionStep,
  incrementResetData,
} from "../../redux/askAi-slice";

function Step1() {
  const dispatch = useDispatch();
  return (
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
  );
}

export default Step1;

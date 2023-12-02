import DaButton from "@/components/global/DaButton";
import { useDispatch } from "react-redux";
import {
  incrementQuestionStep,
  incrementResetData,
} from "../../redux/askAi-slice";
import InteractiveTextField from "../InteractiveTextField/InteractivTextField";

function Step1() {
  const dispatch = useDispatch();
  return (
    <>
      <InteractiveTextField />
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <div>
            <DaButton
              label="Reset Content"
              className="bg-primary text-white px-8"
              onClick={() => dispatch(incrementResetData())}
            />
          </div>
          <div>
            <DaButton
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

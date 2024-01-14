import { SolutionInterface } from "@/backend/modules/solutions/solutions.interface";
import DaButton from "@/components/global/DaButton";
import DaDialog from "@/components/global/DaDialog";
import { useAppSelector } from "@/core/StoreWrapper";
import {
    useDeleteSolutionMutation
} from "@/core/rtk-query/solutions";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setDeleteSolution } from "../redux/solutions-slice";
import { useRouter } from "next/navigation";

type Props = {
  solution: SolutionInterface;
};

function DeleteSolutionDialog({ solution }: Props) {
  const { deleteSolution } = useAppSelector((state) => state.solutions);
  const dispatch = useDispatch();
  const [DeleteSolution] = useDeleteSolutionMutation();
  const router = useRouter()

  return (
    <DaDialog
      open={deleteSolution}
      onClose={() => {
        dispatch(setDeleteSolution(false));
      }}
    >
      <div className="space-y-4">
        <div className="text-2xl text-titleText">Edit Solution</div>
        <div className="text-subTitleText text-lg">Are you sure you want to delete this solution?</div>
        <div className="flex items-center justify-end w-full gap-2">
          <DaButton
            className=" border border-primary font-semibold"
            label="cancel"
            style={{
              color: "var(--primary)",
            }}
            onClick={() => {
              dispatch(setDeleteSolution(false));
            }}
          />
          <DaButton
            className="text-white bg-error font-semibold"
            label="confirm"
            onClick={() => {
              const id = toast.loading("Deleting Document");
              DeleteSolution(solution?.id as string)
                .unwrap()
                .then((res) => {
                  toast.dismiss(id);
                  toast.success("Solution Deleted");
                  dispatch(setDeleteSolution(false));
                  router.push(`/pdf/${solution?.document}`)
                })
                .catch((err) => {
                  toast.dismiss(id);
                  toast.error(`${err?.data?.message}`);
                });
            }}
          />
        </div>
      </div>
    </DaDialog>
  );
}

export default DeleteSolutionDialog;

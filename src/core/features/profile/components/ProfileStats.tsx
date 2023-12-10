import Document from "@/components/SVGs/Document";
import Heart from "@/components/SVGs/Heart";
import Info from "@/components/SVGs/Info";
import Trophy from "@/components/SVGs/Trophy";
import Upload from "@/components/SVGs/Upload";
import DaButton from "@/components/global/DaButton";
import { useAppSelector } from "@/core/StoreWrapper";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";

function ProfileStats() {
  const { user } = useAppSelector((state) => state.global);
  const router = useRouter();
  return (
    <>
      <p className="text-slate-700 text-2xl mt-8">Statistics</p>

      <div className="flex flex-row justify-between items-center w-full mt-4 pr-10">
        {/* Points */}
        <div className="border border-slate-200 flex flex-col w-2/5">
          <div className="text-slate-400 m-2 flex flex-row mt-3 gap-2 text-lg">
            <span className="mt-1">
              <Trophy fill="var(--yellow)" width="20" height="20" />
            </span>
            Points
          </div>
          <div className="h-0 border-t border-slate-200 text-2xl text-center"></div>
          <div className="flex flex-row mx-3 justify-around items-center my-2">
            <div className="flex flex-col items-center">
              <p className="font-bold text-lg text-slate-600">0</p>
              <p className="text-slate-400 text-sm font-normal">this month</p>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div className="flex flex-col items-center">
              <p className="font-bold text-lg text-slate-600">0</p>
              <p className="text-slate-400 text-sm font-normal">last month</p>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div className="flex flex-col items-center">
              <p className="font-bold text-lg text-slate-600">0</p>
              <p className="text-slate-400 text-sm font-normal">tickets</p>
            </div>
          </div>
        </div>

        {/* Your Documents */}
        <div className="border border-slate-200 flex flex-col w-2/5 ">
          <div className="text-slate-400 m-2 flex flex-row items-center mt-3 gap-2 text-lg">
            <Document fill="var(--secondary)" size={20} />
            <div>Your Documents</div>
          </div>
          <div className="h-0 border-t border-slate-200 text-2xl text-center"></div>
          <div className="flex flex-row mx-3 justify-around items-center my-2">
            <div className="flex flex-col items-center">
              <p className="font-bold text-lg text-slate-600">
                {user?.uploads}
              </p>
              <p className="text-slate-400 text-sm font-normal">uploads</p>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div className="flex flex-col items-center">
              <p className="font-bold text-lg text-slate-600">0</p>
              <p className="text-slate-400 text-sm font-normal">upvotes</p>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div className="flex flex-col items-center">
              <p className="font-bold text-lg text-slate-600">0</p>
              <p className="text-slate-400 text-sm font-normal">comments</p>
            </div>
          </div>
        </div>

        {/* Your Documents */}
        <div className="border border-slate-200 flex flex-col w-1/6">
          <div className="text-slate-400 m-2 flex flex-row items-center mt-3 gap-2 text-lg">
            <Heart fill="var(--error)" width="20" height="20" />
            Impact
          </div>
          <div className="h-0 border-t border-slate-200 text-2xl text-center"></div>
          <div className="flex flex-row mx-3 gap-4 items-center my-2">
            <div className="flex flex-col items-center">
              <p className="font-bold text-lg text-slate-600">0</p>
              <p className="text-slate-400 text-sm font-normal">
                students helped
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-slate-600 mt-10 flex flex-row justify-center gap-2">
        <span className="mt-3">
          <Info fill="var(--gray)" width="20" height="20" />
        </span>
        <p className="mt-3">
          You have until the end of December to upload and earn points for the
          January lottery!
        </p>
        <DaButton
          label={"Upload Documents"}
          className="text-white bg-primary font-semibold text-lg ml-2"
          fullRounded
          startIcon={<Upload fill="var(--white)" width="20" height="20" />}
          onClick={() => router.push("/upload")}
        />
      </div>
    </>
  );
}

export default ProfileStats;

"use client";
import DaCard from "@/components/SVGs/DaCard";
import MissingDataMessage from "../../HomePage/Components/MissingDataMessage";
import ProfileStats from "./ProfileStats";
import ProfileHeader from "./profile-header";
import UploadedDocs from "./UploadedDocs";
import DeleteDocumentDialog from "./DeleteDocumentDialog";
import EditDocumentDialog from "./EditDocumentDialog";
import { useAppSelector } from "@/core/StoreWrapper";

function Index() {
  const { user } = useAppSelector((state) => state.global);

  return (
    <div>
      <DeleteDocumentDialog />
      <EditDocumentDialog />
      <ProfileHeader />
      <DaCard className="md:p-8">
        <ProfileStats />
        {user?.role === "admin" && <UploadedDocs />}

        <div className="space-y-4 mt-10">
          <h1 className="text-darkText font-bold text-2xl tracking-wide ">
            Courses And Books
          </h1>
          <div className=" my-5">
            <MissingDataMessage message="You are not following any courses or books yet. Use the search bar to find your courses and books and follow them." />
          </div>
        </div>
      </DaCard>
    </div>
  );
}

export default Index;

"use client";
import DaCard from "@/components/SVGs/DaCard";
import MissingDataMessage from "../../HomePage/Components/MissingDataMessage";
import ProfileStats from "./ProfileStats";
import ProfileHeader from "./profile-header";
import UploadedDocs from "./UploadedDocs";
import DeleteDocumentDialog from "./DeleteDocumentDialog";

function Index() {

  return (
    <div>
      <DeleteDocumentDialog/>
      <ProfileHeader />
      <DaCard className="p-8">
        <ProfileStats />
        <UploadedDocs/>

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

"use client";
import DaButton from "@/components/global/DaButton";
import DaSearch from "@/components/global/DaSearch/DaSearch";
import { useAppSelector } from "@/core/StoreWrapper";
import { useRouter } from "next/navigation";
import AiQuestions from "./AIQuestions";
import MyRecentDocument from "./MyRecentDocument";
import RecentlyReviewed from "./RecentlyReviewed";
import RecommendedDocs from "./RecommendedDocs";

function HomePage() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.global);

  
  return (
    <div className="flex flex-col gap-12 mb-16 md:mb-12">
    
      <div className="w-full">
        <DaSearch
          handleSubmit={(search) => {
            router.push(`/search/${search}`);
          }}
        />
      </div>
      {!user?.university?.id || !user.domain?.id ? (
        <div className="w-full mt-24 flex justify-center items-center">
          <div className="flex flex-col items-center gap-8">
            <div className="text-3xl font-medium">Please Complete Your Profile</div>

            <DaButton
              label="Check The Profile Settings"
              className="bg-primary text-white font-semibold"
              fullRounded
              onClick={() => {router.push("/settings")}}
            />
          </div>
        </div>
      ) : (
        <>
          <MyRecentDocument />
          <RecentlyReviewed />
          <RecommendedDocs />
          <AiQuestions />
        </>
      )}
    </div>
  );
}

export default HomePage;

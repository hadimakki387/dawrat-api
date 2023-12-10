"use client";
import DaSearch from "@/components/global/DaSearch/DaSearch";
import RecentlyReviewed from "./RecentlyReviewed";
import MyRecentDocument from "./MyRecentDocument";
import RecommendedDocs from "./RecommendedDocs";
import AiQuestions from "./AIQuestions";
import MyBooks from "./MyBooks";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/core/StoreWrapper";
import DaButton from "@/components/global/DaButton";
import Link from "next/link";

function HomePage() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.global);
  
  return (
    <div className="flex flex-col gap-12 mb-12">
      <div className="w-full">
        <DaSearch
          handleSubmit={(search) => {
            router.push(`/search/${search}`);
          }}
        />
      </div>
      {!user?.university || !user.domain ? (
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

"use client"
import DaSearch from "@/components/global/DaSearch/DaSearch";
import RecentlyReviewed from "./RecentlyReviewed";
import MyRecentDocument from "./MyRecentDocument";
import RecommendedDocs from "./RecommendedDocs";
import AiQuestions from "./AIQuestions";
import MyBooks from "./MyBooks";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-12 mb-12">
      <div className="w-full">
      <DaSearch handleSubmit={(search)=>{
              router.push(`/search/${search}`)
            }}/>
      </div>
      <MyRecentDocument />
      <RecentlyReviewed />
      <RecommendedDocs/>
      <AiQuestions/>
    </div>
  );
}

export default HomePage;

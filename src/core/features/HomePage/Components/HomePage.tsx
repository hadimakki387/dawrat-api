import DaSearch from "@/components/global/DaSearch/DaSearch";
import RecentlyReviewed from "./RecentlyReviewed";
import MyRecentDocument from "./MyRecentDocument";
import RecommendedDocs from "./RecommendedDocs";
import AiQuestions from "./AIQuestions";
import MyBooks from "./MyBooks";

function HomePage() {
  return (
    <div className="flex flex-col gap-12 mb-12">
      <div className="w-full">
        <DaSearch placeholder="Search for courses, books or documents" />
      </div>
      <MyRecentDocument />
      <RecentlyReviewed />
      <RecommendedDocs/>
      <AiQuestions/>
    </div>
  );
}

export default HomePage;

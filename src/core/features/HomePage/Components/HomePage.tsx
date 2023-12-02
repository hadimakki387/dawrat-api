import DaSearch from "@/components/global/DaSearch/DaSearch";
import MyCourses from "./MyCourses";
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
      <MyCourses />
      <MyRecentDocument />
      <RecommendedDocs/>
      <AiQuestions/>
      <MyBooks/>
    </div>
  );
}

export default HomePage;

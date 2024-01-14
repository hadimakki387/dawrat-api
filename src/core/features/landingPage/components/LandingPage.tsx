"use client";
import LoadingScreen from "@/components/global/loading screen/LoadingScreen";
import LandingNavBar from "@/components/layout/LandingNavBar";
import { useGetItemsQuery } from "@/core/rtk-query/landingPage";
import AnalysticsSection from "./AnalysticsSection";
import Header from "./Header";
import ItemsSection from "./ItemsSection";

function LandingPage() {
  const { data, isSuccess } = useGetItemsQuery();

  return (
    <>
      {isSuccess ? (
        <>
          <LandingNavBar />
          <div className="overflow-hidden">
            <Header />
            <AnalysticsSection
              documentsCount={data?.documentsCount}
              usersCount={data?.usersCount}
            />
            <ItemsSection
              universities={data?.universities}
              documents={data?.documents}
            />
          </div>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default LandingPage;

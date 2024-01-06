"use client";
import { useGetItemsQuery } from "@/core/rtk-query/landingPage";
import AnalysticsSection from "./AnalysticsSection";
import ForgetPasswordDialog from "./ForgetPasswordDialog";
import Header from "./Header";
import ItemsSection from "./ItemsSection";
import SignUpDialog from "./SignUpDialog";
import SignInDialog from "./signInDialog";
import LoadingScreen from "@/components/global/loading screen/LoadingScreen";

function LandingPage() {
  const { data, isSuccess } = useGetItemsQuery();

  return (
    <>
      {isSuccess ? (
        <div className="overflow-hidden">
          <SignInDialog />
          <SignUpDialog />
          <ForgetPasswordDialog />
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
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default LandingPage;

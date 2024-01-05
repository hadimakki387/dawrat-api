"use client";

import AnalysticsSection from "./AnalysticsSection";
import ForgetPasswordDialog from "./ForgetPasswordDialog";
import Header from "./Header";
import ItemsSection from "./ItemsSection";
import SignUpDialog from "./SignUpDialog";
import SignInDialog from "./signInDialog";

function LandingPage() {
  
  return (
    <div className="overflow-hidden">
      <SignInDialog />
      <SignUpDialog/>
      <ForgetPasswordDialog/>
      <Header />
      <AnalysticsSection/>
      <ItemsSection />
    </div>
  );
}

export default LandingPage;

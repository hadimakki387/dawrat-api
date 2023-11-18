"use client";

import AnalysticsSection from "./AnalysticsSection";
import Header from "./Header";
import ItemsSection from "./ItemsSection";
import SignUpDialog from "./SignUpDialog";
import SignInDialog from "./signInDialog";

function LandingPage() {
  
  return (
    <div className="overflow-hidden">
      <SignInDialog />
      <SignUpDialog/>
      <Header />
      <AnalysticsSection/>
      <ItemsSection />
      
    </div>
  );
}

export default LandingPage;

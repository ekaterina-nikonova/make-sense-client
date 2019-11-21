import React from "react";

import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import AppsSection from "./AppsSection";

const StartPageContent = () => {
  return (
    <React.Fragment>
      <div className="start-container">
        <div className="hero-container">
          <HeroSection />
        </div>
        <div className="about-container">
          <AboutSection />
        </div>
        <div className="apps-container">
          <AppsSection />
        </div>
      </div>
    </React.Fragment>
  );
};

export default StartPageContent;

import React from "react";
import { Redirect } from "react-router-dom";

import { LoggedInContext } from "../../App";

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

const WrappedStartPageContent = () => (
  <LoggedInContext.Consumer>
    { loggedIn => loggedIn ? <Redirect to="/" /> : <StartPageContent /> }
  </LoggedInContext.Consumer>
);

export default WrappedStartPageContent;

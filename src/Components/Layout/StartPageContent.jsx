import React from "react";
import { Redirect } from "react-router-dom";

import { LoggedInContext } from "../../App";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";

const StartPageContent = () => {
  return (
    <LoggedInContext.Consumer>
      {loggedIn => (
        loggedIn ? <Redirect to='/boards' /> : (
          <React.Fragment>
            <div className="start-container">
              <div className="hero-container">
                <HeroSection />
              </div>
              <div className="about-container">
                <AboutSection />
              </div>
            </div>
          </React.Fragment>
        )
      )}
    </LoggedInContext.Consumer>
  );
};

export default StartPageContent;

import React from "react";
import { Redirect } from "react-router-dom";

import { LoggedInContext } from "../../App";
import HeroSection from "./HeroSection";

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
              <div className="about-container">About</div>
            </div>
          </React.Fragment>
        )
      )}
    </LoggedInContext.Consumer>
  );
};

export default StartPageContent;

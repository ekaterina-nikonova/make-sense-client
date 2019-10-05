import React from "react";
import { Redirect } from "react-router-dom";

import { LoggedInContext } from "../../App";

const StartPageContent = () => (
  <LoggedInContext.Consumer>
    {loggedIn => (
      loggedIn ? <Redirect to='/boards' /> : <div>Start</div>
    )}
  </LoggedInContext.Consumer>
);

export default StartPageContent;

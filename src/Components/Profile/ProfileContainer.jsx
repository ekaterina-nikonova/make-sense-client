import React from "react";
import { Redirect } from "react-router-dom";

import { LoggedInContext } from "../../App";

import TopLevelMenu from "../Layout/TopLevelMenu";
import EmptyFullPage from "../UI/EmptyFullPage";

const ProfileContainer = ({ location, match }) => {
  const { pathname } = location;
  const { url } = match;

  return (
    <React.Fragment>
      <TopLevelMenu url={url} currentPath={pathname} item="profile" />

      <EmptyFullPage description="The Profile page is under construction." />
    </React.Fragment>
  );
};

const WrappedProfileContainer = ({ location, match }) => (
  <LoggedInContext.Consumer>
    { loggedIn => loggedIn
        ? <ProfileContainer location={location} match={match} />
        : <Redirect to="/start" />
    }
  </LoggedInContext.Consumer>
);

export default WrappedProfileContainer;

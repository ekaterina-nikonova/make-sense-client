import React from "react";

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

export default ProfileContainer;

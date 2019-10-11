import React from "react";
import { Redirect } from "react-router-dom";

import { LoggedInContext } from "../../App";

import TopLevelMenu from "../Layout/TopLevelMenu";

const AdminPanelContainer = ({ location, match }) => {
  const { pathname } = location;
  const { url } = match;

  return (
    <React.Fragment>
      <TopLevelMenu url={url} currentPath={pathname} item="admin"/>

      <div>Admin panel</div>
    </React.Fragment>
  );
};

const WrappedAdminPanelContainer = ({ location, match }) => (
  <LoggedInContext.Consumer>
    {loggedIn => (
      loggedIn ? <AdminPanelContainer location={location} match={match} /> : <Redirect to='/start' />
    )}
  </LoggedInContext.Consumer>
);

export default WrappedAdminPanelContainer;

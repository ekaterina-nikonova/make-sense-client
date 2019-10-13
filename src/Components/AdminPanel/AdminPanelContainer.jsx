import React from "react";
import { Redirect } from "react-router-dom";

import { LoggedInContext } from "../../App";

import { Tabs } from "antd";

import TopLevelMenu from "../Layout/TopLevelMenu";
import UsersContainer from "./UsersContainer";
import InvitationsContainer from "./InvitationsContainer";

const AdminPanelContainer = ({ location, match }) => {
  const { pathname } = location;
  const { url } = match;

  const { TabPane } = Tabs;

  return (
    <React.Fragment>
      <TopLevelMenu url={url} currentPath={pathname} item="admin"/>

      <Tabs defaultActiveKey="1" className="admin-panel-container">
        <TabPane tab="Users" key="1">
          <UsersContainer />
        </TabPane>
        <TabPane tab="Invitations" key="2">
          <InvitationsContainer />
        </TabPane>
      </Tabs>
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

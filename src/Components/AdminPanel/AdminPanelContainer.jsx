import React from "react";
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

export default AdminPanelContainer;

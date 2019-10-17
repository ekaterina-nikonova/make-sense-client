import React from "react";

import TopLevelMenu from "../Layout/TopLevelMenu";
import EmptyFullPage from "../UI/EmptyFullPage";

const ProjectsContainer = ({ location, match }) => {
  const { pathname } = location;
  const { url } = match;

  return (
    <React.Fragment>
      <TopLevelMenu url={url} currentPath={pathname} item="projects" />

      <EmptyFullPage description="The Projects page is under construction." />
    </React.Fragment>
  );
};

export default ProjectsContainer;

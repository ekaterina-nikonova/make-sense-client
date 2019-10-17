import React from "react";

import TopLevelMenu from "../Layout/TopLevelMenu";
import ProjectList from "./ProjectList";

const ProjectsContainer = ({ location, match }) => {
  const { pathname } = location;
  const { url } = match;

  return (
    <React.Fragment>
      <TopLevelMenu url={url} currentPath={pathname} item="projects" />

      <ProjectList />
    </React.Fragment>
  );
};

export default ProjectsContainer;

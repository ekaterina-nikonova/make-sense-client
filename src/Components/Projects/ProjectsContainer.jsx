import React from "react";

import { Apollo } from "../../Services/graphql";
import TopLevelMenu from "../Layout/TopLevelMenu";
import ProjectList from "./ProjectList";

const ProjectsContainer = ({ location, match }) => {
  const { pathname } = location;
  const { url } = match;

  return (
    <React.Fragment>
      <TopLevelMenu url={url} currentPath={pathname} item="projects" />

      <Apollo>
        <ProjectList />
      </Apollo>
    </React.Fragment>
  );
};

export default ProjectsContainer;

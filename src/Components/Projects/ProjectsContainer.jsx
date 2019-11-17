import React  from "react";
import { Apollo } from "../../Services/graphql";

import TopLevelMenu from "../Layout/TopLevelMenu";
import ProjectList from "./ProjectList";
import NewProjectDrawer from "./NewProjectDrawer";

const ProjectsContainer = ({ location, match }) => {
  const { pathname } = location;
  const { url } = match;


  return (
      <Apollo>
        <TopLevelMenu url={url} currentPath={pathname} item="projects" />

        <ProjectList />

        <NewProjectDrawer />
      </Apollo>
  );
};

export default ProjectsContainer;

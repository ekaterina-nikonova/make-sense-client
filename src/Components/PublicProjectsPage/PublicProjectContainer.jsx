import React from "react";

import ProjectHeader from "./ProjectHeader";
import ChaptersContainer from "./ChaptersContainer";

const PublicProjectContainer = ({ project, board, history }) => (
  <div className="project-container">
    <ProjectHeader
      history={history}
      project={project}
      board={board}
    />

    <ChaptersContainer
      projectId={project.id}
    />
  </div>
);

export default PublicProjectContainer;

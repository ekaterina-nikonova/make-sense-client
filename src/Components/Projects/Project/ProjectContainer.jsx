import React, { useState } from "react";

import ProjectHeader from "./ProjectHeader";
import ChaptersContainer from "./ChaptersContainer";

const ProjectContainer = ({ project, board, chapters, history }) => {
  return (
    <div className="project-container">
      <ProjectHeader
        history={history}
        project={project}
        board={board}
      />

      <ChaptersContainer
        chapters={chapters}
        projectId={project.id}
      />
    </div>
  );
};

export default ProjectContainer;

import React, { useState } from "react";

import ProjectHeader from "./ProjectHeader";
import ChaptersContainer from "./ChaptersContainer";

const ProjectContainer = ({ project, board, chapters, history }) => {
  const [mobileScreen, setMobileScreen] = useState(window.innerWidth < 1000);

  window.addEventListener(
    'resize',
    () => setMobileScreen(window.innerWidth < 1000)
  );

  return (
    <div className="project-container">
      <ProjectHeader
        history={history}
        project={project}
        board={board}
      />

      <ChaptersContainer chapters={chapters} mobileScreen={mobileScreen} />
    </div>
  );
};

export default ProjectContainer;

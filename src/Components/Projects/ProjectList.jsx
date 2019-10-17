import React, { useEffect, useState } from "react";
import { useGlobal } from "reactn";

import {getProjects} from "../../Services/api";

const ProjectList = () => {
  const [projects, setProjects] = useGlobal('projects');
  const [error, setError] = useState();

  useEffect(() => getProjectsAsync(), []);

  const getProjectsAsync = async () => {
    await getProjects()
      .then(projects => setProjects(projects.data))
      .catch(error => setError(error));
  };

  return (
    projects ? projects.map(project => <div>{project.name} - {project.description}</div>) : null
  );
};

export default ProjectList;

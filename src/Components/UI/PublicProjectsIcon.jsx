import React from "react";

import { Tooltip } from "antd";

import publicProjects from "../../Assets/Icons/icon-public.svg";
import publicProjectsLine from "../../Assets/Icons/icon-public-line.svg";

const PublicProjectsIcon = ({ currentPath }) => {
  if (currentPath === '/public-projects') return (
    <img
      src={publicProjects}
      alt="Public projects"
      style={{ maxHeight: '1.2rem' }}
    />
  );

  return (
    <Tooltip title="Public projects">
      <img
        src={publicProjectsLine}
        alt="Public projects"
        className="public-projects-icon-line"
      />

      <img
        src={publicProjects}
        alt="Public projects"
        className="public-projects-icon-color"
      />
    </Tooltip>
  );
};

export default PublicProjectsIcon;

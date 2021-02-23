import React from "react";

import { Tooltip } from "antd";

import publicProjects from "../../Assets/Icons/icon-public.svg";
import publicProjectsLine from "../../Assets/Icons/icon-public-line.svg";

const PublicProjectsIcon = ({ currentPath }) => {
  if (currentPath === '/public-projects') return (
    <img
      src={publicProjectsLine}
      alt="Public projects"
      style={{ maxHeight: '1.2rem' }}
    />
  );

  return (
    <Tooltip title="Public projects">
      <img
        src={publicProjects}
        alt="Public projects"
        style={{ maxHeight: '1.2rem'}}
      />
    </Tooltip>
  );
};

export default PublicProjectsIcon;

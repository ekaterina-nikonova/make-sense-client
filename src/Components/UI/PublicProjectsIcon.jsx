import React from "react";

import { Tooltip } from "antd";

import publicProjects from "../../Assets/Icons/icon-public.svg";

const PublicProjectsIcon = () => (
  <Tooltip title="Public projects">
    <img
      src={publicProjects}
      alt="Public projects"
      style={{ maxHeight: '1.2rem'}}
    />
  </Tooltip>
);

export default PublicProjectsIcon;

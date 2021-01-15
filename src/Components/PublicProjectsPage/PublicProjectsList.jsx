import React from "react";

import { List } from "antd";

const PublicProjectsList = ({ projects }) => {
  return (
    <List
      dataSource={projects}
      renderItem={project => (
        <List.Item>
          {project.name}
        </List.Item>
      )}
    />
  );
};

export default PublicProjectsList;

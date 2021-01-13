import React from "react";

import { Typography } from "antd";

const PublicProjectsHeader = () => {
  const { Paragraph, Title } = Typography;

  return (
    <div className="public-projects-header">
      <Title>Public Projects</Title>

      <Paragraph>
        Check out what our users have created so far.
      </Paragraph>
    </div>
  );
};

export default PublicProjectsHeader;

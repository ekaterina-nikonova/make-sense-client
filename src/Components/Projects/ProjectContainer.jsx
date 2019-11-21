import React from "react";

import { PageHeader } from "antd";

const ProjectContainer = ({ history, match }) => {
  const { params } = match;
  const { id } = params;

  return (
    <div>
      <PageHeader
        onBack={() => history.push('/projects')}
        title={id}
      />
      {`Details of project ${id} will be shown here.`}
    </div>
  );
};

export default ProjectContainer;

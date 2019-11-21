import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { queries } from "../../Services/graphql";

import { Collapse, Icon } from "antd";

const ProjectList = ({ projects, subscribeToMore }) => {
  useEffect(() => subscribe(subscribeToMore), []);

  const { Panel } = Collapse;

  const subscribe = subscribeToMore => {
    subscribeToMore({
      document: queries.projectAdded,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newProject = subscriptionData.data.projectAdded;

        return Object.assign({}, prev, {
          projects: [newProject, ...prev.projects],
          __typename: prev.projects.__typename
        })
      }
    })
  };

  return (
    <Collapse
      bordered={false}
    >
      { projects.map(project => (
        <Panel
          header={project.name}
          key={`prj-${project.id}`}
          extra={<Icon type="delete" /> }
        >
          <Details project={project} />
        </Panel>
      ))}
    </Collapse>
  );
};

const Details = ({ project }) => {
  return (
    <div>
      {project.description}
      <Link to={`projects/${project.id}`}>
        <Icon type="arrow-right" />
      </Link>
    </div>
  );
};

export default ProjectList;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { queries } from "../../Services/graphql";

import { Collapse, Icon, Popconfirm, message } from "antd";

const ProjectList = ({ projects, subscribeToMore }) => {
  const [deleteProject] = useMutation(queries.deleteProject);

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

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteProject({ variables: { id } })
      .then(res => message.success(
        `Deleted project '${res.data.deleteProject.project.name}'.`
      ))
      .catch(err => message.error(
        `Could not delete project.`
      ));
  };

  return (
    <Collapse
      bordered={false}
    >
      { projects.map(project => (
        <Panel
          header={project.name}
          key={`prj-${project.id}`}
          extra={
            <Popconfirm
              title="Delete project?"
              onConfirm={e => handleDelete(e, project.id)}
            >
              <Icon type="delete" onClick={e => e.stopPropagation()} />
            </Popconfirm>
          }
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

import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { queries } from "../../Services/graphql";

import {Col, Collapse, Empty, Icon, Popconfirm, Row, Typography, message, Switch, Tooltip} from "antd";

const ProjectList = ({ projects }) => {
  const [deleteProject] = useMutation(queries.deleteProject);
  const [updateProject] = useMutation(queries.updateProject);

  const { Panel } = Collapse;
  const { Paragraph } = Typography;

  const updatePublic = (id, checked, event) => {
    event.stopPropagation();
    updateProject({
      variables: {id, public: checked}
    });
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
      expandIconPosition="right"
      expandIcon={
        ({ isActive }) =>
          <Icon type="eye" theme={isActive ? "filled" : "outlined"} />
      }
    >
      { projects.map(project => (
        <Panel
          header={
            <div className="list-project-title">
              <Link to={`projects/${project.id}`}>
                <Icon type="arrow-right" />
              </Link>

              <Paragraph className="list-project-name">
                { project.name }
              </Paragraph>
            </div>
          }
          key={`prj-${project.id}`}
          extra={
            <div className="list-project-title-extras">
              <Popconfirm
                title="Delete project?"
                onConfirm={e => handleDelete(e, project.id)}
                onCancel={e => e.stopPropagation()}
              >
                <Icon type="delete" onClick={e => e.stopPropagation()} />
              </Popconfirm>

              <Switch
                checkedChildren={<Icon type="unlock" />}
                unCheckedChildren={<Icon type="lock" />}
                checked={project.public}
                onChange={(checked, event) => updatePublic(project.id, checked, event)}
                className="project-public-switch-list"
              />
            </div>
          }
        >
          <Details project={project} />
        </Panel>
      ))}
    </Collapse>
  );
};

const Details = ({ project }) => {
  const { Paragraph, Text } = Typography;

  return (
    <React.Fragment>
      { !project.description &&
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No description" />
      }

      <Paragraph>
        {project.description}
      </Paragraph>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Icon type="pic-left" className="project-details-icon" />
          <Text>Chapters: {project.chapterCount}</Text>
        </Col>

        <Col xs={24} sm={12}>
          <Icon type="appstore" className="project-details-icon" />
          <Text>Components: {project.componentCount}</Text>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ProjectList;

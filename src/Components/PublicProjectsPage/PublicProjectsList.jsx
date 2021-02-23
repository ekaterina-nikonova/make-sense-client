import React from "react";
import { Link } from "react-router-dom";

import { Icon, List, Typography } from "antd";

const PublicProjectsList = ({ projects }) => {
  const { Paragraph } = Typography;
  const { Item } = List;
  const { Meta } = Item;

  const date = fullDate => new Date(fullDate).toDateString();

  const ProjectHeader = ({ projectName, id }) => (
    <Link to={`public-projects/${id}`}>
      <Icon type="arrow-right" /> <span>{ projectName }</span>
    </Link>
  );

  const IconText = ({ icon, text }) => (
    <span>
      <Icon type={icon} style={{ marginRight: 8 }} />
      { text }
    </span>
  );

  return (
    <List
      dataSource={projects}
      itemLayout="vertical"
      header={
        <Paragraph>
          Check out what our users have created so far.
        </Paragraph>
      }
      renderItem={project => (
        <Item
          key={project.id}
          actions={[
            <IconText icon="user" text={`Author: ${project.user}`} />,
            <IconText icon="calendar" text={`Created: ${date(project.createdAt)}`} />,
          ]}
        >
          <Meta
            title={
              <ProjectHeader projectName={project.name} id={project.id} />}
            description={project.description}
          />
        </Item>
      )}
    />
  );
};

export default PublicProjectsList;

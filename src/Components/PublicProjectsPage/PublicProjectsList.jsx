import React from "react";

import { Icon, List, Typography } from "antd";

const PublicProjectsList = ({ projects }) => {
  const { Paragraph } = Typography;
  const { Item } = List;
  const { Meta } = Item;

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
            <IconText icon="ordered-list" text={`Chapters: ${project.chapterCount}`} />,
            <IconText icon="bulb" text={`Components: ${project.componentCount}`} />
          ]}
        >
          <Meta title={project.name} description={project.description} />
        </Item>
      )}
    />
  );
};

export default PublicProjectsList;

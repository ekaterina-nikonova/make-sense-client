import React from "react";

import { Card, Icon, Typography } from "antd";

const AppsSectionCard = ({ image, imgAlt, link, text, title }) => {
  const { Meta } = Card;
  const { Text } = Typography;

  return (
    <Card
      cover={
        <img
          alt={imgAlt}
          src={image}
          style={{ opacity: link ? "1" : ".5" }}
        />
      }
      actions={
        link ? [
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Icon type="android" key="android" />
          </a>
        ] : [
          <div>
            <Icon type="tool" key="tool" />
            <Text type="secondary"> In development</Text>
          </div>
        ]
      }
    >
      <Meta
        title={title}
        description={text}
        className="app-section-card-body"
      />
    </Card>
  );
};

export default AppsSectionCard;

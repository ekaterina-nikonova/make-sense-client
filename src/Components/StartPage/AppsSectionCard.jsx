import React from "react";

import { Card, Icon, Typography } from "antd";

const AppsSectionCard = ({ image, imgAlt, link, repoLink, text, title }) => {
  const { Meta } = Card;
  const { Text } = Typography;

  const cardActions = lnk => {
    const actionsArray = [];

    actionsArray.push(
      <a href={repoLink} target="_blank" rel="noopener noreferrer">
        <Icon type="github" key="github" />
      </a>
    );

    if (lnk) {
      actionsArray.push(
        <a href={lnk} target="_blank" rel="noopener noreferrer">
          <Icon type="android" key="android" />
        </a>
      );
    } else {
      actionsArray.push(
        <div>
          <Icon type="tool" key="tool" />
          <Text type="secondary"> In development</Text>
        </div>
      );
    }
    return actionsArray;
  };

  return (
    <Card
      cover={
        <img
          alt={imgAlt}
          src={image}
          style={{ opacity: link ? "1" : ".5" }}
        />
      }
      actions={ cardActions(link) }
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

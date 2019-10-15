import React from "react";

import { Avatar, Card } from "antd";

const AboutSectionCard = ({ image, link, text, target, title }) => {
  const { Meta } = Card;

  return (
    <a href={link} target={target}>
      <Card
        bordered={false}
        hoverable={true}
      >
        <Meta
          avatar={<Avatar src={image} />}
          title={title}
          description={text}
        />
      </Card>
    </a>
  );
};

export default AboutSectionCard;

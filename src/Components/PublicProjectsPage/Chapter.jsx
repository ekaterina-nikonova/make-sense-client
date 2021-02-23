import React from "react";

import { Typography } from "antd";

import Section from "./Section";

const Chapter = ({ chapter }) => {
  const { Paragraph, Title } = Typography;

  return (
    <React.Fragment>
      <Title
        level={4}
        className="icons-show-on-hover"
      >
        { chapter.name }
      </Title>

      <Paragraph className="icons-show-on-hover">
        { chapter.intro }
      </Paragraph>

      { chapter.sections && chapter.sections.map(section => (
        <Section
          key={section.id}
          section={section}
        />
      ))}

    </React.Fragment>
  );
};

export default Chapter;

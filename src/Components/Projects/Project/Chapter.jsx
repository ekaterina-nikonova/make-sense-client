import React from "react";
import { Typography } from "antd";

const Chapter = ({ chapter }) => {
  const { Paragraph, Title } = Typography;

  return (
    <React.Fragment>
      <Title level={4}>{ chapter.name }</Title>
      <Paragraph>{ chapter.intro }</Paragraph>
      { chapter.sections && chapter.sections.map(section => (
      <Section key={section.id} section={section} />
      ))}
    </React.Fragment>
  );
};

const Section = ({ section }) => {
  const { Paragraph } = Typography;

  return (
    <div className="project-section">
      { section.image && (
        <img
          alt="illustration for the section"
          src={section.imageUrl}
          className="board-main-image"
        />
      )}
      <Paragraph>{ section.paragraph }</Paragraph>
      <Paragraph copyable className="project-section-code">
        { section.code }
      </Paragraph>
    </div>
  );
};

export default Chapter;

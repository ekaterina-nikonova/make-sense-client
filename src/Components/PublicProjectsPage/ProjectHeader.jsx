import React from "react";

import { Col, Empty, PageHeader, Row, Typography} from "antd";

const ProjectHeader = ({ board, history, project }) => {
  const { Paragraph, Text, Title } = Typography;

  return (
    <PageHeader
      onBack={() => history.push('/public-projects')}
      title={
        <Title level={4}>{ project.name }</Title>
      }
    >
      { project.description && (
        <Paragraph>{ project.description }</Paragraph>
      ) }

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Text strong className="subtitle-small">Board</Text>
          <img
            className="board-icon"
            src={board.imageUrl || require('../../Assets/Icons/icon-board.svg')}
          />
          <Text>{ board.name }</Text>
        </Col>

        <Col xs={24} md={12}>
          <Text strong className="subtitle-small">
            Components
          </Text>

          { !project.components.length && (
            <Paragraph>No components</Paragraph>
          ) }

          { project.components.length && (
            project.components.map(component => (
              <Paragraph key={component.id}>
                <img
                  className="component-icon"
                  src={component.imageUrl || require('../../Assets/Icons/icon-component.svg')}
                />
                { component.name }
              </Paragraph>
            ))
          ) }
        </Col>
      </Row>
    </PageHeader>
  );
};

export default ProjectHeader;

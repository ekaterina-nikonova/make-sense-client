import React, { useState } from "react";
import { Query } from "react-apollo";

import { queries } from "../../Services/graphql";

import { Col, List, PageHeader, Row, Tabs, Typography } from "antd";

const ProjectContainer = ({ history, match }) => {
  const [mobileScreen, setMobileScreen] = useState(window.innerWidth < 1000);

  const { params } = match;
  const { id } = params;

  const { Item } = List;
  const { TabPane } = Tabs;
  const { Paragraph, Text, Title } = Typography;

  window.addEventListener(
    'resize',
    () => setMobileScreen(window.innerWidth < 1000)
  );

  return (
    <Query query={queries.project} variables={{ id }}>
      {({ loading, error, data}) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error :-(</div>

        const project = data.project;
        const chapters = data.project.chapters;

        return(
          <div className="project-container">
            <PageHeader
              onBack={() => history.push('/projects')}
              title={project.name}
            >
              <div>{project.description}</div>

              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <List
                    size="small"
                    header={<Text strong>Board</Text>}
                    dataSource={[project.board]}
                    renderItem={item => (
                      <Item key={item.id}>{item.name}</Item>
                    )}
                  />
                </Col>

                <Col xs={24} md={12}>
                  <List
                    size="small"
                    header={<Text strong>Components</Text>}
                    dataSource={project.components}
                    renderItem={item => (
                      <Item key={item.id}>{item.name}</Item>
                    )}
                  />
                </Col>
              </Row>
            </PageHeader>

            { chapters && chapters.length && (
              <Tabs
                defaultActiveKey="1"
                tabPosition={ mobileScreen ? "top" : "left" }
              >
                {chapters.map(chapter => (
                  <TabPane key={chapter.id} tab={chapter.name}>
                    <Title level={4}>{ chapter.name }</Title>
                    <Paragraph>{ chapter.intro }</Paragraph>
                    { chapter.sections && chapter.sections.map(section => (
                      <Section key={section.id} section={section} />
                    ))}
                  </TabPane>
                ))}
              </Tabs>
            )}
          </div>
        );
      }}
    </Query>
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

export default ProjectContainer;

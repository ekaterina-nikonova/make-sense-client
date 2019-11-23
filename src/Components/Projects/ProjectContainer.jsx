import React, { useState } from "react";
import { Query } from "react-apollo";

import { queries } from "../../Services/graphql";

import { Button, Col, Empty, List, PageHeader, Row, Select, Tabs, Typography } from "antd";

const ProjectContainer = ({ history, match }) => {
  const [mobileScreen, setMobileScreen] = useState(window.innerWidth < 1000);

  const { params } = match;
  const { id } = params;

  const { Item } = List;
  const { TabPane } = Tabs;
  const { Option } = Select;
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
        const board = data.project.board;
        const components = data.project.components;
        const chapters = data.project.chapters;

        return(
          <div className="project-container">
            <PageHeader
              onBack={() => history.push('/projects')}
              title={project.name}
            >
              { !project.description && (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={false}
                >
                  <Button>Add a description</Button>
                </Empty>
              ) }

              { project.description && (
                <div>{project.description}</div>
              ) }

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
                  >
                    <Select
                      placeholder="Select components"
                      style={{ width: '100%', marginTop: '1rem' }}
                    >
                      {project.board.components && project.board.components.map(c => (
                        <Option key={c.id}>{c.name}</Option>
                      ))}
                    </Select>
                  </List>
                </Col>
              </Row>
            </PageHeader>

            {(!chapters || chapters.length === 0) && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={false}
              >
                <Button>Add a chapter</Button>
              </Empty>
            )}

            { chapters && (
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

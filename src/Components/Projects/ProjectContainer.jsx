import React, { useState } from "react";
import { Query } from "react-apollo";

import { queries } from "../../Services/graphql";

import { Col, List, PageHeader, Row, Tabs, Typography } from "antd";

const ProjectContainer = ({ history, match }) => {
  const [mobileScreen, setMobileScreen] = useState(window.innerWidth < 576);

  const { params } = match;
  const { id } = params;

  const { Item } = List;
  const { TabPane } = Tabs;
  const { Text } = Typography;

  window.addEventListener(
    'resize',
    () => setMobileScreen(window.innerWidth < 576)
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
                    { chapter.intro }
                    { chapter.sections && chapter.sections.map(section => (
                      <React.Fragment>
                        { section.image && (
                          <img
                            alt="image attached to the section"
                            src={section.image}
                            className="board-main-image"
                          />
                        )}
                        <div>{ section.paragraph }</div>
                        <div>{ section.code }</div>
                      </React.Fragment>
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

export default ProjectContainer;

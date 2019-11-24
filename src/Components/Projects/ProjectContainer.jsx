import React, { useState } from "react";
import { Query } from "react-apollo";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { queries } from "../../Services/graphql";

import { Button, Col, Empty, Icon, List, PageHeader, Row, Select, Tabs, Typography } from "antd";

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
                  <Text strong className="subtitle-small">Board</Text>
                  <BoardSelect
                    id={project.id}
                    projectBoard={project.board}
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

const BoardSelect = ({ projectBoard, id }) => {
  const { loading, error, data } = useQuery(queries.boardNames);
  const [ updateProject ] = useMutation(queries.updateProject);

  const { Option } = Select;

  const handleUpdate = board =>
    updateProject({ variables: { board, id } });

  return (
    <Select
      defaultValue={projectBoard.id}
      onChange={handleUpdate}
      placeholder={
        (error && (
          <span>
            <Icon type="exclamation-circle"
                  theme="twoTone"
                  twoToneColor="red"
            /> Could not load
          </span>
        )) || (loading && (
          <span><Icon type="loading" /> Loading...</span>
        )) || (data && "Select a board") || (
          <span><Icon type="frown" /> Something went wrong</span>
        )
      }
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      style={{ width: '100%' }}
    >
      { data && data.boards && data.boards.map(board =>
        <Option key={board.id} value={board.id}>{ board.name }</Option>
      )}
    </Select>
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

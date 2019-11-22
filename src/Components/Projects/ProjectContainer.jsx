import React from "react";
import { Query } from "react-apollo";

import { queries } from "../../Services/graphql";

import { Col, List, PageHeader, Row, Typography } from "antd";

const ProjectContainer = ({ history, match }) => {
  const { params } = match;
  const { id } = params;

  const { Item } = List;
  const { Text } = Typography;

  return (
    <Query query={queries.project} variables={{ id }}>
      {({ loading, error, data}) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error :-(</div>

        const project = data.project;

        return(
          <React.Fragment>
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
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default ProjectContainer;

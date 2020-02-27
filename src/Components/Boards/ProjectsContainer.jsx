import React from "react";
import { Query } from "react-apollo";

import { queries } from "../../Services/graphql";

import { Alert, List, Spin } from "antd";

const ProjectsContainer = ({ boardId }) => {
  const { Item } = List;
  const { Meta } = Item;

  return (
    <Query query={queries.projectsForBoard} variables={{ boardId }}>
      {({ loading, error, data }) => {
        if (loading) return (
          <div className="top-level-state">
            <Spin />
          </div>
        );

        if (error) return (
          <div className="top-level-state">
            <Alert
              description="Could not fetch projects."
              message="Error"
              showIcon
              type="error"
            />
          </div>
        );

        return (
          <List
            dataSource={data.projectsForBoard}
            renderItem={prj => (
              <Item>
                <Meta
                  title={
                    <a href={`/projects/${prj.id}`}>{ prj.name }</a>
                  }
                  description={prj.description}
                />
              </Item>
            )}
          />
        );
      }}
    </Query>
  );
};

export default ProjectsContainer;

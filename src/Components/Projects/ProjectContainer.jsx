import React from "react";
import { Query } from "react-apollo";

import { queries } from "../../Services/graphql";

import { PageHeader } from "antd";

const ProjectContainer = ({ history, match }) => {
  const { params } = match;
  const { id } = params;

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
              <div>Board: {project.board.name}</div>
              <div>Components:</div>
              <div>
                { project.components &&
                  project.components.map(c => (
                    <div key={c.id}>{ c.name }</div>
                  )) }
              </div>
            </PageHeader>
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default ProjectContainer;

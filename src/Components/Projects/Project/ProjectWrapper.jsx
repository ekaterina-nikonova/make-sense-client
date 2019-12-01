import React, { useEffect } from "react";
import { Query } from "react-apollo";

import { queries } from "../../../Services/graphql";

import ProjectContainer from "./ProjectContainer";

const ProjectWrapper = ({ history, match }) => {
  const { params } = match;
  const { id } = params;

  return (
    <Query query={queries.project} variables={{ id }}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error :-(</div>;

        const project = data.project;
        const board = data.project.board;
        const chapters = data.project.chapters;

        return(
          <React.Fragment>
            <ProjectContainer
              project={project}
              board={board}
              chapters={chapters}
              history={history}
            />
            <Subscription subscribeToMore={subscribeToMore} />
          </React.Fragment>
        );
      }}
    </Query>
  );
};

const Subscription = ({ subscribeToMore }) => {
  useEffect(() => {
    const subscription = subscribeToMore({
      document: queries.projectSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { projectUpdated } = subscriptionData.data;
        const project = projectUpdated;

        if (projectUpdated) {
          return {
            ...prev,
            projects: prev.projects.map(p => p.id === project.id ? { ...p, ...project } : p)
          }
        }
      }
    });

    subscription();

    return () => subscription();
  }, []);
  return null;
};

export default ProjectWrapper;

import React, { useEffect } from "react";
import { Query } from "react-apollo";

import { queries } from "../../Services/graphqlPublic";

import PublicProjectContainer from "./PublicProjectContainer";

const PublicProjectWrapper = ({ history, match }) => {
  const { params } = match;
  const { id } = params;

  return (
    <Query query={queries.publicProject} variables={{ id }}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error :-(</div>;

        const project = data.publicProject;
        const board = data.publicProject.board;
        const chapters = data.publicProject.chapters;

        return(
          <React.Fragment>
            <PublicProjectContainer
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

export default PublicProjectWrapper;

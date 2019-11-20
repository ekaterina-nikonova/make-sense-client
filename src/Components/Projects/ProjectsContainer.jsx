import React  from "react";

import { Query } from "react-apollo";

import { queries } from "../../Services/graphql";

import TopLevelMenu from "../Layout/TopLevelMenu";
import ProjectList from "./ProjectList";
import NewProjectDrawer from "./NewProjectDrawer";

const ProjectsContainer = ({ location, match }) => {
  const { pathname } = location;
  const { url } = match;


  return (
      <React.Fragment>
        <TopLevelMenu url={url} currentPath={pathname} item="projects" />

        <Query query={queries.projects}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error :-(</div>;

            return (
              <ProjectList
                projects={data.projects}
                subscribeToMore={subscribeToMore}
              />
            );
          }}
        </Query>

        <NewProjectDrawer />
      </React.Fragment>
  );
};

export default ProjectsContainer;

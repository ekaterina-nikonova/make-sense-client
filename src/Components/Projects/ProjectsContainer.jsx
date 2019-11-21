import React  from "react";
import { Redirect, Route, Switch } from 'react-router-dom';

import { Query } from "react-apollo";

import { LoggedInContext } from "../../App";
import { queries } from "../../Services/graphql";

import TopLevelMenu from "../Layout/TopLevelMenu";
import ProjectList from "./ProjectList";
import NewProjectDrawer from "./NewProjectDrawer";
import ProjectContainer from "./ProjectContainer";

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
              <div className="projects-container">
                <Switch>
                  <Route path="/projects/:id" component={ProjectContainer} />
                  <Route path="/projects" component={() => (
                    <ProjectList
                      projects={data.projects}
                      subscribeToMore={subscribeToMore}
                    />
                  )} />
                </Switch>
              </div>
            );
          }}
        </Query>

        <NewProjectDrawer />
      </React.Fragment>
  );
};

const WrappedProjectsContainer = ({ location, match }) => (
  <LoggedInContext.Consumer>
    {loggedIn => (
      loggedIn ? <ProjectsContainer location={location} match={match} /> : <Redirect to='/start' />
    )}
  </LoggedInContext.Consumer>
);

export default WrappedProjectsContainer;

import React, { useEffect } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';

import { Query } from "react-apollo";

import { LoggedInContext } from "../../App";
import { queries } from "../../Services/graphql";

import TopLevelMenu from "../Layout/TopLevelMenu";
import ProjectList from "./ProjectList";
import NewProjectDrawer from "./NewProjectDrawer";
import ProjectWrapper from "./Project/ProjectWrapper";
import { Empty, Result, Spin } from "antd";

const ProjectsContainer = ({ location, match }) => {
  const { pathname } = location;
  const { url } = match;

  return (
      <React.Fragment>
        <TopLevelMenu url={url} currentPath={pathname} item="projects" />

        <Query query={queries.projects}>
          {({ loading, error, data, subscribeToMore }) => {
            useEffect(() => subscribe(subscribeToMore), []);

            const subscribe = subscribeToMore => {
              subscribeToMore({
                document: queries.projectAdded,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;

                  const newProject = subscriptionData.data.projectAdded;

                  return Object.assign({}, prev, {
                    projects: [newProject, ...prev.projects],
                    __typename: prev.projects.__typename
                  })
                }
              });

              subscribeToMore({
                document: queries.projectDeleted,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;

                  const deletedProject = subscriptionData.data.projectDeleted;

                  return Object.assign({}, prev, {
                    projects: prev.projects.filter(prj => prj.id !== deletedProject),
                    __typename: prev.projects.__typename
                  })
                }
              })
            };

            if (loading) return (
              <div className="top-level-state">
                <Spin />
              </div>
            );

            if (error) return (
              <div className="top-level-state">
                <Result
                  status="error"
                  title="Something's wrong"
                  subTitle={error.message}
                />
              </div>
            );

            if (!data || !data.projects || !data.projects.length) return (
              <Empty
                description="No projects."
                className="top-level-state"
              />
            );

            return (
              <div className="projects-container">
                <Switch>
                  <Route path="/projects/:id" component={ProjectWrapper} />
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

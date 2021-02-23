import React from "react";
import { Route, Switch } from "react-router-dom";
import { Query } from "react-apollo";

import { Apollo } from "../../Services/graphqlPublic";
import { queries } from "../../Services/graphqlPublic";

import { Empty, Result, Spin } from "antd";

import PublicProjectsHeader from "./PublicProjectsHeader";
import PublicProjectsList from "./PublicProjectsList";
import PublicProjectWrapper from "./PublicProjectWrapper";

const PublicProjectsContainer = () => {
  return(
    <Apollo>
      <div className="public-projects-container">
        <PublicProjectsHeader />

        <Query query={queries.publicProjects}>
          {({ loading, error, data }) => {
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

            if (!data || !data.publicProjects || !data.publicProjects.length) return (
              <Empty
                description="No projects."
                className="top-level-state"
              />
            );

            return (
              <Switch>
                <Route path="/public-projects/:id" component={PublicProjectWrapper} />
                <Route path="/public-projects" component={() => (
                  <PublicProjectsList
                    projects={data.publicProjects}
                  />
                )} />
              </Switch>
            );
          }}
        </Query>
      </div>
    </Apollo>
  );
};

export default PublicProjectsContainer;

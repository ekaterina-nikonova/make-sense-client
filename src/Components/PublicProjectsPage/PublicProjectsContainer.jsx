import React from "react";

import { Query } from "react-apollo";

import { queries } from "../../Services/graphql";

import { Empty, Result, Spin } from "antd";

import PublicProjectsHeader from "./PublicProjectsHeader";
import PublicProjectsList from "./PublicProjectsList";

const PublicProjectsContainer = () => {
  return(
    <div className="public-projects-container">
      <div className="public-projects-section">
        <PublicProjectsHeader />

        <Query query={queries.publicProjects}>
          {({ loading, error, data }) => {
            if (loading) return (
              <div className="top-level-state">
                <Spin />
              </div>
            );

            if (error) return (
              <Result
                status="error"
                title="Could not fetch public projects"
                subTitle={error.message}
              />
            );

            if (!data || !data.public || !data.public.length) return (
              <Empty
                description="No public projects."
                className="top-level-state"
              />
            );

            return <PublicProjectsList />;
          }}
        </Query>
      </div>
    </div>
  );
};

export default PublicProjectsContainer;

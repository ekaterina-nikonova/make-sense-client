import React from "react";
import { Query } from "react-apollo";

import { queries } from "../../Services/graphql";

import { Alert, Spin } from "antd";

import ComponentDetails from "./ComponentDetails";

const ComponentContainer = ({ match }) => {
  const { params } = match;
  const { id } = params;

  return (
    <Query query={queries.component} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return (
          <div className="top-level-state">
            <Spin />
          </div>
        );

        if (error) return (
          <div className="top-level-state">
            <Alert
              message="Error"
              description="Could not fetch component info."
              showIcon
              type="error"
            />
          </div>
        );

        return (
          <div className="single-component-container">
            <ComponentDetails component={data.component} />
          </div>
        );
      }}
    </Query>
  );
};

export default ComponentContainer;

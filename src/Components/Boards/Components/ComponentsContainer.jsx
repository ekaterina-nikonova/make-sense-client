import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Query } from "react-apollo";

import { queries } from "../../../Services/graphql";

import { Empty, Result, Spin } from 'antd';

import ComponentList from "./ComponentList";

const ComponentsContainer = ({ boardId }) => {
  const subscribe = subscribeToMore => {
    subscribeToMore({
      document: queries.componentAdded,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newComponent = subscriptionData.data.componentAdded;

        return Object.assign({}, prev, {
          components: [newComponent, ...prev.components],
          __typename: prev.components.__typename
        });
      }
    });
  };

  return (
    <Query query={queries.componentsForBoard} variables={{ boardId }}>
      {({ loading, error, data, subscribeToMore }) => {
        useEffect(() => subscribe(subscribeToMore), []);

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

        if (!data || !data.componentsForBoard || !data.componentsForBoard.length) return (
          <Empty
            description="No components for this board."
            className="top-level-state"
          />
        );

        return <ComponentList components={data.componentsForBoard} />
      }}
    </Query>
  );
};

ComponentsContainer.propTypes = {
  boardId: PropTypes.string.isRequired
};

export default ComponentsContainer;

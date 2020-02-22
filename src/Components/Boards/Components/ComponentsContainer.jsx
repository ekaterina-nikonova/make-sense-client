import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Query } from "react-apollo";

import { queries } from "../../../Services/graphql";

import { Button, Empty, Icon, Result, Spin } from 'antd';

import ComponentList from "./ComponentList";
import NewComponentForm from "./NewComponentForm";

const ComponentsContainer = ({ boardId }) => {
  const [newComponentShows, setNewComponentShows] = useState(false);

  const subscribe = subscribeToMore => {
    subscribeToMore({
      document: queries.componentAdded,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newComponent = subscriptionData.data.componentAdded;

        if (prev.componentsForBoard.map(comp => comp.id).includes(newComponent.id)) return prev;

        return Object.assign({}, prev, {
          componentsForBoard: [newComponent, ...prev.componentsForBoard],
          __typename: prev.componentsForBoard.__typename
        });
      }
    });
  };

  const toggleNewComponent = () => setNewComponentShows(!newComponentShows);

  return (
    <React.Fragment>
      <Button
        type="primary"
        shape="circle"
        ghost
        className="add-component-button"
        onClick={toggleNewComponent}
      >
        <Icon type={newComponentShows ? 'minus' : 'plus'} />
      </Button>

      { newComponentShows && <NewComponentForm boardId={boardId} /> }

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

          return (
            <div className="components-container">
              <ComponentList
                components={data.componentsForBoard}
                subscribeToMore={subscribeToMore}
              />
            </div>
          );
        }}
      </Query>
    </React.Fragment>
  );
};

ComponentsContainer.propTypes = {
  boardId: PropTypes.string.isRequired
};

export default ComponentsContainer;

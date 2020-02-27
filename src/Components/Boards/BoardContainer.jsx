import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import { queries } from "../../Services/graphql";

import { Alert, Spin } from 'antd';

import BoardView from './BoardView';

const BoardContainer = ({ match }) => {
  const { params } = match;
  const { id } = params;

  return (
    <div className="board-container">
      <Query query={queries.board} variables={{ id }}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return (
            <div className="top-level-state">
              <Spin />
            </div>
          );

          if (error) return (
            <div className="top-level-state">
              <Alert
                description="Could not fetch board info."
                message="Error"
                showIcon
                type="error"
              />
            </div>
          );

          return <BoardView board={data.board} />;
        }}
      </Query>
    </div>
  );
};

BoardContainer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default BoardContainer;

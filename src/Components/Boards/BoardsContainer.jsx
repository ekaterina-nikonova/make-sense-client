import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Query } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";

import { LoggedInContext } from "../../App";
import { queries } from "../../Services/graphql";

import { Col, Empty, Result, Row, Spin, message } from 'antd';

import AddBoard from './AddBoard';
import BoardCard from './BoardCard';
import BoardContainer from './BoardContainer';
import TopLevelMenu from '../Layout/TopLevelMenu';

function BoardsContainer({ location, match }) {
  const { pathname } = location;
  const { url } = match;

  return (
    <React.Fragment>
      <TopLevelMenu currentPath={pathname} item="boards" url={url} />

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <AddBoard />

        <Query query={queries.boards}>
          {({ loading, error, data, subscribeToMore }) => {
            useEffect(() => subscribe(subscribeToMore), []);

            const subscribe = subscribeToMore => {
              subscribeToMore({
                document: queries.boardAdded,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;

                  const newBoard = subscriptionData.data.boardAdded;

                  if (prev.boards.map(brd => brd.id).includes(newBoard.id)) return prev;

                  return Object.assign({}, prev, {
                    boards: [newBoard, ...prev.boards],
                    __typename: prev.boards.__typename
                  });
                }
              });

              subscribeToMore({
                document: queries.boardDeleted,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;

                  const deletedBoard = subscriptionData.data.boardDeleted;

                  return Object.assign({}, prev, {
                    boards: prev.boards.filter(brd => brd.id !== deletedBoard),
                    __typename: prev.boards.__typename
                  })
                }
              });
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

            if (!data || !data.boards || !data.boards.length) return (
              <Empty
                description="No boards"
                className="top-level-state"
              />
            );

            return (
              <div className="boards-container">
                <Switch>
                  <Route path="/boards/:id" component={BoardContainer} />
                  <Route path="/boards" component={() => (
                    <BoardList
                      boards={data.boards}
                      subscribeToMore={subscribeToMore}
                    />)}
                  />
                </Switch>
              </div>
            );
          }}
        </Query>
      </div>

    </React.Fragment>
  );
}

BoardsContainer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const BoardList = ({ boards }) => {
  const [deleteBoard] = useMutation(queries.deleteBoard);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteBoard({ variables: { id } })
      .then(res => message.success(
        `Deleted board ${res.data.deleteBoard.board.name}.`
      )).catch(err => message.error('Could not delete board.'))
  };

  return (
    <div className="board-list-container">
      <Row
        gutter={[24, 24]}
        type="flex"
        align={boards && boards.length? 'top' : 'middle'}
      >
        {boards && boards.map(board => (
          <Col xs={24} sm={12} md={8} lg={6} key={board.id} className="board-col">
            <BoardCard board={board} deleteBoard={handleDelete} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

const WrappedBoardsContainer = ({ location, match }) => (
  <LoggedInContext.Consumer>
    {loggedIn => (
      loggedIn ? <BoardsContainer location={location} match={match} /> : <Redirect to='/start' />
    )}
  </LoggedInContext.Consumer>
);

export default WrappedBoardsContainer;

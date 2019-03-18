import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { getBoards } from '../../Services/api';

import { Alert, Col, Empty, Row } from 'antd';

import AddBoard from './AddBoard';
import BoardCard from './BoardCard';
import BoardContainer from './BoardContainer';
import TopLevelMenu from '../Layout/TopLevelMenu';

function BoardsContainer({ location, match }) {
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState();

  const { pathname } = location;
  const { url } = match;

  const getBoardsAsync = async () => {
    await getBoards()
      .then(boards => setBoards(boards.data))
      .catch(error => setError(error));
  }

  useEffect(() => { getBoardsAsync(); }, []);

  return (
    <React.Fragment>
      <TopLevelMenu currentPath={pathname} item="boards" url={url} />

      <Switch>
        <Route path="/boards/:id" component={BoardContainer} />

        <Route path="/boards" component={() =>
          <Row gutter={12} type="flex" style={{ alignContent: boards.length ? 'flex-start' : 'stretch' }}>
            <Col span={24}>
              <AddBoard />
            </Col>

            {!error && (!boards || !boards.length) &&
              <Col span={24}>
                <Empty description="No boards." />
              </Col>
            }

            {!error && boards &&
              boards.map(board => (
                <Col xs={24} sm={12} md={6} key={board.id} className="board-col">
                  <BoardCard board={board} boards={boards} />
                </Col>
              ))
            }

            {error &&
              <Col xs={{ span: 22, offset: 1 }} sm={{ span: 12, offset: 6 }}>
                <Alert description="Could not fetch boards." message="Error" showIcon type="error" />
              </Col>
            }
          </Row>
        } />
      </Switch>
    </React.Fragment>
  );
};

BoardsContainer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default BoardsContainer;

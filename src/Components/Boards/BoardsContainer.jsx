import React, { useDispatch, useGlobal, useState } from 'reactn';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ActionCableConsumer } from 'react-actioncable-provider';

import { Alert, Col, Empty, Row } from 'antd';

import { getBoards } from '../../Services/api';

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

      <div style={{ width: '100%' }}>
        <AddBoard />
        <Switch>
          <Route path="/boards/:id" component={BoardContainer} />
          <Route path="/boards" component={BoardList} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

BoardsContainer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const BoardList = function() {
  const [boards, setBoards] = useGlobal('boards');
  const [error, setError] = useState();
  const handleReceivedBoard = useDispatch('boardReducer');

  useEffect(() => { getBoardsAsync(); }, []);

  const getBoardsAsync = async () => {
    await getBoards()
      .then(boards => setBoards(boards.data))
      .catch(error => setError(error));
  };

  return (
    <Row
      gutter={12}
      type="flex"
      align={boards && boards.length? 'top' : 'middle'}
      style={{ height: '100%', alignContent: boards.length ? 'flex-start' : 'stretch' }}
    >
      {!error && (!boards || !boards.length) &&
        <Col span={24}>
          <Empty description="No boards." />
        </Col>
      }

      {!error && boards &&
        <ActionCableConsumer
          channel={{ channel: 'BoardsChannel' }}
          onReceived={response => handleReceivedBoard(response)}
        >
          {boards.map(board => (
            <Col xs={24} sm={12} md={6} key={board.id} className="board-col">
              <BoardCard board={board} />
            </Col>
          ))}
        </ActionCableConsumer>
      }

      {error &&
        <Col xs={{ span: 22, offset: 1 }} sm={{ span: 12, offset: 6 }}>
          <Alert description="Could not fetch boards." message="Error" showIcon type="error" />
        </Col>
      }
    </Row>
  );
};

export default BoardsContainer;

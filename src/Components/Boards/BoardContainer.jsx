import React from 'reactn';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getBoard } from '../../Services/api';

import { Alert } from 'antd';

import BoardView from './BoardView';
import BoardMenu from "../Layout/BoardMenu";

const BoardContainer = ({ match }) => {
  const [board, setBoard] = useState();
  const [error, setError] = useState();

  const { params } = match;

  const getBoardAsync = async params => {
    await getBoard(params.id)
      .then(result => setBoard(result.data))
      .catch(error => setError(error));
  };

  useEffect(() => {
    getBoardAsync(params);
  }, [params]);

  return (
    <div style={{ width: '100%', display: 'flex', minHeight: 'calc(100vh - 48px - 64px' }}>
      {board &&
        <BoardMenu currentBoardId={board.id} />
      }

      {error &&
        <div style={{ flexShrink: '1' }}>
          <Alert description="Could not fetch board info." message="Error" showIcon type="error" />
        </div>
      }

      {!error && board &&
        <div style={{ flexGrow: '1' }}>
          <BoardView board={board} />
        </div>
      }
    </div>
  );
};

BoardContainer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default BoardContainer;

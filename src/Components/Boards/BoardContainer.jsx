import React, { useGlobal } from 'reactn';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getBoards } from '../../Services/api';

import { Alert } from 'antd';

import BoardView from './BoardView';

const BoardContainer = ({ match }) => {
  const [board, setBoard] = useState();
  const [error, setError] = useState();
  const [boards, setBoards] = useGlobal('boards');

  const { params } = match;

  useEffect(() => { getBoardAsync(params); }, [boards]);

  const getBoardAsync = async params => {
    if (boards.length) {
      setBoard(boards.find(b => b.id === params.id));
    }
  };

  useEffect(() => { getBoardsAsync(); }, [params]);

  const getBoardsAsync = async () => {
    await getBoards()
      .then(boards => setBoards(boards.data))
      .catch(error => setError(error));
  };

  return (
    <div style={{ width: '100%', display: 'flex', minHeight: 'calc(100vh - 48px - 64px' }}>
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

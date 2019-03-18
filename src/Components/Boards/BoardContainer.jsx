import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getBoard } from '../../Services/api';

import { Alert } from 'antd';

import BoardView from './BoardView';

const BoardContainer = ({ location, match }) => {
  const [board, setBoard] = useState();
  const [error, setError] = useState();

  const { params } = match;
  const { state } = location;

  const getBoardAsync = async params => {
    await getBoard(params.id)
      .then(result => setBoard(result.data))
      .catch(error => setError(error));
  }

  useEffect(() => {
    getBoardAsync(params);
  }, [params]);

  return (
    <React.Fragment>
      {error &&
        <Alert description="Could not fetch board info." message="Error" showIcon type="error" />
      }

      {
        board &&
        <BoardView board={board} boards={state.boards} />
      }

    </React.Fragment>
  );
};

BoardContainer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default BoardContainer;

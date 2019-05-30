import React, { setGlobal, useGlobal } from 'reactn';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getBoard } from '../../Services/api';

import { Alert } from 'antd';

import BoardView from './BoardView';

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
    <React.Fragment>
      {error &&
        <Alert description="Could not fetch board info." message="Error" showIcon type="error" />
      }

      {
        board &&
        <BoardView board={board} />
      }

    </React.Fragment>
  );
};

BoardContainer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default BoardContainer;

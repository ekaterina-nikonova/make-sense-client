import React, { useDispatch, useGlobal } from 'reactn';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ActionCableConsumer } from 'react-actioncable-provider';

import { Menu } from 'antd';

const BoardMenu = ({ currentBoardId }) => {
  const [boards, setBoards] = useGlobal('boards');
  const [activeBoardId, setActiveBoard] = useState(currentBoardId);
  const boardsDispatch = useDispatch('boardReducer');

  const goTo = e => {
    setActiveBoard(e.key)
  };

  const handleResponse = response => boardsDispatch(response);

  return (
    <ActionCableConsumer
      channel={{ channel: 'BoardsChannel' }}
      onReceived={ handleResponse }
    >
      <Menu onClick={goTo} mode="vertical" selectedKeys={[activeBoardId]} className="top-level-menu">
        {boards &&
          boards.map(board => (
            <Menu.Item key={board.id}>
              <Link to={{
                pathname: `/boards/${board.id}`
              }}>
                {board.name}
              </Link>
            </Menu.Item>
          ))
        }
      </Menu>
    </ActionCableConsumer>
  );
};

BoardMenu.propTypes = {
  currentBoardId: PropTypes.string.isRequired
};

export default BoardMenu;

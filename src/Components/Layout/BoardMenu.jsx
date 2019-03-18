import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';

const BoardMenu = ({ currentBoardId, boards }) => {
  const [activeBoardId, setActiveBoard] = useState(currentBoardId);

  const goTo = e => {
    setActiveBoard(e.key)
  };

  return (
    <Menu onClick={goTo} mode="inline" selectedKeys={[activeBoardId]} className="top-level-menu">
      {boards &&
        boards.map(board => (
          <Menu.Item key={board.id}>
            <Link to={{
              pathname: `/boards/${board.id}`,
              state: { boards }
            }}>
              {board.name}
            </Link>
          </Menu.Item>
        ))
      }
    </Menu>
  );
};

BoardMenu.propTypes = {
  currentBoardId: PropTypes.string.isRequired,
  boards: PropTypes.array.isRequired
};

export default BoardMenu;

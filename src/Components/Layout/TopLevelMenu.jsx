import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Icon, Menu } from 'antd';

const TopLevelMenu = ({ currentPath, item, url }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(item);

  const goTo = e => {
    setActiveMenuItem(e.key);
  };

  return (
    <Menu
      inlineCollapsed={currentPath !== url}
      mode="inline"
      onClick={goTo}
      selectedKeys={[activeMenuItem]}
      className="top-level-menu"
    >
      <Menu.Item key="boards">
        <Link to="/boards">
          <Icon type="hdd" />
          <span>Boards</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="settings">
        <Link to="/settings">
          <Icon type="sliders" />
          <span>Settings</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

TopLevelMenu.propTypes = {
  currentPath: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default TopLevelMenu;
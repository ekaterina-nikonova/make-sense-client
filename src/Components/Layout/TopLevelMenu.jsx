import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Icon, Menu } from 'antd';
import {UserContext} from "../../App";

const TopLevelMenu = ({ currentPath, user, item, url }) => {
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

      <Menu.Item key="profile">
        <Link to="/profile">
          <Icon type="user" />
          <span>Profile</span>
        </Link>
      </Menu.Item>

      {
        (user === 'admin' || user === 'manager') &&
          <Menu.Item key="admin">
            <Link to="/admin">
              <Icon type="setting" />
              <span>Admin panel</span>
            </Link>
          </Menu.Item>
      }
    </Menu>
  );
};

TopLevelMenu.propTypes = {
  currentPath: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

const WrappedTopLevelMenu = ({ currentPath, item, url }) => (
  <UserContext.Consumer>
    {user =>
      <TopLevelMenu
        currentPath={currentPath}
        url={url}
        item={item}
        user={user ? user.role : ''}
      />
    }
  </UserContext.Consumer>
);

export default WrappedTopLevelMenu;

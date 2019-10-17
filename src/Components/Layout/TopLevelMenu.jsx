import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { UserContext } from "../../App";

import { Icon, Menu } from 'antd';

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
      <Menu.Item key="projects">
        <Link to="/projects">
          <Icon type="cluster" />
          <span>Projects</span>
        </Link>
      </Menu.Item>

      <Menu.Item key="boards">
        <Link to="/boards">
          <Icon type="hdd" />
          <span>Boards</span>
        </Link>
      </Menu.Item>

      <Menu.Item key="components">
        <Link to="/components">
          <Icon type="sliders" />
          <span>Components</span>
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

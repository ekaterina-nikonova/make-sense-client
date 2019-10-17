import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { UserContext } from "../../App";

import { Icon, Menu } from 'antd';

import AdminIcon from "../../Assets/Icons/AdminIcon";
import BoardIcon from "../../Assets/Icons/BoardIcon";
import ComponentIcon from "../../Assets/Icons/ComponentIcon";
import ProfileIcon from "../../Assets/Icons/ProfileIcon";
import ProjectIcon from "../../Assets/Icons/ProjectIcon";

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
          <Icon component={ProjectIcon} />
          <span>Projects</span>
        </Link>
      </Menu.Item>

      <Menu.Item key="boards">
        <Link to="/boards">
          <Icon component={BoardIcon} />
          <span>Boards</span>
        </Link>
      </Menu.Item>

      <Menu.Item key="components">
        <Link to="/components">
          <Icon component={ComponentIcon} />
          <span>Components</span>
        </Link>
      </Menu.Item>

      <Menu.Item key="profile">
        <Link to="/profile">
          <Icon component={ProfileIcon} />
          <span>Profile</span>
        </Link>
      </Menu.Item>

      {
        (user === 'admin' || user === 'manager') &&
          <Menu.Item key="admin">
            <Link to="/admin">
              <Icon component={AdminIcon} />
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

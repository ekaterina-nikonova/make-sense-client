import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/react-hooks";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { UserContext } from "../../App";
import { queries } from "../../Services/graphql";

import { Icon, Menu } from 'antd';

import AdminIcon from "../../Assets/Icons/AdminIcon";
import BoardIcon from "../../Assets/Icons/BoardIcon";
import ComponentIcon from "../../Assets/Icons/ComponentIcon";
import ProfileIcon from "../../Assets/Icons/ProfileIcon";
import ProjectIcon from "../../Assets/Icons/ProjectIcon";

const menuItemFrom = path => {
  const pathArray = path.split("/");
  return pathArray[pathArray.length - 1];
};

const TopLevelMenu = ({ currentPath, user, item }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(menuItemFrom(currentPath));
  const [openSubMenu, setOpenSubMenu] = useState(`sub-${item}`);
  const [mobileScreen, setMobileScreen] = useState(window.innerWidth < 576);

  const { loading, error, data } = useQuery(
    queries.projectsBoardsComponents,
  );

  useEffect(
    () => setActiveMenuItem(menuItemFrom(currentPath)),
    [currentPath]
  );

  window.addEventListener(
    'resize',
    () => {
      if (window.innerWidth < 576) {
        setOpenSubMenu('');
      }
      setMobileScreen(window.innerWidth < 576);
    }
  );

  const { SubMenu } = Menu;

  const goTo = e => {
    setActiveMenuItem(e.key);

    if (!mobileScreen) {
      setOpenSubMenu(`sub-${e.key}`);
    }
  };

  return (
    <Menu
      inlineCollapsed={mobileScreen}
      mode="inline"
      onClick={goTo}
      defaultOpenKeys={[!mobileScreen && openSubMenu]}
      defaultSelectedKeys={[activeMenuItem]}
      selectedKeys={[activeMenuItem]}
      className="top-level-menu"
    >
      <SubMenu
        key="sub-projects"
        title={
          <span>
              <Icon component={ProjectIcon} />
              <span>Projects</span>
            </span>
        }
      >
        <Menu.Item key="projects">
          <Link to="/projects">
            <span className="submenu-label">All projects</span>
          </Link>
        </Menu.Item>

        {data && data.projects && data.projects.map(
          project => <Menu.Item key={project.id}>
            <Link to={{ pathname: `/projects/${project.id}` }}>
              { project.name }
            </Link>
          </Menu.Item>
        )}
      </SubMenu>

      <SubMenu
        key="sub-boards"
        title={
          <span>
              <Icon component={BoardIcon} />
              <span>Boards</span>
            </span>
        }
      >
        <Menu.Item key="boards">
          <Link to="/boards">
            <span className="submenu-label">All boards</span>
          </Link>
        </Menu.Item>

        {data && data.boards && data.boards.map(
          board => <Menu.Item key={board.id}>
            <Link to={{ pathname: `/boards/${board.id}` }}>
              { board.name }
            </Link>
          </Menu.Item>
        )}
      </SubMenu>

      <SubMenu
        key="sub-components"
        title={
          <span>
              <Icon component={ComponentIcon} />
              <span>Components</span>
            </span>
        }
      >
        <Menu.Item key="components">
          <Link to="/components">
            <span className="submenu-label">All components</span>
          </Link>
        </Menu.Item>

        {data && data.components && data.components.map(
          component => <Menu.Item key={component.id}>
            <Link to={{ pathname: `/components/${component.id}` }}>
              { component.name }
            </Link>
          </Menu.Item>
        )}
      </SubMenu>

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
};

const WrappedTopLevelMenu = ({ currentPath, item }) => (
  <UserContext.Consumer>
    {user =>
      <TopLevelMenu
        currentPath={currentPath}
        item={item}
        user={user ? user.role : ''}
      />
    }
  </UserContext.Consumer>
);

export default WrappedTopLevelMenu;

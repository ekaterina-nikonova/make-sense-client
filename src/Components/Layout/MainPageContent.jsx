import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Card } from 'antd';

import { LoggedInContext, UserContext } from "../../App";

import ProjectIcon from "../../Assets/Icons/icon-project.svg";
import BoardIcon from "../../Assets/Icons/icon-board.svg";
import ComponentIcon from "../../Assets/Icons/icon-component.svg";
import ProfileIcon from "../../Assets/Icons/icon-profile.svg";
import AdminIcon from "../../Assets/Icons/icon-admin.svg";

const MainPageContent = ({ user }) => {
  const navs = [{
    title: 'Projects',
    link: 'projects',
    icon: <img src={ProjectIcon} alt="Project icon"  />
  }, {
    title: 'Boards',
    link: 'boards',
    icon: <img src={BoardIcon} alt="Board icon" />
  }, {
    title: 'Components',
    link: 'components',
    icon: <img src={ComponentIcon} alt="Components icon" />
  }, {
    title: 'Profile',
    link: 'profile',
    icon: <img src={ProfileIcon} alt="Profile icon" />
  }];

  if (user && user.role === 'admin') {
    navs.push({
      title: 'Admin panel',
      link: 'admin',
      icon: <img src={AdminIcon} alt="Admin panel icon" />
    });
  }

  return (
    <div className="main-page-nav-container">
      { navs.map(nav => <MainPageCard item={nav} />) }
    </div>
  )
};

const MainPageCard = ({ item }) => {
  const { Meta } = Card;

  return (
    <Link to={item.link}>
      <Card cover={item.icon} hoverable>
        <Meta title={item.title} />
      </Card>
    </Link>
  );
};

const WrappedMainPage = () => (
  <LoggedInContext.Consumer>
    {loggedIn => (
      loggedIn ? (
        <UserContext.Consumer>
          {user => (
            <MainPageContent user={user} />
          )}
        </UserContext.Consumer>
        ) : <Redirect to='/start' />
    )}
  </LoggedInContext.Consumer>
);

export default WrappedMainPage;

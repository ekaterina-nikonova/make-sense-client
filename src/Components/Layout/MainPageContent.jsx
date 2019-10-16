import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Card, Col, List, Row } from 'antd';

import { LoggedInContext, UserContext } from "../../App";

import ProjectIcon from "../../Assets/Icons/icon-admin.svg";
import BoardIcon from "../../Assets/Icons/icon-board.svg";
import ComponentIcon from "../../Assets/Icons/icon-component.svg";
import ProfileIcon from "../../Assets/Icons/icon-profile.svg";
import AdminIcon from "../../Assets/Icons/icon-admin.svg";

const MainPageContent = ({ user }) => {
  const navs = [{
    title: 'Projects',
    icon: <img src={ProjectIcon} alt="Project icon"  />
  }, {
    title: 'Boards',
    icon: <img src={BoardIcon} alt="Board icon" />
  }, {
    title: 'Components',
    icon: <img src={ComponentIcon} alt="Components icon" />
  }, {
    title: 'Profile',
    icon: <img src={ProfileIcon} alt="Profile icon" />
  }];

  if (user && user.role === 'admin') {
    navs.push({
      title: 'Admin panel',
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
    <Card cover={item.icon}>
      <Meta title={item.title} />
    </Card>
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

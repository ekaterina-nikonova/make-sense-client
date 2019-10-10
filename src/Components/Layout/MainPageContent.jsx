import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Col, Row } from 'antd';

import MainPageCard from '../UI/MainPageCard';
import {LoggedInContext} from "../../App";

const MainPageContent = () => {
  return (
    <React.Fragment>
      <Row gutter={24} type="flex">
        <Col md={12} xs={24}>
          <Link to="/boards">
            <MainPageCard
              alt="boards"
              img="board-200.svg"
              title="Boards"
            />
          </Link>
        </Col>

        <Col md={12} xs={24}>
          <Link to="/settings">
            <MainPageCard
              alt="settings"
              img="settings-200.svg"
              title="Settings"
            />
          </Link>
        </Col>
      </Row>
    </React.Fragment>
  )
};

const WrappedMainPage = () => (
  <LoggedInContext.Consumer>
    {loggedIn => (
      loggedIn ? <MainPageContent /> : <Redirect to='/start' />
    )}
  </LoggedInContext.Consumer>
);

export default WrappedMainPage;

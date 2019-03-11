import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Col, Layout, Row }  from 'antd';
import { Icon, Menu } from 'antd';
import { Alert } from 'antd';

import './App.less';
import { getBoards } from './Services/api';

import Logo from './Components/UI/Logo';
import MainPageCard from './Components/MainPageCard';

class App extends Component {
  render() {
    const { Content, Footer, Header } = Layout;

    return (
      <Layout>
        <Router>
          <React.Fragment>
            <Header>
              <Row>
                <Col md={12} xs={24} offset={6} className="app-header">
                  <Link to="/" style={{ display: 'flex' }}>
                    <Logo height={50} />
                  </Link>
                  <span className="app-title">Make sense</span>
                </Col>
              </Row>
            </Header>

            <Content className="page-content">
              <Route exact path="/" component=  {MainPageContent} />
              <Route path="/boards" component={BoardsContainer} />
              <Route path="/settings" component={SettingsContainer} />
            </Content>
          </React.Fragment>
        </Router>

        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default App;

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

function BoardsContainer() {
  const [boards, setBoards] = useState();
  const [error, setError] = useState();
console.log(boards)
  useEffect(() => {
    getBoards
    .then(boards => setBoards(boards.data))
    .catch(error => setError(error));
  });

  return (
    <React.Fragment>
      <TopLevelMenu item="boards" />

      {boards && boards.length &&
        boards.map(board => <div key={board.id}>{board.name} - {board.description}</div>)
      }

      {error &&
        <Alert description="Could not fetch boards." message="Error" showIcon type="error" />
      }
    </React.Fragment>
  );
};

const SettingsContainer = () => (
  <React.Fragment>
    <TopLevelMenu item="settings" />
    <div>Settings will be here</div>
  </React.Fragment>
);

const TopLevelMenu = ({ item }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(item);

  const goTo = e => {
    setActiveMenuItem(e.key);
  };

  return (
    <Menu onClick={goTo} mode="inline" selectedKeys={[activeMenuItem]} className="top-level-menu">
      <Menu.Item key="boards">
        <Link to="/boards">
          <Icon type="hdd" />
          Boards
        </Link>
      </Menu.Item>
      <Menu.Item key="settings">
        <Link to="/settings">
          <Icon type="sliders" />
          Settings
        </Link>
      </Menu.Item>
    </Menu>
  );
};

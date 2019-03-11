import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Col, Layout, Row }  from 'antd';

import './App.less';

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
                  <Link to="/">
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

const BoardsContainer = () => (
  <div>Boards will be here</div>
);

const SettingsContainer = () => (
  <div>Settings will be here</div>
);

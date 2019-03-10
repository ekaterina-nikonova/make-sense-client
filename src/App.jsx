import React, { Component } from 'react';
import './App.less';

import { Col, Layout, Row }  from 'antd';

import Logo from './Components/UI/Logo';
import MainPageCard from './Components/MainPageCard';

class App extends Component {
  render() {
    const { Content, Footer, Header } = Layout;

    return (
      <Layout>
        <Header>
          <Row>
            <Col md={12} xs={24} offset={6} className="app-header">
              <Logo height={50} />
              <span className="app-title">Make sense</span>
            </Col>
          </Row>
        </Header>
        <Content className="page-content">
          <Row gutter={24} type="flex">
            <Col md={12} xs={24}>
              <MainPageCard
                alt="boards"
                img="board-200.svg"
                title="Boards"
              />
            </Col>

            <Col md={12} xs={24}>
              <MainPageCard
                alt="settings"
                img="settings-200.svg"
                title="Settings"
              />
            </Col>
          </Row>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default App;

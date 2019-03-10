import React, { Component } from 'react';
import './App.less';

import { Col, Layout, Row }  from 'antd';

import Logo from './Components/UI/Logo';

class App extends Component {
  render() {
    const { Content, Footer, Header } = Layout;

    return (
      <Layout>
        <Header>
          <Row>
            <Col span={12} offset={6}>
              <Logo height={50} />
              Make sense
            </Col>
          </Row>
        </Header>
        <Content>
          <Row>
            <Col span={12}>Boards</Col>
            <Col span={12}>Settings</Col>
          </Row>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default App;

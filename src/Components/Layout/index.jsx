import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import { Button, Col, Dropdown, Icon, Layout, Row } from 'antd';

import { authLogout } from '../../Services/auth';

import BoardsContainer from '../Boards/BoardsContainer';
import EmptyFullPage from '../UI/EmptyFullPage';
import Logo from '../UI/Logo';
import MainPageContent from './MainPageContent';
import SettingsContainer from '../Settings/SettingsContainer';
import LoginForm from './LoginForm';
import SignupPage from './SignupPage';

export default () => {
  const { Content, Footer, Header } = Layout;

  return (
    <Layout>
      <Router>
        <React.Fragment>
          <Header style={{ position: 'sticky', top: '0' }}>
            <Row>
              <Col span={24} className="app-header">
                <Link to="/" style={{ display: 'flex' }}>
                  <Logo height={40} />
                </Link>
                <span className="app-title">Make sense</span>

                <span style={{ marginLeft: 'auto' }}>
                  {
                    localStorage.signedIn ? (
                      <Button type="dashed" onClick={authLogout}>
                        Log out <Icon type="logout" />
                      </Button>
                    ) : (
                      <Dropdown overlay={<LoginForm />} trigger={['click']}>
                        <Button type="dashed">
                          Log in <Icon type="down" />
                        </Button>
                      </Dropdown>  
                    )
                  }
                </span>
              </Col>
            </Row>
          </Header>

          <Content className="page-content">
            <Route exact path="/" component={MainPageContent} />
            <Route path="/boards" component={BoardsContainer} />
            <Route path="/settings" component={SettingsContainer} />
            <Route path="/signup" component={SignupPage} />

            <Route path="/components/:id" component={({ match }) => (
              <EmptyFullPage
                description={`A page for the component with id ${match.params.id} will be here soon.`}
              />
            )} />

          </Content>
        </React.Fragment>
      </Router>

      <Footer>Footer</Footer>
    </Layout>
  );
};

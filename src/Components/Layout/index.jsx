import React, { useState } from 'reactn';
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom';

import { ActionCableConsumer } from 'react-actioncable-provider';

import {Button, Col, Dropdown, Icon, Layout, Row} from 'antd';

import { LoggedInContext } from "../../App";
import { authLogout } from '../../Services/auth';

import BoardsContainer from '../Boards/BoardsContainer';
import EmptyFullPage from '../UI/EmptyFullPage';
import iconConnected from '../../Assets/Icons/icon-connected.png';
import iconDisconnected from '../../Assets/Icons/icon-disconnected.png';
import logo from '../../Assets/Images/logo_square.png';
import MainPageContent from './MainPageContent';
import StartPageContent from "./StartPage/StartPageContent";
import SettingsContainer from '../Settings/SettingsContainer';
import LoginForm from './LoginForm';
import SignupPage from './SignupPage';
import Footer from './Footer';

export default () => {
  const { Content, Header } = Layout;

  const [ connected, setConnected ] = useState(false);

  return (
    <Layout>
      <Router>
        <React.Fragment>
          <Header style={{ position: 'sticky', top: '0' }}>
            <Row>
              <Col span={24} className="app-header">
                <Link to="/" style={{ display: 'flex' }}>
                  <img src={logo} alt="Brittle Pins logo" className="logo" />
                </Link>
                <span className="app-title">Brittle pins</span>

                <span style={{ marginLeft: 'auto' }}>
                  <ActionCableConsumer
                    channel={{ channel: 'AppChannel' }}
                    onConnected={() => setConnected(true)}
                    onDisconnected={() => setConnected(false)}
                  >
                    <span style={{ margin: '0 1rem', opacity: '.8' }}>
                      <img
                        alt="connection indicator"
                        src={connected ? iconConnected : iconDisconnected}
                        style={{ maxHeight: '1.2rem'}}
                      />
                    </span>
                  </ActionCableConsumer>

                  <LoggedInContext.Consumer>
                    {loggedIn => (
                      loggedIn ? (
                        <Button type="dashed" onClick={authLogout}>
                          Log out <Icon type="logout" />
                        </Button>
                      ) : (
                        <Dropdown overlay={<LoginForm />} trigger={['hover']}>
                          <Button type="dashed">
                            Log in <Icon type="down" />
                          </Button>
                        </Dropdown>
                      )
                    )}
                  </LoggedInContext.Consumer>
                </span>
              </Col>
            </Row>
          </Header>

          <Content className="page-content">
            <Route exact path="/" component={MainPageContent} />
            <Route path="/start" component={StartPageContent} />
            <Route path="/boards" component={BoardsContainer} />
            <Route path="/settings" component={SettingsContainer} />
            <Route path="/signup" component={SignupPage} />
            <Route exact path="/components" component={MainPageContent} />

            <Route path="/components/:id" component={({ match }) => (
              <LoggedInContext.Consumer>
                {loggedIn => (
                  loggedIn ? (
                    <EmptyFullPage
                      description={`A page for the component with id ${match.params.id} will be here soon.`}
                    />
                  ) : <Redirect to='/start' />
                )}

              </LoggedInContext.Consumer>
            )} />

          </Content>
        </React.Fragment>
      </Router>

      <Footer />
    </Layout>
  );
};

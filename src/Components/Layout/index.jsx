import React, { useState } from 'reactn';
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom';

import { ActionCableConsumer } from 'react-actioncable-provider';

import { Button, Col, Drawer, Icon, Layout, Row } from 'antd';

import { LoggedInContext } from "../../App";
import { authLogout } from '../../Services/auth';

import AdminPanelContainer from '../AdminPanel/AdminPanelContainer';
import BoardsContainer from '../Boards/BoardsContainer';
import EmptyFullPage from '../UI/EmptyFullPage';
import logo from '../../Assets/Images/logo_square.png';
import MainPageContent from './MainPageContent';
import StartPageContent from "../StartPage/StartPageContent";
import AboutPageContainer from "../AboutPage/AboutPageContainer";
import SettingsContainer from '../Settings/SettingsContainer';
import LoginForm from './LoginForm';
import SignupPage from './SignupPage';
import Footer from './Footer';
import {ServerStatusConnected, ServerStatusDisconnected} from "../UI/ServerStatusIcon";

export default () => {
  const { Content, Header } = Layout;

  const [ connected, setConnected ] = useState(false);
  const [ drawerOpen, setDrawerOpen ] = useState(false);

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
                  <LoggedInContext.Consumer>
                    {loggedIn => {
                      const openDrawer = () => {
                        if (!loggedIn) {
                          setDrawerOpen(true);
                        }
                      };

                      const closeDrawer = () => {
                        setDrawerOpen(false);
                      };

                      const logOut = () => {
                        setDrawerOpen(false);
                        authLogout();
                      };

                      return (
                        loggedIn ? (
                          <Button type="dashed" onClick={logOut}>
                            Log out <Icon type="logout" />
                          </Button>
                        ) : (
                          <React.Fragment>
                            <Button type="dashed" onClick={openDrawer}>
                              Log in <Icon type="down" />
                            </Button>

                            <Drawer
                              title="Log in"
                              visible={drawerOpen}
                              onClose={closeDrawer}
                              width="fit-content"
                              className="login-drawer"
                            >
                              <LoginForm />
                            </Drawer>
                          </React.Fragment>
                        ));
                    }}
                  </LoggedInContext.Consumer>

                  <ActionCableConsumer
                    channel={{ channel: 'AppChannel' }}
                    onConnected={() => setConnected(true)}
                    onDisconnected={() => setConnected(false)}
                  >
                    <span style={{ margin: '0 1rem', opacity: '.8' }}>
                      { connected ? <ServerStatusConnected /> : <ServerStatusDisconnected /> }
                    </span>
                  </ActionCableConsumer>

                </span>
              </Col>
            </Row>
          </Header>

          <Content className="page-content">
            <Route exact path="/" component={MainPageContent} />
            <Route path="/start" component={StartPageContent} />
            <Route path="/about" component={AboutPageContainer} />
            <Route path="/boards" component={BoardsContainer} />
            <Route path="/settings" component={SettingsContainer} />
            <Route path="/admin" component={AdminPanelContainer} />
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

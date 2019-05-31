import React, { setGlobal, useGlobal } from 'reactn';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import { ActionCableConsumer } from 'react-actioncable-provider';

import {Badge, Button, Col, Dropdown, Icon, Layout, Row} from 'antd';

import { authLogout } from '../../Services/auth';

import BoardsContainer from '../Boards/BoardsContainer';
import EmptyFullPage from '../UI/EmptyFullPage';
import iconConnected from '../../Assets/Icons/icon-connected.png';
import iconDisconnected from '../../Assets/Icons/icon-disconnected.png';
import iconError from '../../Assets/Icons/icon-error.png';
import iconUnknownStatus from '../../Assets/Icons/icon-unknown-status.png';
import logo from '../../Assets/Images/logo_square_full_color.png';
import MainPageContent from './MainPageContent';
import SettingsContainer from '../Settings/SettingsContainer';
import LoginForm from './LoginForm';
import SignupPage from './SignupPage';

import { LoggedInContext } from "../../App";

export default () => {
  const { Content, Footer, Header } = Layout;

  const [ status, setStatus ] = useGlobal('status');

  const selectIcon = appStatus => {
    switch (appStatus) {
      case 'connected':
        return iconConnected;
      case 'disconnected':
        return iconDisconnected;
      case 'error':
        return iconError;
      default:
        return iconUnknownStatus;
    }
  };

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
                    onConnected={() => setStatus('connected')}
                    onDisconnected={() => setStatus('disconnected')}
                  >
                  </ActionCableConsumer>
                    <span style={{ margin: '0 1rem', opacity: '.8' }}>
                      <img
                        alt="connection indicator"
                        src={selectIcon(status)}
                        style={{ maxHeight: '1.2rem'}}
                      />
                    </span>

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

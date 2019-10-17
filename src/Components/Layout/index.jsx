import React, { useState } from 'reactn';
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom';

import { ActionCableConsumer } from 'react-actioncable-provider';

import { Col, Layout, Row } from 'antd';

import { LoggedInContext } from "../../App";

import StartPageContent from "../StartPage/StartPageContent";
import AboutPageContainer from "../AboutPage/AboutPageContainer";
import MainPageContent from './MainPageContent';
import ProjectsContainer from "../Projects/ProjectsContainer";
import BoardsContainer from '../Boards/BoardsContainer';
import ComponentsContainer from '../Components/ComponentsContainer';
import ProfileContainer from "../Profile/ProfileContainer";
import AdminPanelContainer from '../AdminPanel/AdminPanelContainer';
import EmptyFullPage from '../UI/EmptyFullPage';
import logo from '../../Assets/Images/logo_square.png';

import SignupPage from './SignupPage';
import Footer from './Footer';
import { ServerStatusConnected, ServerStatusDisconnected } from "../UI/ServerStatusIcon";
import LogInOutButton from "./LogInOutButton";

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
                  <LoggedInContext.Consumer>
                    { loggedIn => <LogInOutButton loggedIn={loggedIn} /> }
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
            <Route path="/projects" component={ProjectsContainer} />
            <Route path="/boards" component={BoardsContainer} />
            <Route path="/components" component={ComponentsContainer} />
            <Route path="/profile" component={ProfileContainer} />
            <Route path="/admin" component={AdminPanelContainer} />
            <Route path="/signup" component={SignupPage} />

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

import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import { Layout } from 'antd';

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

import SignupPage from './SignupPage';
import Header from './Header';
import Footer from './Footer';

export default () => {
  const { Content } = Layout;

  return (
    <Layout>
      <Router>
        <React.Fragment>
          <Header />

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
          </Content>
        </React.Fragment>
      </Router>

      <Footer />
    </Layout>
  );
};

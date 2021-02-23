import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Layout } from 'antd';

import StartPageContent from "../StartPage/StartPageContent";
import AboutPageContainer from "../AboutPage/AboutPageContainer";
import PublicProjectsContainer from "../PublicProjectsPage/PublicProjectsContainer";
import MainPageContent from './MainPageContent';
import ProjectsContainer from "../Projects/ProjectsContainer";
import BoardsContainer from '../Boards/BoardsContainer';
import AllComponentsContainer from '../Components/AllComponentsContainer';
import ProfileContainer from "../Profile/ProfileContainer";
import AdminPanelContainer from '../AdminPanel/AdminPanelContainer';

import SignupPage from './SignupPage';
import Header from './Header';
import Footer from './Footer';

export default () => {
  const { Content } = Layout;

  return (
    <Layout>
      <Router>
        <React.Fragment>
          <Route path="/" component={Header} />

          <Content className="page-content">
            <Route exact path="/" component={MainPageContent} />
            <Route path="/start" component={StartPageContent} />
            <Route path="/public-projects" component={PublicProjectsContainer} />
            <Route path="/about" component={AboutPageContainer} />
            <Route path="/projects" component={ProjectsContainer} />
            <Route path="/boards" component={BoardsContainer} />
            <Route path="/components" component={AllComponentsContainer} />
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

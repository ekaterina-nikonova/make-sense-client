import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

import { LoggedInContext } from "../../App";

import EmptyFullPage from '../UI/EmptyFullPage';
import TopLevelMenu from "../Layout/TopLevelMenu";

const ComponentsContainer = ({ location, match }) => {
  const { pathname } = location;
  const { url } = match;

  return (
    <React.Fragment>
      <TopLevelMenu url={url} currentPath={pathname} item="components" />

      <Switch>
        <Route path="/components/:id" component={ComponentPlaceholder} />
        <Route path="/components" component={ComponentsPlaceholder} />
      </Switch>
    </React.Fragment>
  );
};

const ComponentsPlaceholder = () =>
  <EmptyFullPage description="The Components page is under construction." />;

const ComponentPlaceholder = ({ match }) =>
  <EmptyFullPage
    description={`A page for the component with id ${match.params.id} will be here soon.`}
  />;

const WrappedComponentsContainer = ({ location, match }) => (
  <LoggedInContext.Consumer>
    { loggedIn => loggedIn
      ? <ComponentsContainer location={location} match={match} />
      : <Redirect to="/start" />
    }
  </LoggedInContext.Consumer>
);

export default WrappedComponentsContainer;

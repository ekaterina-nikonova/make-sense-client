import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";

import { LoggedInContext } from "../../App";

import EmptyFullPage from '../UI/EmptyFullPage';
import TopLevelMenu from '../Layout/TopLevelMenu';

const ComponentsContainer = ({ location, match }) => {
  const { pathname } = location;
  const { url } = match;

  return (
    <React.Fragment>
      <TopLevelMenu currentPath={pathname} item="components" url={url} />

      <EmptyFullPage description="The Components page is under construction." />
    </React.Fragment>
  );
};

ComponentsContainer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const WrappedComponentsContainer = ({ location, match }) => (
  <LoggedInContext.Consumer>
    {loggedIn => (
      loggedIn ? <ComponentsContainer location={location} match={match} /> : <Redirect to='/start' />
    )}
  </LoggedInContext.Consumer>
);

export default WrappedComponentsContainer;

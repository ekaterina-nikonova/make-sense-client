import React from 'react';
import PropTypes from 'prop-types';

import EmptyFullPage from '../UI/EmptyFullPage';
import TopLevelMenu from '../Layout/TopLevelMenu';

const SettingsContainer = ({ location, match }) => {
  const { pathname } = location;
  const { url } = match;

  return (
    <React.Fragment>
      <TopLevelMenu currentPath={pathname} item="settings" url={url} />

      <EmptyFullPage description="The Settings page is under construction." />
    </React.Fragment>
  );
};

SettingsContainer.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default SettingsContainer;

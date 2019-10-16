import React, { useState } from "react";

import { authLogout } from '../../Services/auth';

import { Button, Drawer, Icon } from 'antd';

import LoginForm from './LoginForm';

const LogInOutButton = ({ loggedIn }) => {
  const [ drawerOpen, setDrawerOpen ] = useState(false);

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
          <Icon type="login" />
          Log in
        </Button>

        <Drawer
          title="Log in"
          visible={drawerOpen}
          onClose={closeDrawer}
          width="fit-content"
          className="login-drawer"
        >
          <LoginForm closeDrawer={closeDrawer} />
        </Drawer>
      </React.Fragment>
    ));
};

export default LogInOutButton;

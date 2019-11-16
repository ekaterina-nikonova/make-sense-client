import React, { useState } from "reactn";
import { Link } from "react-router-dom";
import { ActionCableConsumer } from "react-actioncable-provider";

import { LoggedInContext } from "../../App";

import { Col, Layout, Row } from "antd";

import logo from "../../Assets/Images/logo_square.png";
import LogInOutButton from "./LogInOutButton";
import { ServerStatusConnected, ServerStatusDisconnected } from "../UI/ServerStatusIcon";

export default () => {
  const { Header } = Layout;

  const [ connected, setConnected ] = useState(false);

  return <Header style={{ position: 'sticky', top: '0' }}>
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
              { connected ? <ServerStatusConnected /> : <ServerStatusDisconnected /> }
            </span>
          </ActionCableConsumer>

          <LoggedInContext.Consumer>
            { loggedIn => <LogInOutButton loggedIn={loggedIn} /> }
          </LoggedInContext.Consumer>
        </span>
      </Col>
    </Row>
  </Header>;
};

import React, { Component } from 'react';
import { ActionCableProvider } from 'react-actioncable-provider';

import { wsBaseUrl } from "./Services/api";

import Layout from './Components/Layout';

import './App.less';

class App extends Component {
  render() {
    return (
      <ActionCableProvider url={wsBaseUrl}>
        <Layout />;
      </ActionCableProvider>
    );
  }
}

export default App;

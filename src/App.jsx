import React, {useEffect, useState} from 'react';
import { ActionCableProvider } from 'react-actioncable-provider';

import { wsBaseUrl } from "./Services/api";

import Layout from './Components/Layout';

import './App.less';

export const LoggedInContext = React.createContext(false);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.signedIn);

  useEffect(() => {
    document.addEventListener(
      'storageChanged',
      e => setLoggedIn(localStorage.signedIn)
    );
    window.addEventListener(
      'storage',
      e => setLoggedIn(localStorage.signedIn)
    );
  });

  return (
    <ActionCableProvider url={wsBaseUrl}>
      <LoggedInContext.Provider value={loggedIn}>
        <Layout/>;
      </LoggedInContext.Provider>
    </ActionCableProvider>
  );
};

export default App;

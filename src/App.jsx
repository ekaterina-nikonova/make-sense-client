import React, { addCallback, addReducer, setGlobal } from 'reactn';
import { useEffect, useState } from 'react';
import { ActionCableProvider } from 'react-actioncable-provider';

import {me, wsBaseUrl} from "./Services/api";

import Layout from './Components/Layout';

import './App.less';

export const LoggedInContext = React.createContext(localStorage.signedIn);
export const UserContext = React.createContext();

setGlobal({
  boards: [],
  status: null
});

addReducer('boardReducer', (global, dispatch, action) => {
  const board = action.data;
  let newState;

  switch (action.action) {
    case 'create':
      newState = { boards: [...global.boards, board] };
      break;
    case 'update':
      newState = { boards: global.boards.map(b =>
          b.id === board.id ? board : b) };
      break;
    case 'destroy':
      newState = { boards: global.boards.filter(b => b.id !== board.id) };
      break;
    default:
      newState = global.boards;
  }
  return newState;
});

addCallback(global => {
  console.log("Callback called", global);
  return null;
});

const App = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.signedIn);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (loggedIn) {
      me()
        .then(response => setCurrentUser(response.data))
        .catch(err => console.log("ERR", err));
    }
  }, []);

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
        <UserContext.Provider value={currentUser}>
          <Layout/>
        </UserContext.Provider>
      </LoggedInContext.Provider>
    </ActionCableProvider>
  );
};

export default App;

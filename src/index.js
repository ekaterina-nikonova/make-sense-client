import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

const originalSetItem = localStorage.setItem;
localStorage.setItem = function() {
  const event = new Event('storageChanged');
  originalSetItem.apply(this, arguments);
  document.dispatchEvent(event);
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

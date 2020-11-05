// Load dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

// Get root element by ID
const root = document.querySelector("#root");

if (root.hasChildNodes() === true) { // For server side rendering
  ReactDOM.hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root
  );
} else { // For client side rendering
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root
  );
}

// Register service worker
serviceWorker.register();

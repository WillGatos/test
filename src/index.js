import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from './Redux/store'
import { Provider } from 'react-redux'
import * as serviceRegistration from './serviceWorkerRegistration';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.perxins.com'; //https://api.perxins.com

ReactDOM.render(
    <Router>
      <Provider store={store}>
      <React.StrictMode>
          <App />
      </React.StrictMode>
      </Provider>
    </Router>
  ,
  document.getElementById("root")
);
serviceRegistration.register();

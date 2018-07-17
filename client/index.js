//client/index.js
import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom";
import Analytics from "react-router-ga";
import { BrowserRouter, browserHistory, HashRouter } from "react-router-dom";
ReactDOM.render(
  <HashRouter>
    <Analytics id="UA-122479643-1" debug>
      <App />
    </Analytics>
  </HashRouter>,
  document.getElementById("root")
);

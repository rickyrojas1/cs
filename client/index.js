//client/index.js
import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom";
import { BrowserRouter, browserHistory, HashRouter } from "react-router-dom";
ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);

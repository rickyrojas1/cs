//client/components/App.js
import React from "react";
import axios from "axios";
import Dash from "./Dash";
import News from "./News";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Coin from "./Coin";

var something = "nullz";

const App = () => {
  return (
    <div className="top-header">
      <nav className="navMenu">
        <Link to="/">
          <img src="./img/cs2.png" alt="coinStalker" className="logo" />
        </Link>
      </nav>

      <Route
        path="/"
        exact={true}
        render={props => {
          return <Dash id={something} />;
        }}
      />
      <Route path="/coins" exact={true} component={Coin} />
      <Route path="/coins/:coinSymbol" component={Coin} />
      <Route path="/news" component={News} />
    </div>
  );
};

export default App;

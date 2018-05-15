//client/components/App.js
import React from 'react';
import axios from 'axios';
import Add from './Add';
import Dash from './Dash';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Coin from './Coin';

var sometin = "nullz";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      filterRule: ''
    }
  };

  render() {
    let temp = "ojoasndsa";

    return (<div className="top-header">
      <nav className="navMenu">
        <object type="image/svg+xml" data="../img/2-3.svg" className="logo">
          <Link to="/">Home</Link>
        </object>
        <ul className="menu">

          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Home2">Login</Link>
          </li>

        </ul>
      </nav>

      <Route path="/" exact={true} render={(props) => {
        return (<Dash id={sometin} />);
      }} />
      <Route path="/coins" exact={true} component={Coin} />
      <Route path="/coins/:coinSymbol" component={Coin} />
    </div>);
  }
}
export default App;

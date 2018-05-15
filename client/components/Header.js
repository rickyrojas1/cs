import React, {Component} from "react";

class Header extends Component {
  render() {

    return (<header className="App-header">

      <ul className="menu">

        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Login</a>
        </li>
      </ul>
    </header>);
  }
}

export default Header;

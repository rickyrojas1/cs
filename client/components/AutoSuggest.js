import React, { Component } from "react";
import CoinSuggest from "./CoinSuggest";

class AutoSuggest extends Component {
  handleKeyPress(event) {
    console.log("event :", event);
    if (event.key == "Enter") {
      console.log("enter press here! ");
    }
  }

  render() {
    if (this.props.filtered) {
      let arr = this.props.filtered.slice(0, 15);
      console.log("this :", this);
      return (
        <div>
          <ul
            style={{ listStyleType: "none" }}
            ref="dropdown"
            onKeyPress={this.handleKeyPress(this)}
          >
            {arr.map((v, i) => {
              return (
                <li>
                  <CoinSuggest key={i} coin={v} />
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return <div>Nothing found</div>;
    }
  }
}

export default AutoSuggest;
AutoSuggest.defaultProps = {
  filtered: ""
};

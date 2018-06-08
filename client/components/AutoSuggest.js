import React, { Component } from "react";
import CoinSuggest from "./CoinSuggest";

class AutoSuggest extends Component {
  render() {
    if (this.props.filtered) {
      let arr = this.props.filtered.slice(0, 15);
      return (
        <div>
          {arr.map((v, i) => {
            return <CoinSuggest key={i} coin={v} />;
          })}
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

import React, { Component } from "react";
import AutoSuggest from "./AutoSuggest";
import SemanticSearch from "./SemanticSearch";
var FontAwesome = require("react-fontawesome");

class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filterRule: ""
    };

    this.test = this.test.bind(this);
  }

  test(e) {
    let val = this.refs.myValue.value;
    this.setState({ filterRule: val });
  }

  render() {
    let list = this.props.coinList;

    let filtered = list.filter(val => {
      if (
        val.name.toLowerCase().slice(0, this.state.filterRule.length) ==
          this.state.filterRule.toLowerCase() ||
        val.symbol.toLowerCase().slice(0, this.state.filterRule.length) ==
          this.state.filterRule.toLowerCase()
      ) {
        return val;
      }
    });
    console.log("filtered :", filtered);
    return (
      <div className="search-container">
        <div className="main-container">
          <img src="./img/cs2.png" alt="coinStalker" className="logo2" />
        </div>

        <input
          type="text"
          className="main-search"
          ref="myValue"
          onInput={e => this.test(e)}
        />

        <span>
          <FontAwesome className="search-icon" name="search" size="2x" />
        </span>

        <div className={this.state.filterRule ? "auto-complete" : "hidden"}>
          <AutoSuggest filtered={filtered} />
        </div>
      </div>
    );
  }
}

export default SearchPage;

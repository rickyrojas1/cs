//client/components/Dash.js
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import TestTable from "./TestTable";
import SearchPage from "./SearchPage";
import Typehead from "./Typehead";
import News from "./News";

import Coin from "./Coin";
import App from "./App";
import Particles from "react-particles-js";
import ParticlePage from "./ParticlePage.js";
import Footer from "./Footer.js";
import "../css/loader.css";
import AutoFill from "./AutoFill";

var querystring = require("querystring");

class Dash extends React.Component {
  constructor() {
    super();
    this.state = {
      info: [],
      news: [],
      cryptoInfo: [],
      cryptoNews: [],
      globalData: []
    };

    this.mergeList = this.mergeList.bind(this);
    this.findWinner = this.findWinner.bind(this);
  }

  componentDidMount() {
    this.getData(this);
  }

  getData(e) {
    axios
      .post("/coinMarketCap", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function(response) {
        e.setState({ info: response.data });
      });
    axios
      .post("/coinMarketCapFull", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function(response) {
        e.setState({ globalData: response.data });
      });

    axios
      .post("/cryptoCompare", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function(response) {
        var coins = response.data.Data;
        e.setState({ cryptoInfo: coins });
      });
  }

  mergeList(a, b) {
    let aSymbols = [];
    let bSymbols = [];
    let filtered = [];

    Object.keys(b).forEach(key => {
      bSymbols[key] = b[key].ImageUrl;
      if (key == "IOT") {
        bSymbols["MIOTA"] = b[key].ImageUrl;
      }
    });

    let count1 = 0;
    let count2 = 0;
    Object.keys(a).forEach(key => {
      aSymbols.push(a[key].symbol);
      if (a[key].symbol in bSymbols) {
        a[key].ImageUrl = bSymbols[a[key].symbol];
        if (a[key].symbol == "MIOTA") {
        }

        filtered.push(a[key]);
        count1++;
      } else {
        count2++;
      }
    });

    return filtered;
  }

  findWinner(e) {
    let winner = e[0];
    let loser = e[0];
    let winnerAndLoser = [];
    e.map((currElement, index) => {
      if (
        parseFloat(currElement.percent_change_24h) >
        parseFloat(winner.percent_change_24h)
      ) {
        winner = currElement;
      }

      if (
        parseFloat(currElement.percent_change_24h) <
        parseFloat(loser.percent_change_24h)
      ) {
        loser = currElement;
      }
    });
    winnerAndLoser.push(winner);
    winnerAndLoser.push(loser);
    return winnerAndLoser;
  }
  render() {
    if (this.state.info == "") {
      return (
        <div id="preloader">
          <div id="loader" />
        </div>
      );
    } else {
      let filteredSymbols = this.mergeList(
        this.state.info,
        this.state.cryptoInfo
      );
      let winnerAndLoser = this.findWinner(filteredSymbols);
      let winner = winnerAndLoser[0];
      let loser = winnerAndLoser[1];
      let globalData = this.state.globalData;

      return (
        <div>
          <SearchPage coinList={filteredSymbols} />
          <TestTable
            coinList={filteredSymbols}
            globalData={this.state.globalData}
          />

          <Footer />
        </div>
      );
    }
  }
}
export default Dash;

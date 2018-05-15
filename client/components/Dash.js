//client/components/Dash.js
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import TestTable from './TestTable';

import Coin from './Coin';
import App from './App';
import Particles from 'react-particles-js';
import '../css/loader.css';
import '../css/search.css';

var querystring = require('querystring');

class Dash extends React.Component {
  constructor() {
    super();
    this.state = {
      info: [],
      cryptoInfo: [],
      globalData: []
    }

    this.mergeList = this.mergeList.bind(this);
    this.findWinner = this.findWinner.bind(this);

  }

  componentDidMount() {
    this.getData(this);
  }

  getData(e) {

    axios.post('/coinMarketCap', {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function (response) {

      e.setState({ info: response.data });

    })
    axios.post('/coinMarketCapFull', {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function (response) {

      e.setState({ globalData: response.data });

    })

    axios.post('/cryptoCompare', {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function (response) {


      var coins = response.data.Data;


      /*
      Object.keys(coins).forEach(key => {
        console.log(key); // the name of the current key.
        console.log(coins[key]); // the value of the current key.
      });

      */

      e.setState({ cryptoInfo: coins });

    })

  }
  mergeList(a, b) {
    let aSymbols = [];
    let bSymbols = [];
    let filtered = [];



    Object.keys(b).forEach(key => {

      bSymbols[key] = b[key].ImageUrl;

    })
    let count1 = 0;
    let count2 = 0;
    Object.keys(a).forEach(key => {
      aSymbols.push(a[key].symbol);
      if (a[key].symbol in bSymbols) {
        a[key].ImageUrl = bSymbols[a[key].symbol];
        filtered.push(a[key]);
        count1++

      } else {


        count2++;
      }


    })

    console.log('filtered.size() :', filtered);
    console.log('a :', a);
    console.log('b :', b);
    return filtered;

  }

  findWinner(e) {
    let winner = e[0];
    let loser = e[0];
    let winnerAndLoser = [];
    e.map((currElement, index) => {

      if (parseFloat(currElement.percent_change_1h) > parseFloat(winner.percent_change_1h)) {
        winner = currElement;
      }

      if (parseFloat(currElement.percent_change_1h) < parseFloat(loser.percent_change_1h)) {
        loser = currElement;
      }

    })
    winnerAndLoser.push(winner);
    winnerAndLoser.push(loser);
    return winnerAndLoser;
  }
  render() {
    console.log('DASH this :', this);

    if (this.state.info == '') {

      return (<div id="preloader">
        <div id="loader"></div>
      </div>);
    } else {
      let filteredSymbols = this.mergeList(this.state.info, this.state.cryptoInfo);
      let winnerAndLoser = this.findWinner(filteredSymbols);
      let winner = winnerAndLoser[0];
      let loser = winnerAndLoser[1];
      let globalData = this.state.globalData;

      return (<div>

        <TestTable coinList={filteredSymbols} winner={winner} loser={loser} globalData={this.state.globalData} />

      </div>);

    }

  }
}
export default Dash;

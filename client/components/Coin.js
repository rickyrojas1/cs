//client/components/Delete.js
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import TabsContainer from "./TabsContainer";
import scientificToDecimal from "scientific-to-decimal";
import CoinCard from "./CoinCard";
import Card from "./Card";
import Footer from "./Footer.js";
import { Link } from "react-router-dom";
var numeral = require("numeral");
import TradingViewWidget from "react-tradingview-widget";
import $ from "jquery";
var querystring = require("querystring");
var FontAwesome = require("react-fontawesome");
import "../css/loader.css";
const tradingViewExchanges = [
  "Binance",
  "Bitfinex",
  "bitFlyer",
  "Bithumb",
  "BitMEX",
  "bitso",
  "Bitstamp",
  "BitTrex",
  "BTCYou",
  "BX.in.th",
  "CEX.IO",
  "Coinbase",
  "Coinfloor",
  "FoxBit",
  "Gemini",
  "Gocio",
  "itBit",
  "Korbit",
  "Kraken",
  "Mercado",
  "Okcoin",
  "Poloniex",
  "Wex"
];

class Coin extends React.Component {
  constructor(props) {
    super();
    this.state = {
      info: [],
      exchanges: [],
      coinCompare: [],
      coinMarket: "",
      coinId: "",
      general: "",
      symbol: "defaulted",
      name: ""
    };
    this.getData = this.getData.bind(this);
    this.thisShit = this.thisShit.bind(this);
    this.findExchange = this.findExchange.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  componentDidMount() {
    this.setState({ symbol: this.props.match.params.coinSymbol });
    this.getData(this);
    window.addEventListener("resize", this.updateDimensions);
  }
  updateDimensions() {
    var w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName("body")[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
      height =
        w.innerHeight || documentElement.clientHeight || body.clientHeight;
    this.setState({ width: width, height: height });
  }
  componentWillMount() {
    this.updateDimensions(this);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  getData(e) {
    let sym = this.props.match.params.coinSymbol;
    if (sym == "MIOTA") sym = "IOT";
    axios
      .post("/coinSnap", querystring.stringify({ symbol: sym }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function(response) {
        let allExchanges = response.data.Data.Exchanges;
        let aggregated = response.data.Data.AggregatedData;

        e.setState({ exchanges: allExchanges ? allExchanges : "none" });
        e.setState({ coinCompare: aggregated ? aggregated : "none" });

        if (response.data.Data.CoinInfo) {
          e.thisShit(response.data.Data.CoinInfo.Id, e);
        } else {
          e.setState({ general: "none" });
        }
      });

    axios
      .post("/coinMarketCap", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function(response) {
        let coins = response.data.map(coin => {
          if (e.props.match.params.coinSymbol == coin.symbol) {
            e.setState({ coinMarket: coin });
          }
        });
      });

    axios
      .post("/cryptoCompare", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function(response) {
        let sym = e.props.match.params.coinSymbol;

        if (sym == "MIOTA") sym = "IOT";

        let asset = response.data.Data[sym];

        e.setState({ symbol: sym });
        e.setState({ info: asset });
      });
  }

  thisShit(id, e) {
    var general;
    axios
      .post("/coinSnapFull", querystring.stringify({ id: id }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function(response) {
        let generalInfo = response.data.Data.General;

        e.setState({ general: generalInfo ? generalInfo : "none" });
      });
  }

  findExchange(tradingViewExchanges, coinExchanges) {
    if (tradingViewExchanges == "none" || coinExchanges == "none") {
      return "";
    }
    let commonExchanges = [];
    let bestExchange = "";

    coinExchanges.map(current => {
      if (tradingViewExchanges.includes(current.MARKET)) {
        commonExchanges.push(current.MARKET);
      }
    });

    if (commonExchanges.includes("Binance")) {
      bestExchange = "Binance";
    } else if (commonExchanges.includes("Bitfinex")) {
      bestExchange = "Bitfinex";
    } else if (commonExchanges.includes("BitTrex")) {
      bestExchange = "Bittrex";
    } else if (commonExchanges.includes("Poloniex")) {
      bestExchange = "Poloniex";
    } else {
      bestExchange = commonExchanges[0];
    }

    return bestExchange;
  }

  render() {
    let hourlycolor = "red";
    let weeklycolor = "red";
    let dailycolor = "red";
    let dailyArrow = "arrow-up";
    let hourlyArrow = "arrow-up";
    let weeklyArrow = "arrow-up";

    if (
      this.state.coinCompare &&
      this.state.coinMarket &&
      this.state.info &&
      this.state.general
    ) {
      var el = document.createElement("div");
      el.innerHTML = this.state.general.Description;

      //  descendents = ancestor.getElementsByTagName('*');

      let divChildren = el.childNodes;
      let bio = divChildren;

      var l = []; // Will hold the array of Node's
      for (var i = 0, ll = bio.length; i != ll; l.push(bio[i++]));
      let realBio = l.map(current => {
        return current.innerText;
      });

      let windowWidth = this.state.width;

      let propperExchange = this.findExchange(
        tradingViewExchanges,
        this.state.exchanges
      );

      let sym = this.state.symbol;

      if (sym == "IOT") sym = "IOTA";
      if (sym == "NANO") propperExchange = "Binance";
      if (sym == "MAID") propperExchange = "Poloniex";

      let widgetId = propperExchange + ":" + sym + "BTC";

      if (this.state.symbol == "BTC") {
        widgetId = "Coinbase:" + this.state.symbol + "USD";
      }

      if (this.state.coinMarket.percent_change_1h > 0) {
        hourlycolor = "green";
        hourlyArrow = "arrow-up";
      } else if (this.state.coinMarket.percent_change_1h < 0) {
        hourlycolor = "red";
        hourlyArrow = "arrow-down";
      }

      if (this.state.coinMarket.percent_change_24h > 0) {
        dailycolor = "green";
        dailyArrow = "arrow-up";
      } else if (this.state.coinMarket.percent_change_24h < 0) {
        dailycolor = "red";
        dailyArrow = "arrow-down";
      }
      if (this.state.coinMarket.percent_change_7d > 0) {
        weeklycolor = "green";
        weeklyArrow = "arrow-up";
      } else if (this.state.coinMarket.percent_change_7d < 0) {
        weeklycolor = "red";
        weeklyArrow = "arrow-down";
      }

      return (
        <div>
          <div className="coin-card-container">
            <CoinCard info={this.state.info} coin={this.state.coinMarket} />
          </div>
          <div className={propperExchange ? "hidden" : "nocharts"}>
            <p>No Charts Avaliable</p>
          </div>
          <div className="break1" />
          <div
            className={propperExchange ? "secondrow" : "secondrow-no-charts"}
          >
            <div className="secondrowstats">
              <div className="title">
                <h1>Changes</h1>
              </div>
              <div className="percents left">
                <h3>
                  1h<FontAwesome className={hourlycolor} name={hourlyArrow} />
                </h3>
                <h2 className={hourlycolor}>
                  {this.state.coinMarket.percent_change_1h + "%"}
                </h2>
              </div>
              <div className="percents">
                <h3>
                  24h<FontAwesome className={dailycolor} name={dailyArrow} />
                </h3>
                <h2 className={dailycolor}>
                  {this.state.coinMarket.percent_change_24h + "%"}
                </h2>
              </div>
              <div className="percents">
                <h3>
                  7d
                  <FontAwesome className={weeklycolor} name={weeklyArrow} />
                </h3>
                <h2 className={weeklycolor}>
                  {this.state.coinMarket.percent_change_7d + "%"}
                </h2>
              </div>
              <div className="title">
                <h1>Daily Movement</h1>
              </div>
              <div className="movements">
                <h3>Open</h3>
                <h4>
                  <FontAwesome className="super-crazy-colors" name="btc" />
                  {scientificToDecimal(this.state.coinCompare.OPENDAY)}
                </h4>
              </div>
              <div className="movements">
                <h3>Low Day</h3>
                <h4>
                  <FontAwesome className="super-crazy-colors" name="btc" />
                  {scientificToDecimal(this.state.coinCompare.LOWDAY)}
                </h4>
              </div>
              <div className="movements">
                <h3>High Day</h3>
                <h4>
                  <FontAwesome className="super-crazy-colors" name="btc" />
                  {scientificToDecimal(this.state.coinCompare.HIGHDAY)}
                </h4>
              </div>
            </div>
            {propperExchange ? (
              <div className="tradingview">
                <TradingViewWidget
                  symbol={widgetId}
                  height={windowWidth > 400 ? "600" : "300"}
                  width="100%"
                  theme="dark"
                  hide_side_toolbar="false"
                />
              </div>
            ) : (
              <div />
            )}
          </div>

          <div className="break2" />
          <div className="break3" />
          <TabsContainer
            className="exchangeTable"
            info={this.state.general}
            bio={realBio}
            exchangeList={this.state.exchanges}
            coin={this.state.coinMarket}
            width={windowWidth}
            imageUrl={this.props}
          />
          <Footer />
        </div>
      );
    } else {
      return (
        <div id="preloader">
          <div id="loader" />
        </div>
      );
    }
  }
}
export default Coin;

import React, { Component } from "react";
var numeral = require("numeral");
import "../css/loader.css";
import "../css/coincard.css";
var FontAwesome = require("react-fontawesome");

class CoinCard extends Component {
  constructor(props) {
    super();
    this.state = {
      info: [],
      coin: "",
      symbol: "default",
      name: "default"
    };
  }
  componentDidMount() {
    this.setState({ info: this.props.info });
    this.setState({ coin: this.props.coin });
  }

  render() {
    let imgPath = "https://www.cryptocompare.com" + this.props.info.ImageUrl;

    if (this.props.info.FullName) {
      var marketCap = numeral(this.props.coin.market_cap_usd).format("$0,0");
      var dailyVolume = numeral(this.props.coin["24h_volume_usd"]).format(
        "$0,0"
      );

      var totalSupply = numeral(this.props.coin.total_supply).format("0,0");

      if (parseInt(this.props.coin.price_usd) < 1) {
        var price = numeral(this.props.coin.price_usd).format("$0,0.000000");
      } else {
        var price = numeral(this.props.coin.price_usd).format("$0,0.00");
      }

      var dailycolor;
      if (this.props.coin.percent_change_24h > 0) {
        dailycolor = "green";
      } else if (this.props.coin.percent_change_24h < 0) {
        dailycolor = "red";
      }

      return (
        <div className="coincard1">
          <div className="left-container1">
            <div className="left-flex">
              <div className="logo-container1">
                <img src={imgPath} className="img-responsive" />
              </div>
              <div className="coinName1">
                <h2>
                  <strong>{this.props.info.FullName}</strong>
                </h2>

                <div className="middleLine1">
                  <h3>{price}</h3>
                  <h3 className={dailycolor}>
                    &nbsp; ({this.props.coin.percent_change_24h}%)
                  </h3>
                </div>

                <h5>
                  <FontAwesome className="super-crazy-colors" name="btc" />
                  {this.props.coin.price_btc}
                </h5>
              </div>
            </div>
          </div>
          <div className="panel1">
            <div className="percent1">
              <h3>Rank</h3>

              <p />
              <h4>{this.props.coin.rank}</h4>
            </div>
            <div className="marketCap1">
              <h3>Market Cap</h3>

              <p />
              <h4>{marketCap}</h4>
            </div>
            <div className="dailyVolume1">
              <h3>24H Volume</h3>

              <p />
              <h4>{dailyVolume}</h4>
            </div>
            <div className="percent1">
              <h3>Total Supply</h3>
              <p />
              <h4>{totalSupply}</h4>
            </div>
          </div>
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

export default CoinCard;

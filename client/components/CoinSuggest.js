import React, { Component } from "react";
import { Link } from "react-router-dom";

class CoinSuggest extends Component {
  constructor() {
    super();
  }

  render() {
    let coin = this.props.coin;
    let imgPath = "https://www.cryptocompare.com" + coin.ImageUrl;
    const newTo = {
      pathname: "/coins/" + this.props.coin.symbol,
      imageUrl: this.props.coin.ImageUrl
    };
    return (
      <Link to={newTo} className="link">
        <div className="coin-suggest">
          <div className="img-container">
            <img src={imgPath} className="img-small" />
          </div>
          <h4>&nbsp;{coin.name}</h4>
          <h4 style={{ textDecoration: "none" }}>
            &nbsp;{`  (${coin.symbol})`}
          </h4>
        </div>
      </Link>
    );
  }
}

export default CoinSuggest;

CoinSuggest.defaultProps = {
  coin: ""
};

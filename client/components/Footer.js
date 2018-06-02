import React from "react";
import PropTypes from "prop-types";

const propTypes = {};

const defaultProps = {};

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="footer">
        <div id="footer-logo">
          <img
            src="./img/footerImg.png"
            alt="coinStalker"
            className="footer-logo"
          />
          <p className="copyright">© 2018 CoinStalker</p>
        </div>
        <div id="data-pulled">
          <h4>Data Pulled from:</h4>
          <h6>
            <a href="https://min-api.cryptocompare.com/">CryptoCompare</a>
          </h6>
          <h6>
            <a href="https://coinmarketcap.com/api/">CoinMarketCap</a>
          </h6>
        </div>
        <div id="donations">
          <h4>Donations: </h4>
          <h6>BTC: 3KSZkpLxD91rT4576FfMp2t5XDdYzhqbas</h6>
          <h6>BCH: 1LLAWSoUGGhZZxRdK76oeRb33HJxTYJcpZ</h6>
          <h6>ETH: 0x401b40483D81564F4b882f7f846F0fCa513eCA98</h6>
          <h6>LTC: LehYMJjDU1j95qqEms1PFMf6v7UTindefR</h6>
        </div>
      </div>
    );
  }
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

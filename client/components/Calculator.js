//client/components/Delete.js
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import makeAsyncScriptLoader from "react-async-script";
var numeral = require("numeral");
class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      price: ""
    };

    this.calculate = this.calculate.bind(this);
  }
  componentDidMount() {}

  calculate(value) {
    console.log("value", value);

    let val = this.refs.coinNum.value;
    let answer = parseFloat(val) * parseFloat(this.props.coin.price_usd);
    this.setState({ price: answer });
  }
  render() {
    console.log("this.props :", this.props);
    let backUpImage = "";
    let imgPath = "https://www.cryptocompare.com" + this.props.info.ImageUrl;
    if (this.props.image) {
      backUpImage =
        "https://www.cryptocompare.com" + this.props.image.location.imageUrl;
    }

    let price = this.props.coin.price_usd;

    return (
      <div className="calc-container">
        <div className="card-header1">
          <img
            src={this.props.info.ImageUrl ? imgPath : backUpImage}
            className="img-about"
          />

          <h1>
            {this.props.info.Name}
            &nbsp;Calculator
          </h1>
        </div>

        <div className="calc-body">
          <input
            type="number"
            ref="coinNum"
            defaultValue="0"
            onChange={e => this.calculate(e)}
            name=""
            id=""
          />
          <h1>&nbsp;{this.props.coin.symbol}&nbsp;</h1>
          <br />
          <h1>= &nbsp;{numeral(this.state.price).format("$0,0.00")}</h1>
        </div>
      </div>
    );
  }
}
export default Calculator;

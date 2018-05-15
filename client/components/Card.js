import React, {Component} from "react";

import '../css/Tabs.css';

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  componentDidMount() {}

  render() {
    console.log('card', this.props);
    let imgPath = "https://www.cryptocompare.com" + this.props.info.ImageUrl;
    return (<div className="card-container">
      <div className="card1 ">
        <div className="card-header1">

          <h1>About {this.props.info.Name}</h1>
          <img src={imgPath} className="img-about"/>

        </div>
        <div className="bio">
          {
            this.props.bio.map((current) => {
              return (<p>{current}</p>)
            })
          }
        </div>
        <div className="tech-info">
          <strong>
            <h1>Technical Info</h1>
          </strong>
        </div>
        <div className="card-block1">

          <p>
            <strong>Algorithm:
              <br/>
            </strong>
            {
              this.props.info.Algorithm
                ? this.props.info.Algorithm
                : "N/A"
            }</p>
          <p>
            <strong>Proof Type:
              <br/>
            </strong>
            {
              this.props.info.ProofType
                ? this.props.info.ProofType
                : "N/A"
            }</p>
          <p>
            <strong>Block Number:
              <br/>
            </strong>
            {
              this.props.info.BlockNumber
                ? this.props.info.BlockNumber
                : "N/A"
            }</p>
          <p>
            <strong>Block Reward:
              <br/>
            </strong>{
              this.props.info.BlockReward
                ? this.props.info.BlockReward
                : "N/A"
            }</p>
          <p>
            <strong>DifficultyAdjustment:
              <br/>
            </strong>{
              this.props.info.DifficultyAdjustment
                ? this.props.info.DifficultyAdjustment
                : "N/A"
            }</p>
          <p>
            <strong>Net Hashes Per Second:
              <br/></strong>
            {
              this.props.info.NetHashesPerSecond
                ? this.props.info.NetHashesPerSecond
                : "N/A"
            }</p>
          <p>
            <strong>Start Date:
              <br/></strong>
            {
              this.props.info.StartDate
                ? this.props.info.StartDate
                : "N/A"
            }</p>
          <p>
            <strong>Total Coins Mined:
              <br/></strong>
            {
              this.props.info.TotalCoinsMined
                ? this.props.info.TotalCoinsMined
                : "N/A"
            }</p>
          <p>
            <strong>Total Coin Supply:
              <br/></strong>
            {
              this.props.info.TotalCoinSupply
                ? this.props.info.TotalCoinSupply
                : "N/A"
            }</p>

        </div>

      </div>
    </div>);
  }

}

export default Card;

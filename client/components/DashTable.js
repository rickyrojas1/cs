//client/components/Dash.js
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {Route} from 'react-bootstrap';
var querystring = require('querystring');
var numeral = require('numeral');
import Coin from './Coin';

class Dash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      coinInfo: []
    }

  }

  componentDidMount() {}

  getData(e) {}

  doIt() {

    console.log('did it');
  }

  render() {

    if (this.props.binanceList == '') {

      return (<div>not filled</div>);
    } else {
      return (<div>

        <table className='table table-striped '>
          <thead>
            <tr>

              <th className='desc-col'>Rank</th>
              <th className='desc-col'>Name</th>
              <th className='desc-col'>Symbol</th>
              <th className='desc-col'>Price</th>
              <th className='desc-col'>Market Cap</th>
              <th className='desc-col'>1hr Change</th>
              <th className='desc-col'>24hr Change</th>
              <th className='desc-col'>7Day Change</th>

            </tr>
          </thead>
          <tbody>
            {

              this.props.binanceList.map((exp) => {

                var hourycolor = 'black';
                var dailycolor = 'black';
                var weeklycolor = 'black';
                if (exp.percent_change_1h > 0) {
                  hourycolor = 'green';
                } else if (exp.percent_change_1h < 0) {
                  hourycolor = 'red';
                }

                if (exp.percent_change_24h > 0) {
                  dailycolor = 'green';
                } else if (exp.percent_change_24h < 0) {
                  dailycolor = 'red';
                }
                if (exp.percent_change_7d > 0) {
                  weeklycolor = 'green';
                } else if (exp.percent_change_7d < 0) {
                  weeklycolor = 'red';
                }

                var marketCap = numeral(exp.market_cap_usd).format('$0,0.00');
                var price = numeral(exp.price_usd).format('$0,0.00');
                var symbol = exp.symbol;
                var coinPath = '/coins/' + symbol;

                var newTo = {
                  pathname: coinPath,
                  param1: "Par1"
                };

                return <tr>
                  <td className='desc-col'>{exp.rank}</td>
                  <td className='desc-col'>
                    <Link to={newTo}>{exp.name}</Link>
                  </td>

                  <td className='desc-col'>{symbol}</td>
                  <td className='desc-col'>{price}</td>
                  <td className='desc-col'>{marketCap}</td>
                  <td className={hourycolor}>{exp.percent_change_1h}
                    %</td>
                  <td className={dailycolor}>{exp.percent_change_24h}%</td>
                  <td className={weeklycolor}>{exp.percent_change_7d}%</td>

                </tr>

              })
            }
          </tbody>
        </table>

      </div>);
    }
  }
}
export default Dash;
Dash.defaultProps = {
  binanceList: [],
  coinMarketList: [],
  isGreen: true

};

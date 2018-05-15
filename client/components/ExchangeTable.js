//client/components/Dash.js
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {Route} from 'react-bootstrap';
var querystring = require('querystring');
var numeral = require('numeral');
import Coin from './Coin';

class ExchangeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      coinInfo: []
    }

  }

  componentDidMount() {}

  render() {

    if (this.props.exchangeList == '') {

      return (<div>not filled</div>);
    } else {
      return (<table className='table table-striped '>
        <thead>
          <tr>

            <th className='desc-col'>Exchange Name</th>
            <th className='desc-col'>Price</th>
            <th className='desc-col'>Open 24h</th>
            <th className='desc-col'>Low 24h</th>
            <th className='desc-col'>High 24h
            </th>
            <th className='desc-col'>Volume</th>
            <th className='desc-col'>24hr Change</th>

          </tr>
        </thead>
        <tbody>
          {
            this.props.exchangeList.map((exp) => {
              console.log('this exp');
              console.log(exp);
              return <tr>
                <td className='desc-col'>{exp.MARKET}</td>
                <td className='desc-col'>
                  {exp.PRICE}
                </td>

                <td className='desc-col'>{exp.OPEN24HOUR}</td>
                <td className='desc-col'>{exp.LOW24HOUR}</td>
                <td className='desc-col'>{exp.HIGH24HOUR}</td>
                <td className='desc-col'>{exp.VOLUME24HOUR}</td>
                <td className='desc-col'>{exp.CHANGEPCT24HOUR}%</td>

              </tr>

            })
          }
        </tbody>
      </table>);
    }
  }
}
export default ExchangeTable;
ExchangeTable.defaultProps = {
  exchangeList: [],
  coinMarketList: [],
  isGreen: true

};

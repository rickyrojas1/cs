import React, { Component } from "react";
import ReactTable from 'react-table';
import ParticlePage from './ParticlePage.js';
import 'react-table/react-table.css';
var FontAwesome = require('react-fontawesome');
import { Link } from 'react-router-dom';
var numeral = require('numeral');

class TestTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filterRule: ''
    }

    this.test = this.test.bind(this);


  }

  test(e) {

    let val = this.refs.myValue.value;
    this.setState({ filterRule: val });

  }


  render() {

    let coinList = this.props.coinList;
    let tname = 'Tanner';
    let list = this.props.coinList;
    let filtered = list.filter((val) => {

      if ((val.name.toLowerCase().includes(this.state.filterRule.toLowerCase())) || (val.symbol.toLowerCase().includes(this.state.filterRule.toLowerCase()))) {
        return val;
      }
    })

    const columns = [
      {
        Header: 'Rank',
        accessor: 'rank', // String-based value accessors!
        sortMethod: (a, b) => {
          return parseFloat(a) - parseFloat(b);
        },
        style: {
          textAlign: 'center'
        }
      }, {
        Header: 'Name',
        accessor: 'name', // String-based value accessors!

        Cell: props => {

          let symbol = props.original.symbol;
          let ImageUrl = props.original.ImageUrl;
          let Original = props.original;



          let imgPath = "https://www.cryptocompare.com" + props.original.ImageUrl;

          const newTo = {
            pathname: "/coins/" + symbol,
            imageUrl: ImageUrl,
            original: Original
          };
          return (<div className="tablePic">
            <img src={imgPath} className="img" />
            <Link to={newTo} >
              {props.value}</Link>

          </div>)

        }, // Custom cell components!

        style: {
          textAlign: 'center'
        }
      }, {
        Header: 'Symbol',
        accessor: 'symbol',

        style: {
          textAlign: 'center'
        }
      }, {
        Header: 'Price',
        accessor: 'price_usd', // String-based value accessors!
        sortMethod: (a, b) => {
          return parseFloat(a) - parseFloat(b);
        },
        Cell: props => {


          let price = numeral(props.value).format('$0,0.00');
          return <span>{price}</span>
        },
        style: {
          textAlign: 'center'
        }

      }, {
        Header: 'Market Cap',
        accessor: 'market_cap_usd',
        sortMethod: (a, b) => {

          return parseInt(b) - parseInt(a);
        },
        Cell: props => {
          let cap = numeral(props.value).format('$0,0.00');
          return <span>{cap}</span>
        },
        style: {
          textAlign: 'center'
        }
      }, {
        Header: 'Hourly Change',
        accessor: 'percent_change_1h',
        sortMethod: (a, b) => {
          if (a == null) {
            a = 0;
          }
          if (b == null) {
            b = 0;
          }
          return parseFloat(b) - parseFloat(a);

        },
        Cell: (props) => {

          let color = 'black';
          if (props.value > 0) {
            color = 'green';
          } else if (props.value < 0) {
            color = 'red';
          }

          return <span className={color}>{props.value}%</span>
        },
        style: {
          textAlign: 'center'
        }
      }, {
        Header: 'Daily Change',
        accessor: 'percent_change_24h',
        sortMethod: (a, b) => {
          if (a == null) {
            a = 0;
          }
          if (b == null) {
            b = 0;
          }
          return parseFloat(b) - parseFloat(a);

        },
        Cell: (props) => {

          let color = 'black';
          if (props.value > 0) {
            color = 'green';
          } else if (props.value < 0) {
            color = 'red';
          }

          return <span className={color}>{props.value}%</span>
        },
        style: {
          textAlign: 'center'
        }
      }, {
        Header: 'Weekly Change',
        accessor: 'percent_change_7d',
        sortMethod: (a, b) => {
          if (a == null) {
            a = 0;
          }
          if (b == null) {
            b = 0;
          }
          return parseFloat(b) - parseFloat(a);

        },
        Cell: (props) => {

          let color = 'black';
          if (props.value > 0) {
            color = 'green';
          } else if (props.value < 0) {
            color = 'red';
          }

          return <span className={color}>{props.value}%</span>
        },
        style: {
          textAlign: 'center'
        }
      }

    ]


    if (columns) {

      let totalCap = numeral(this.props.globalData.total_market_cap_usd).format('$0,0');
      let dailyVolume = numeral(this.props.globalData.total_24h_volume_usd).format('$0,0');
      return (<div>




        <div className="searchStats">
          <h5 className="border-right">BTC Dominance:<br />&nbsp;
            <strong>{this.props.globalData.bitcoin_percentage_of_market_cap}%</strong>
          </h5>
          <h5>Total Market Cap:
            <br />&nbsp;<strong>{totalCap}</strong>
          </h5>
          <h5 className="border-right">24Hr Volume:<br />
            &nbsp;<strong>{dailyVolume}</strong>
          </h5>
          <h5>Cryptocurrencies:<br />
            &nbsp;
            <strong>{parseInt(this.props.globalData.active_currencies) + parseInt(this.props.globalData.active_assets)}</strong>
          </h5>
          <div className="searchBox">
            <input type="text" placeholder="Search..." ref="myValue" onInput={(e) => this.test(e)} />
          </div>

        </div>
        <ReactTable data={filtered} className="-striped -highlight" columns={columns} defaultPageSize={50} pageSizeOptions={[25, 50, 100, 200, 500]} />
      </div>);
    } else {
      return (<div id="preloader">
        <div id="loader"></div>
      </div>);
    }
  }
}
export default TestTable;
TestTable.defaultProps = {
  coinList: '',
  winner: '',
  loser: ''
};

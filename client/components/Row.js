//client/components/Row.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
class Row extends React.Component {
  constructor() {
    super();
    this.state = {
      description: '',
      amount: ''
    }
  };

  componentDidMount() {
    console.log('asdas');
  }

  render() {
    return (<div className="row-container">
      <div className="box">
        <h1>header</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, voluptas!</p>
      </div>

      <div className="box">
        <h1>header</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, voluptas!</p>
      </div>

      <div className="box">
        <h1>header</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, voluptas!</p>
      </div>
    </div>)
  }
}

export default Row;

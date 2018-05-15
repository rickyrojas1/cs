//client/components/Delete.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import makeAsyncScriptLoader from "react-async-script";
class Reddit extends React.Component {
  constructor() {
    super();
    this.state = {};

  }
  componentDidMount() {}
  render() {
    const callbackName = "onloadcallback";
    const URL = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit`;

    return (<div>Reddit</div>)
  }
}
export default Reddit;

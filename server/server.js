//server/server.js
var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
const api = require('binance');
const binanceRest = new api.BinanceRest({
  key: 'fGhZ3XnNdhZFKsIM3ONHj8rE8PLjlInYdUHtWo1b7zldx25qj8RauCKaqXrRJTBa', // Get this from your account on binance.com
  secret: '7loB2id1PpotlcBvLLLq4ODpdRS8dvLBJX5nxzbD43mJBB9zhuIoZv1u3msxwqxe', // Same for this
  timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
  recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
  disableBeautification: false,
  /*
     * Optional, default is false. Binance's API returns objects with lots of one letter keys.  By
     * default those keys will be replaced with more descriptive, longer ones.
     */
  handleDrift: false
  /* Optional, default is false.  If turned on, the library will attempt to handle any drift of
     * your clock on it's own.  If a request fails due to drift, it'll attempt a fix by requesting
     * binance's server time, calculating the difference with your own clock, and then reattempting
     * the request.
     */
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

mongoose.connect('mongodb://admin:admin@ds217349.mlab.com:17349/expenses', {
  auth: {
    user: 'admin',
    password: 'admin'
  }
}).then(() => console.log('connection successful')).catch((err) => console.error('vag' + err));
app.use('/', router);
module.exports = app;

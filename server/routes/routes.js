//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var isomorphic_fetch = require('isomorphic-fetch');
var Expense = require('../../models/Expense');
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

router.get('/', function(req, res) {
  res.render('index')
});

router.route('/insert').post(function(req, res) {
  var expense = new Expense();

  expense.description = req.body.desc;
  expense.amount = req.body.amount;
  expense.month = req.body.month;
  expense.year = req.body.year;
  expense.save(function(err) {
    if (err) 
      res.send(err);
    res.send(expense);

  });
})

router.route('/binance').post(function(req, res) {

  console.log('this is pairing ' + req.body.pairing);
  binanceRest.trades({
    symbol: req.body.pairing // Object is transformed into a query string, timestamp is automatically added
  }).then((data) => {
    res.send(data);
  }).catch((err) => {
    console.error('bi' + err);
  });

})

router.route('/tickerPrice').post(function(req, res) {

  binanceRest.tickerPrice().then((data) => {
    res.send(data);
  }).catch((err) => {
    console.error('tic' + err);
  });

})

router.route('/coinMarketCap').post(function(req, res) {
  console.log('I was called');
  fetch('https://api.coinmarketcap.com/v1/ticker/?start=0&limit=10000').then(response => response.json()).then((data) => res.send(data));

})

router.route('/coinMarketCapFull').post(function(req, res) {
  console.log('I was called');
  fetch('https://api.coinmarketcap.com/v1/global/').then(response => response.json()).then((data) => res.send(data));

})

router.route('/cryptoCompare').post(function(req, res) {
  console.log('CryptoCompare Called');
  fetch('https://min-api.cryptocompare.com/data/all/coinlist').then(response => response.json()).then((data) => res.send(data));

})

router.route('/coinSnap').post(function(req, res) {

  let symbol = req.body.symbol;
  let coinPath = 'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=' + symbol + '&tsym=BTC';
  if (symbol == "BTC") {
    coinPath = 'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=' + symbol + '&tsym=USDT';
  }

  fetch(coinPath).then(response => response.json()).then((data) => {

    res.send(data);
  });

})

router.route('/coinSnapFull').post(function(req, res) {

  let coinId = req.body.id;

  let coinPath = 'https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=' + coinId;

  fetch(coinPath).then(response => response.json()).then((data) => {

    res.send(data);
  });

})

router.route('/socialSnap').post(function(req, res) {

  let coinId = req.body.id;
  console.log('coinid');
  console.log(coinId);
  let coinPath = 'https://www.cryptocompare.com/api/data/socialstats/?id=' + coinId;

  fetch(coinPath).then(response => response.json()).then((data) => {
    console.log('sdfsdfvhsbdjvdfhjvbkdfjvbsdfjvdbjkhk');
    console.log(data);
    res.send(data);
  });

})
router.route('/update').post(function(req, res) {
  const doc = {
    description: req.body.description,
    amount: req.body.amount,
    month: req.body.month,
    year: req.body.year
  };
  console.log('doc' + doc);
  Expense.update({
    _id: req.body._id
  }, doc, function(err, result) {
    if (err) 
      res.send(err);
    res.send('Expense successfully updated!');
  });
});
router.get('/delete', function(req, res) {
  var id = req.query.id;
  Expense.find({_id: id}).remove().exec(function(err, expense) {
    if (err) 
      res.send(err)
    res.send('Expense successfully deleted!');
  })
});
router.get('/getAll', function(req, res) {
  var monthRec = req.query.month;
  var yearRec = req.query.year;
  if (monthRec && monthRec != 'All') {
    Expense.find({
      $and: [
        {
          month: monthRec
        }, {
          year: yearRec
        }
      ]
    }, function(err, expenses) {
      if (err) 
        res.send(err);
      res.json(expenses);
    });
  } else {
    Expense.find({
      year: yearRec
    }, function(err, expenses) {
      if (err) 
        res.send(err);
      res.json(expenses);
    });
  }
});
module.exports = router;

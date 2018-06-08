//server/routes/routes.js
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var path = require("path");
var isomorphic_fetch = require("isomorphic-fetch");
var Expense = require("../../models/Expense");

router.get("/", function(req, res) {
  res.render("index");
});

router.route("/insert").post(function(req, res) {
  var expense = new Expense();

  expense.description = req.body.desc;
  expense.amount = req.body.amount;
  expense.month = req.body.month;
  expense.year = req.body.year;
  expense.save(function(err) {
    if (err) res.send(err);
    res.send(expense);
  });
});

router.get("/*", function(req, res) {
  res.render(path.join(__dirname, "../clientz/index.ejs"), function(err) {});
});

router.route("/binance").post(function(req, res) {
  binanceRest
    .trades({
      symbol: req.body.pairing // Object is transformed into a query string, timestamp is automatically added
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error("ERROR:" + err);
    });
});

router.route("/tickerPrice").post(function(req, res) {
  binanceRest
    .tickerPrice()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error("ERROR: " + err);
    });
});

router.route("/coinMarketCap").post(function(req, res) {
  fetch("https://api.coinmarketcap.com/v1/ticker/?start=0&limit=10000")
    .then(response => response.json())
    .then(data => res.send(data));
});

router.route("/coinMarketCapFull").post(function(req, res) {
  fetch("https://api.coinmarketcap.com/v1/global/")
    .then(response => response.json())
    .then(data => res.send(data));
});

router.route("/cryptoCompare").post(function(req, res) {
  fetch("https://min-api.cryptocompare.com/data/all/coinlist")
    .then(response => response.json())
    .then(data => res.send(data));
});
router.route("/cryptoNews").post(function(req, res) {
  fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN")
    .then(response => response.json())
    .then(data => res.send(data));
});

router.route("/coinSnap").post(function(req, res) {
  let symbol = req.body.symbol;
  let coinPath =
    "https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=" +
    symbol +
    "&tsym=BTC";
  if (symbol == "BTC") {
    coinPath =
      "https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=" +
      symbol +
      "&tsym=USDT";
  }

  fetch(coinPath)
    .then(response => response.json())
    .then(data => {
      res.send(data);
    });
});

router.route("/coinSnapFull").post(function(req, res) {
  let coinId = req.body.id;

  let coinPath =
    "https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=" + coinId;

  fetch(coinPath)
    .then(response => response.json())
    .then(data => {
      res.send(data);
    });
});

router.route("/socialSnap").post(function(req, res) {
  let coinId = req.body.id;

  let coinPath =
    "https://www.cryptocompare.com/api/data/socialstats/?id=" + coinId;

  fetch(coinPath)
    .then(response => response.json())
    .then(data => {
      res.send(data);
    });
});
router.route("/update").post(function(req, res) {
  const doc = {
    description: req.body.description,
    amount: req.body.amount,
    month: req.body.month,
    year: req.body.year
  };

  Expense.update(
    {
      _id: req.body._id
    },
    doc,
    function(err, result) {
      if (err) res.send(err);
      res.send("Expense successfully updated!");
    }
  );
});
router.get("/delete", function(req, res) {
  var id = req.query.id;
  Expense.find({ _id: id })
    .remove()
    .exec(function(err, expense) {
      if (err) res.send(err);
      res.send("Expense successfully deleted!");
    });
});
router.get("/getAll", function(req, res) {
  var monthRec = req.query.month;
  var yearRec = req.query.year;
  if (monthRec && monthRec != "All") {
    Expense.find(
      {
        $and: [
          {
            month: monthRec
          },
          {
            year: yearRec
          }
        ]
      },
      function(err, expenses) {
        if (err) res.send(err);
        res.json(expenses);
      }
    );
  } else {
    Expense.find(
      {
        year: yearRec
      },
      function(err, expenses) {
        if (err) res.send(err);
        res.json(expenses);
      }
    );
  }
});
module.exports = router;

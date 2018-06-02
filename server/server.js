//server/server.js
var express = require("express");
var router = require("./routes/routes.js");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");

const csp = require("express-csp-header");
app.use(
  csp({
    policies: {
      "default-src": [csp.SELF, "data:"],
      "script-src": [
        csp.SELF,
        csp.INLINE,
        csp.EVAL,
        "https://platform.twitter.com",
        "https://s3.tradingview.com/",
        "https://cdn.syndication.twimg.com",
        "https://syndication.twitter.com"
      ],
      "style-src": [
        csp.SELF,
        csp.INLINE,
        "https://maxcdn.bootstrapcdn.com",
        "https://platform.twitter.com",
        "https://ton.twimg.com"
      ],
      "img-src": [
        "data:",
        "https://www.cryptocompare.com",
        "http://localhost:8000",
        "https://syndication.twitter.com",
        "https://pbs.twimg.com",
        "https://platform.twitter.com",
        "https://ton.twimg.com",
        "https://abs.twimg.com"
      ],
      "font-src": [
        "data:",
        "*/fonts/",
        "https://maxcdn.bootstrapcdn.com",
        csp.SELF
      ],
      "frame-src": [
        csp.SELF,
        "https://platform.twitter.com/",
        "https://syndication.twitter.com/",
        "https://s.tradingview.com/"
      ],
      "worker-src": [csp.NONE],
      "block-all-mixed-content": true
    }
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client"));
app.use(express.static(path.join(__dirname, "../client")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

app.use("/", router);

module.exports = app;

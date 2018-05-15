import React, {Component} from "react";

class TradingView extends Component {
  render() {

    return (<div className="chart">

      <div class="tradingview-widget-container">
        <div id="tradingview_9b951"></div>
        <div class="tradingview-widget-copyright">
          <a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank">
            <span class="blue-text">AAPL</span>
            <span class="blue-text">chart</span>
            by TradingView</a>
        </div>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        <script type="text/javascript">
          new TradingView.widget({
            "width": 980,
            "height": 610,
            "symbol": "NASDAQ:AAPL",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "Light",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "hideideas": true,
            "container_id": "tradingview_9b951"
          });
        </script>
      </div>

    </div>);
  }
}

export default TradingView;

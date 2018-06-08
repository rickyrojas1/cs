//client/components/App.js
import React from "react";
import axios from "axios";
import Dash from "./Dash";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Coin from "./Coin";
import Card from "./Card";
import Calculator from "./Calculator";
import SocialDash from "./SocialDash";
import ExchangeTable from "./ExchangeTable";
var querystring = require("querystring");
import "../css/Tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

class TabsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      info: "",
      social: []
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this);
  }

  getData(e) {
    axios
      .post("/socialSnap", querystring.stringify({ id: e.props.info.Id }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function(response) {
        e.setState({ social: response });
      });
  }

  render() {
    if (this.props.info && this.state.social) {
      let res = this.props.info;

      if (res == "none") {
        return (
          <div>
            <div>
              <Tabs className="tabs">
                <TabList className="tab-list">
                  <Tab className="tab">Calculator</Tab>
                </TabList>

                <TabPanel>
                  <Calculator
                    info={this.props.info}
                    bio={this.props.bio}
                    coin={this.props.coin}
                    image={this.props.imageUrl}
                  />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <Tabs className="tabs">
              <TabList className="tab-list">
                <Tab className="tab">About</Tab>
                <Tab className="tab">Social</Tab>
                <Tab className="tab">Calculator</Tab>
                <Tab className="tab">Exchanges</Tab>
              </TabList>

              <TabPanel>
                <Card info={this.props.info} bio={this.props.bio} />
              </TabPanel>
              <TabPanel>
                <div>
                  <SocialDash
                    pic={this.props.info.ImageUrl}
                    info={this.state.social}
                    websiteUrl={this.props.info.WebsiteUrl}
                    width={this.props.width}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <Calculator
                  image={this.props.ImageUrl}
                  info={this.props.info}
                  bio={this.props.bio}
                  coin={this.props.coin}
                />
              </TabPanel>
              <TabPanel>
                <ExchangeTable
                  className="exchangeContainer"
                  exchangeList={this.props.exchangeList}
                  width={this.props.width}
                />
              </TabPanel>
            </Tabs>
          </div>
        );
      }
    } else {
      return <div>no filled</div>;
    }
  }
}
export default TabsContainer;
TabsContainer.defaultProps = {
  exchangeList: [],
  info: "",
  width: "",
  bio: []
};

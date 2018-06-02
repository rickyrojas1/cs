//client/components/App.js
import React from "react";
import axios from "axios";
import Dash from "./Dash";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Coin from "./Coin";
import Card from "./Card";
import ResponsiveEmbed from "react-responsive-embed";
import ExchangeTable from "./ExchangeTable";
import "../css/Tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Timeline } from "react-twitter-widgets";
import "../css/loader.css";

class SocialDash extends React.Component {
  constructor() {
    super();
    this.state = {
      info: "",
      twitterId: ""
    };
  }

  componentDidMount() {
    let twitter = this.props.info.data.Data.Twitter.link;
    let github = this.props.info.data.Data.CodeRepository.List;
    let reddit = this.props.info.data.Data.Reddit.link;
    let facebook = this.props.info.data.Data.Facebook.link;
    console.log("redfb", reddit, facebook, github);
    console.log("twitter", twitter);

    github
      ? this.setState({ github: github })
      : this.setState({ github: "none" });

    facebook
      ? this.setState({ facebook: facebook })
      : this.setState({ facebook: "none" });

    reddit
      ? this.setState({ reddit: reddit })
      : this.setState({ reddit: "none" });

    if (twitter) {
      var res = twitter.split("https://twitter.com/");
      this.setState({ twitterId: res[1] });
      this.setState({ twitter: twitter });
    } else {
      this.setState({ twitterId: "none" });
      this.setState({ twitter: "none" });
    }
  }
  onLoad() {
    console.log("script loaded");
  }
  render() {
    console.log("this.props.info: social");
    console.log(this.props.info);

    console.log("this.props.general: social");
    console.log(this.props.general);
    let imgPath = "https://www.cryptocompare.com" + this.props.pic;
    let twitterName = this.state.twitterId;
    console.log("twitterSHIIIII");
    console.log(twitterName);
    console.log("isQual", twitterName === "");
    console.log("this.state.twitt", this.state.twitterId);
    if (this.state.twitterId) {
      return (
        <div className="social-container">
          <div className="social-grid">
            <div className="title sm">
              <img src={imgPath} className="img-social" />
              <h1>Social Media</h1>
              <a
                href={this.props.websiteUrl}
                className="site-link"
                target="_blank"
              >
                Website
              </a>
              <div className="icons">
                {console.log(this.state.reddit)}
                {this.state.github[0] ? (
                  <a target="_blank" href={this.state.github[0].url}>
                    <img src="../img/git.png" className="icon" />
                  </a>
                ) : (
                  ""
                )}
                {this.state.facebook != "none" ? (
                  <a target="_blank" href={this.state.facebook}>
                    <img src="../img/fb.png" className="icon" />
                  </a>
                ) : (
                  ""
                )}
                {this.state.reddit != "none" ? (
                  <a target="_blank" href={this.state.reddit}>
                    <img src="../img/reddit.png" className="icon" />
                  </a>
                ) : (
                  ""
                )}
                {this.state.twitter != "none" ? (
                  <a target="_blank" href={this.state.twitter}>
                    <img src="../img/twitter.png" className="icon" />
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="twitterbox">
            <Timeline
              dataSource={{
                sourceType: "profile",
                screenName: twitterName
              }}
              options={{
                username: twitterName,
                height: "550"
              }}
              onLoad={() => console.log("Timeline is loaded!")}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div id="preloader">
          <div id="loader" />
        </div>
      );
    }
  }
}
export default SocialDash;

SocialDash.defaultProps = {
  info: "",
  websiteUrl: "#",
  pic: ""
};

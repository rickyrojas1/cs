import axios from "axios";
import React from "react";
import NewsCard from "./NewsCard";
import PropTypes from "prop-types";

const propTypes = {};

const defaultProps = {
  news: ""
};

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getData(this);
  }
  getData(e) {
    axios
      .post("/cryptoNews", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function(response) {
        e.setState({ news: response.data });
      });
  }

  render() {
    console.log("this.news", this.props.news);
    let news = this.props.news.Data;

    let Background = "";
    var sectionStyle = {};
    if (news) {
    }
    if (this.state.news) {
      console.log("this :", this);
      console.log("news :", this.state.news);
      let articleList = this.state.news.Data;
      Background = articleList[0].imageurl;
      console.log("articleList :", articleList);
      console.log("Background :", Background);

      return (
        <div className="outter-news-container">
          <div className="news-header" style={{ height: 220, width: 1000 }}>
            <h1>TODAY IN CRYPTO</h1>
          </div>
          <div className="news-container">
            {articleList.map(v => {
              return <NewsCard article={v} />;
            })}
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

News.propTypes = propTypes;
News.defaultProps = defaultProps;

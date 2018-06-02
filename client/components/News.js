import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {
    news: ''
};

export default class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log("this.news", this.props.news);
        let news = this.props.news.Data;
        console.log('news :', news);
        let Background = "";
        var sectionStyle = {};
        if (news) {
            Background = news[0].imageurl;
        }


        return (
            <div className="news-container">
                <div className="box1" style={{ backgroundImage: `url(${Background})` }}></div>
                <div className="box2"><img src={Background}></img></div>
                <div className="box3"></div>
                <div className="box4"></div>
                <div className="box5"></div>
                <div className="box6"></div>

            </div>
        );
    }
}

News.propTypes = propTypes;
News.defaultProps = defaultProps;
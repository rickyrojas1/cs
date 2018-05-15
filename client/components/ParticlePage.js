import Particles from 'react-particles-js';
var numeral = require('numeral');
import React from 'react';
import PropTypes from 'prop-types';
var FontAwesome = require('react-fontawesome');
import { Link } from 'react-router-dom';

const propTypes = {};

const defaultProps = {};

export default class ParticlePage extends React.Component {
    render() {
        console.log('this.props.winner :', this.props.winner);
        if (this.props.winner) {
            console.log(this.props.winner.price_usd);


            let winnerPath = "https://www.cryptocompare.com" + this.props.winner.ImageUrl;
            let loserPath = "https://www.cryptocompare.com" + this.props.loser.ImageUrl;
            let winnerPrice = numeral(this.props.winner.price_usd).format('$0,0.00');
            let loserPrice = numeral(this.props.loser.price_usd).format('$0,0.00');
            let totalCap = numeral(this.props.globalData.total_market_cap_usd).format('$0,0');
            let dailyVolume = numeral(this.props.globalData.total_24h_volume_usd).format('$0,0');


            return (
                <div className="mainPageStats">
                    <Particles className="particles" params={{
                        "particles": {
                            "number": {
                                "value": 14,
                                "density": {
                                    "enable": true,
                                    "value_area": 800
                                }
                            },
                            "color": {
                                "value": "#000000"
                            },
                            "shape": {
                                "type": "circle",
                                "stroke": {
                                    "width": 0,
                                    "color": "#ffffff"
                                },
                                "polygon": {
                                    "nb_sides": 5
                                },
                                "image": {
                                    "src": "http://pngriver.com/wp-content/uploads/2017/12/download-Bitcoin-symbol-PNG-transparent-images-transparent-backgrounds-PNGRIVER-COM-bitcoin-225078_960_720.png?x61933",
                                    "width": 100,
                                    "height": 100
                                }
                            },
                            "opacity": {
                                "value": 0.5,
                                "random": false,
                                "anim": {
                                    "enable": false,
                                    "speed": 1,
                                    "opacity_min": 0.1,
                                    "sync": false
                                }
                            },
                            "size": {
                                "value": 3,
                                "random": true,
                                "anim": {
                                    "enable": false,
                                    "speed": 40,
                                    "size_min": 0.1,
                                    "sync": false
                                }
                            },
                            "line_linked": {
                                "enable": true,
                                "distance": 150,
                                "color": "#0e76bc",
                                "opacity": 0.6814501258678471,
                                "width": 1
                            },
                            "move": {
                                "enable": true,
                                "speed": 6,
                                "direction": "none",
                                "random": true,
                                "straight": false,
                                "out_mode": "out",
                                "bounce": false,
                                "attract": {
                                    "enable": false,
                                    "rotateX": 600,
                                    "rotateY": 1200
                                }
                            }
                        },
                        "interactivity": {
                            "detect_on": "canvas",
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "grab"
                                },
                                "onclick": {
                                    "enable": true,
                                    "mode": "push"
                                },
                                "resize": true
                            },
                            "modes": {
                                "grab": {
                                    "distance": 400,
                                    "line_linked": {
                                        "opacity": 1
                                    }
                                },
                                "bubble": {
                                    "distance": 400,
                                    "size": 40,
                                    "duration": 2,
                                    "opacity": 8,
                                    "speed": 3
                                },
                                "repulse": {
                                    "distance": 200,
                                    "duration": 0.4
                                },
                                "push": {
                                    "particles_nb": 4
                                },
                                "remove": {
                                    "particles_nb": 2
                                }
                            }
                        },
                        "retina_detect": true
                    }} />
                    <div className="gainer-loser-container">

                        <div className="gainer">
                            <h1 className="winner-heading">Daily Winner</h1>
                            <h2>{this.props.winner.name}</h2>
                            <div className="line">
                                <h3 className="price">({winnerPrice})</h3>
                                <h3 className="green">{this.props.winner.percent_change_1h}%
                  <FontAwesome className="green" name="arrow-up" size='lg' /></h3>
                            </div>
                            <img src={winnerPath} className="img-responsive" />

                            <Link className="coinButton" to={'/coins/' + this.props.winner.symbol}>View Coin</Link>

                        </div>
                        <div className="loser">
                            <h1 className="winner-heading">Daily Loser</h1>
                            <h2>{this.props.loser.name}</h2>
                            <div className="line">
                                <h3 className="price">({loserPrice})</h3>
                                <h3 className="red">{this.props.loser.percent_change_1h}%
                  <FontAwesome className="red" name="arrow-down" size='lg' /></h3>
                            </div>
                            <img src={loserPath} className="img-responsive" />

                            <Link className="coinButton" to={'/coins/' + this.props.loser.symbol}>View Coin</Link>

                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div id="preloader">
                <div id="loader"></div>
            </div>)
        }
    }
}

ParticlePage.propTypes = propTypes;
ParticlePage.defaultProps = defaultProps;


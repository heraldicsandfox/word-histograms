import React, { Component } from 'react';
import './Preprocessing.css';

import Stemmer from './Stemmer.js';
import Stopwords from './Stopwords.js';
import Smoothing from './Smoothing.js';

class Preprocessing extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-xs-4">
                    <Stopwords
                        stoplist={this.props.stoplist}
                        modifyStoplist={this.props.modifyStoplist}
                        active={this.props.active}
                    />
                </div>
                <div className="col-xs-4">
                    <Smoothing
                        modifySmoothing={this.props.modifySmoothing}
                        active={this.props.active}
                    />
                </div>
                <div className="col-xs-4">
                    <Stemmer
                        stemmer={this.props.stemmer}
                        modifyStemmer={this.props.modifyStemmer}
                        active={this.props.active}
                    />
                </div>
            </div>
        )
    }

}

export default Preprocessing;
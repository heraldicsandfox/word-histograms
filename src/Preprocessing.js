import React, { Component } from 'react';
import './Preprocessing.css';

import Stemmer from './Stemmer.js';
import Stopwords from './Stopwords.js';

class Preprocessing extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-xs-6">
                    <Stopwords
                        stoplist={this.props.stoplist}
                        modifyStoplist={this.props.modifyStoplist}
                    />
                </div>
                <div className="col-xs-6">
                    <Stemmer
                        stemmer={this.props.stemmer}
                        modifyStemmer={this.props.modifyStemmer}
                    />
                </div>
            </div>
        )
    }

}

export default Preprocessing;
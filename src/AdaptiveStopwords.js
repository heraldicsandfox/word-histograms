import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class AdaptiveStopwords extends Component {

    renderUnstoppedButtonList() {
        function addStopword(word) {
            return function () {
                this.props.addStopword(word);
            };
        }

        return this.props.wordData.map(function (datum) {
            if (!this.props.stopwords.has(datum.word)) {    
                return (
                    <Button
                        bsSize="xsmall"
                        bsStyle="success"
                        onClick={addStopword(datum.word).bind(this)}
                    >
                        {datum.word}
                    </Button>
                );
            }
        }.bind(this));  
    }

    renderStoppedButtonList() {
        function removeStopword(word) {
            return function () {
                this.props.removeStopword(word);
            };
        }

        return this.props.wordData.map(function (datum) {
            if (this.props.stopwords.has(datum.word)) {    
                return (
                    <Button
                        bsSize="xsmall"
                        bsStyle="success"
                        onClick={removeStopword(datum.word).bind(this)}
                    >
                        {datum.word}
                    </Button>
                );
            }
        }.bind(this));
    }

    render() {
        this.renderStoppedButtonList = this.renderStoppedButtonList.bind(this);
        this.renderUnstoppedButtonList = this.renderUnstoppedButtonList.bind(this);
        
        return (
            <div>
                <h3>Current Vocabulary</h3>
                {this.renderUnstoppedButtonList()}
                <br/>
                <h3>Ignored Words</h3>
                {this.renderStoppedButtonList()}
            </div>
        );
    }

}

export default AdaptiveStopwords;
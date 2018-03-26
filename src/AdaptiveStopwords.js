import React, { Component } from 'react';
import './App.css';
import { Label } from 'react-bootstrap';

class AdaptiveStopwords extends Component {

    renderUnstoppedButtonList() {
        function addStopword(word) {
            return function () {
                this.props.addStopword(word);
            };
        }

        return this.props.wordData.map(function (datum) {
            if (!this.props.stoplist.has(datum.word)) {    
                return (
                    <span>
                        <Label
                            bsSize="xsmall"
                            bsStyle="success"
                            key={datum.word + '-unstopped'}
                            onClick={addStopword(datum.word).bind(this)}
                        >
                            {datum.word}: {datum.count}
                        </Label>{' '}
                    </span>
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
        var stoplist = Array.from(this.props.stoplist);

        return stoplist.map(function (word) {    
            return (
                <span>
                    <Label
                        bsSize="xsmall"
                        bsStyle="danger"
                        key={word + '-stopped'}
                        onClick={removeStopword(word).bind(this)}
                    >
                        {word}
                    </Label>{" "}
                </span>
            );
        }.bind(this));
    }

    render() {
        this.renderStoppedButtonList = this.renderStoppedButtonList.bind(this);
        this.renderUnstoppedButtonList = this.renderUnstoppedButtonList.bind(this);

        return (
            <div>
                <h3>Current Vocabulary</h3>
                <div className="scrollable">
                    {this.renderUnstoppedButtonList()}
                </div>
                <br/>
                <h3>Ignored Words</h3>
                <div className="scrollable">
                    {this.renderStoppedButtonList()}
                </div>
            </div>
        );
    }

}

export default AdaptiveStopwords;
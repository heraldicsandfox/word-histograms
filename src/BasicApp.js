import React, { Component } from 'react';
import './App.css';
import { Jumbotron, Panel } from 'react-bootstrap';
import Tokenizer from 'tokenize-text';

import AdaptiveStopwords from './AdaptiveStopwords.js';
import TextBox from './TextBox.js';
import WordCounterChart from './WordCounterChart.js';
import { computeWordData } from './Utils';

class BasicApp extends Component {

    constructor(props) {
        super(props);
        this.tokenizer = new Tokenizer();
        this.addStopword = this.addStopword.bind(this);
        this.removeStopword = this.removeStopword.bind(this);
        this.processText = this.processText.bind(this);

        this.state = {
            stoplist: new Set(),
            rawText: '',
            wordData: []
        };
    }

    addStopword(word) {
        var stoplist = this.state.stoplist;
        stoplist.add(word);
        var wordData = computeWordData(this.state.rawText, stoplist, this.tokenizer);
        this.setState({ stoplist: stoplist, wordData: wordData });
    }


    removeStopword(word) {
        var stoplist = this.state.stoplist;
        stoplist.delete(word);
        var wordData = computeWordData(this.state.rawText, stoplist, this.tokenizer);
        this.setState({ stoplist: stoplist, wordData: wordData });

    }

    processText(rawText) {
        rawText = rawText.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
        var wordData = computeWordData(rawText, this.state.stoplist, this.tokenizer);
        this.setState({ rawText: rawText, wordData: wordData });
    }

    render() {
        var color = "#fdb462";
        return (
        <div className="App">
            <Jumbotron>
            <h1>Word Histograms for Grounded Codes</h1>
            <p className="lead">Input text into the box below to view word frequency information for your text.</p>
            </Jumbotron>
            <Panel><Panel.Body>
            <div className="col-xs-12 col-sm-6">
                <TextBox
                    processText={this.processText}
                    rawText={this.state.rawText}
                />
            </div>
            <div className="col-xs-12 col-sm-6">
                <AdaptiveStopwords
                    addStopword={this.addStopword}
                    removeStopword={this.removeStopword}
                    wordData={this.state.wordData}
                    stoplist={this.state.stoplist}
                />
            </div>
            </Panel.Body></Panel>
            <Panel><Panel.Body>
                <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                    <WordCounterChart
                        color={color}
                        wordData={this.state.wordData}
                    />
                </div>
            </Panel.Body></Panel>
        </div>
        );
    }
}

export default BasicApp;

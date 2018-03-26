import React, { Component } from 'react';
import './App.css';
import { Jumbotron, Panel } from 'react-bootstrap';
import Tokenizer from 'tokenize-text';

import AdaptiveStopwords from './AdaptiveStopwords.js';
import TextBox from './TextBox.js';
import WordCounterChart from './WordCounterChart.js';

class BasicApp extends Component {

    constructor(props) {
        super(props);
        this.tokenizer = new Tokenizer();
        this.addStopword = this.addStopword.bind(this);
        this.removeStopword = this.removeStopword.bind(this);
        this.processText = this.processText.bind(this);
        this.computeWordData = this.computeWordData.bind(this);
        this.state = {
            stoplist: new Set(),
            rawText: '',
            wordData: []
        };
    }

    addStopword(word) {
        var stoplist = this.state.stoplist;
        stoplist.add(word);
        var wordData = this.computeWordData(this.state.rawText, stoplist)
        this.setState({ stoplist: stoplist, wordData: wordData });
    }


    removeStopword(word) {
        var stoplist = this.state.stoplist;
        stoplist.delete(word);
        var wordData = this.computeWordData(this.state.rawText, stoplist)
        this.setState({ stoplist: stoplist, wordData: wordData });

    }

    processText(rawText) {
        var wordData = this.computeWordData(rawText, this.state.stoplist);
        this.setState({ rawText: rawText, wordData: wordData });
    }

    computeWordData(rawText, stoplist) {
        // Data structures to count instances of each token
        var vocabCounts = {};
        var tokenList = this.tokenizer.words()(rawText);
        
        // Count tokens
        tokenList.forEach(function (rawToken) {
            var token = rawToken.value;
            if (!(stoplist.has(token))) {
                if (vocabCounts.hasOwnProperty(token)) {
                    vocabCounts[token]++;
                } else {
                    vocabCounts[token] = 1;
                }
            }
        });

        // Turn the count dictionary into a sorted list of entities by decreasing count
        var wordData = []
        for (var type in vocabCounts) {
            wordData.push({ 'word': type, 'count': vocabCounts[type] });
        }
        wordData.sort(function(d1, d2) {
            return d2.count - d1.count;
        });
        for (var i = 0; i < wordData.length; ++i) {
            wordData[i]['idx'] = i;
        }

        // Set the word data
        return wordData; 
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
            <WordCounterChart
                color={color}
                wordData={this.state.wordData}
            />
        </Panel.Body></Panel>
      </div>
    );
  }
}

export default BasicApp;

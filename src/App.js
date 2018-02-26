import React, { Component } from 'react';
import './App.css';
import { Jumbotron, Panel } from 'react-bootstrap';
import { en } from 'stopword';

import Preprocessing from './Preprocessing.js';
import TextProcessor from './TextProcessor.js';
import WordComparer from './WordComparer.js';
import WordCounter from './WordCounter.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.modifyStemmer = this.modifyStemmer.bind(this);
    this.modifyStoplist = this.modifyStoplist.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleFirstData = this.handleFirstData.bind(this);
    this.handleSecondData = this.handleSecondData.bind(this);
    this.state = {
      data1: [],
      data2: [],
      codeDict: new Map(),
      stoplist: en,
      stemmer: "none"
    };
  }

  modifyStoplist(newList) {
    this.setState({ stoplist: newList });
  }

  modifyStemmer(newStemmer) {
    if (newStemmer !== this.state.stemmer) {
      this.setState({ stemmer: newStemmer });
    }
  }

  handleText(codeDict) {
    this.setState({
      codeDict: codeDict
    });
  }

  handleFirstData(dataSet, code) {
    this.setState({
      data1: dataSet,
      code1: code
    });
  }

  handleSecondData(dataSet, code) {
    this.setState({
      data2: dataSet,
      code2: code
    });
  }

  render() {
    var color1 = "#fdb462";
    var color2 = "#b3de69";
    return (
      <div className="App">
        <Jumbotron>
          <h1>Word Histograms for Grounded Codes</h1>
          <p className="lead">Input text into the boxes below to view and compare word frequencies between two collections of passages.</p>
          <Preprocessing
            stoplist={this.state.stoplist}
            modifyStoplist={this.modifyStoplist}
            stemmer={this.state.stemmer}
            modifyStemmer={this.modifyStemmer}
          />
        </Jumbotron>
        <Panel><Panel.Body>
          <div className="col-xs-12 col-sm-6 col-sm-offset-3">
            <TextProcessor handleText={this.handleText} />
          </div>
        </Panel.Body></Panel>
        <Panel><Panel.Body>
          <WordCounter 
            sectionName={"Text with Code A"}
            useCaps={false}
            stoplist={this.state.stoplist}
            stemmer={this.state.stemmer}
            handleData={this.handleFirstData}
            color={color1}
            codeDict={this.state.codeDict}
          />
          <WordCounter 
            sectionName={"Text with Code B"}
            useCaps={false}
            stoplist={this.state.stoplist}
            stemmer={this.state.stemmer}
            handleData={this.handleSecondData}
            color={color2}
            codeDict={this.state.codeDict}
          />
        </Panel.Body></Panel>
        <Panel><Panel.Body>
          <WordComparer
            data1={this.state.data1}
            data2={this.state.data2}
            code1={this.state.code1}
            code2={this.state.code2}
            color1={color1}
            color2={color2}
          />
        </Panel.Body></Panel>
      </div>
    );
  }
}

export default App;

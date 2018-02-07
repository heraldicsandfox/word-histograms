import React, { Component } from 'react';
import './App.css';
import { Jumbotron } from 'react-bootstrap';
import { en } from 'stopword';

import Preprocessing from './Preprocessing.js';
import WordComparer from './WordComparer.js';
import WordCounter from './WordCounter.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { data1: [], data2: [], stoplist: en, stemmer: "none" };
  }

  modifyStoplist(newList) {
    this.setState({ stoplist: newList });
  }

  modifyStemmer(newStemmer) {
    if (newStemmer !== this.state.stemmer) {
      this.setState({ stemmer: newStemmer });
    }
  }

  handleFirstData(dataSet) {
    this.setState({
      data1: dataSet
    });
  }

  handleSecondData(dataSet) {
    this.setState({
      data2: dataSet
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
            modifyStoplist={this.modifyStoplist.bind(this)}
            stemmer={this.state.stemmer}
            modifyStemmer={this.modifyStemmer.bind(this)}
          />
        </Jumbotron>
        <WordCounter 
          sectionName={"Text with Code A"}
          useCaps={false}
          stoplist={this.state.stoplist}
          stemmer={this.state.stemmer}
          handleData={this.handleFirstData.bind(this)}
          color={color1}
        />
        <WordCounter 
          sectionName={"Text with Code B"}
          useCaps={false}
          stoplist={this.state.stoplist}
          stemmer={this.state.stemmer}
          handleData={this.handleSecondData.bind(this)}
          color={color2}
        />
        <WordComparer
          data1={this.state.data1}
          data2={this.state.data2}
          color1={color1}
          color2={color2}
        />
      </div>
    );
  }
}

export default App;

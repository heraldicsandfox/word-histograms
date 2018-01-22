import React, { Component } from 'react';
import './App.css';
import { Jumbotron } from 'react-bootstrap';

import WordCounter from './WordCounter.js'

class App extends Component {
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
    return (
      <div className="App">
        <Jumbotron>
          <h1>Word Histograms for Grounded Codes</h1>
          <p className="lead">Input text into the boxes below to analyze and compare word frequencies between two collections of passages.</p>
        </Jumbotron>
        <WordCounter 
          sectionName={"Text with Code A"}
          useCaps={false}
          useStops={false}
          handleData={this.handleFirstData.bind(this)}
        />
        <WordCounter 
          sectionName={"Text with Code B"}
          useCaps={false}
          useStops={false}
          handleData={this.handleSecondData.bind(this)}
        />
      </div>
    );
  }
}

export default App;

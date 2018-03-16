import React, { Component } from 'react';
import './App.css';
import { Button, Jumbotron } from 'react-bootstrap';

import Preprocessing from './Preprocessing.js';
import WordComparer from './WordComparer.js';
import WordCounter from './WordCounter.js';


const STAGE_INTRO = 0;
const STAGE_FIRST_DATA = 1;
const STAGE_SECOND_DATA = 2;
const STAGE_PREPROCESS = 3;
const STAGE_COMPARE = 4;


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { data1: [], data2: [], stoplist: [], stemmer: "none", smoothing: 0, stage: 0 };
  }

  modifyStoplist(newList) {
    this.setState({ stoplist: newList });
  }

  modifyStemmer(newStemmer) {
    if (newStemmer !== this.state.stemmer) {
      this.setState({ stemmer: newStemmer });
    }
  }

  modifySmoothing(newSmoothing) {
    this.setState({ smoothing: newSmoothing })
  }

  handleFirstData(dataSet) {
    if (this.state.stage > STAGE_FIRST_DATA) {
      this.setState({
        data1: dataSet
      });
    } else {
      this.setState({
        data1: dataSet,
        stage: STAGE_SECOND_DATA
      });
    }
  }

  handleSecondData(dataSet) {
    if (this.state.stage > STAGE_SECOND_DATA) {
      this.setState({
        data2: dataSet
      });
    } else {
      this.setState({
        data2: dataSet,
        stage: STAGE_PREPROCESS
      });
    }
  }

  render() {
    var color1 = "#fdb462";
    var color2 = "#b3de69";
    return (
      <div className="App">
        <Jumbotron>
          <h2>Word Histograms for Grounded Codes</h2>
          <p className="lead">Input text into the boxes below to view and compare word frequencies between two collections of passages.</p>
        </Jumbotron>
        <WordCounter 
          sectionName={"Text A"}
          useCaps={false}
          stoplist={this.state.stoplist}
          stemmer={this.state.stemmer}
          handleData={this.handleFirstData.bind(this)}
          color={color1}
          active={this.state.stage >= STAGE_FIRST_DATA}
        />
        <br/>
        <WordCounter 
          sectionName={"Text B"}
          useCaps={false}
          stoplist={this.state.stoplist}
          stemmer={this.state.stemmer}
          handleData={this.handleSecondData.bind(this)}
          color={color2}
          active={this.state.stage >= STAGE_SECOND_DATA}
        />
        <br/>
        <Preprocessing
          stoplist={this.state.stoplist}
          modifyStoplist={this.modifyStoplist.bind(this)}
          stemmer={this.state.stemmer}
          modifyStemmer={this.modifyStemmer.bind(this)}
          modifySmoothing={this.modifySmoothing.bind(this)}
          active={this.state.stage >= STAGE_PREPROCESS}
        />
        <br/>
        <WordComparer
          data1={this.state.data1}
          data2={this.state.data2}
          color1={color1}
          color2={color2}
          active={this.state.stage >= STAGE_COMPARE}
        />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import porterStemmer from 'stemmer';
import Tokenizer from 'tokenize-text';
import './WordCounter.css';

import WordCounterChart from './WordCounterChart.js';

class WordCounter extends Component {
    constructor(props) {
        super(props);
		this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmitText = this.handleSubmitText.bind(this);
        this.tokenizer = new Tokenizer();
        this.updateText = this.updateText.bind(this);

		this.state = {
			textInput: '',
            hasChanged: false,
            nWordsField: "10",
            wordData: [],
            nWords: 10
		};
	}

    handleTextChange(e) {
        this.setState({
            textInput: e.target.value,
            hasChanged: true
        });
    }

    handleCountChange(e) {
        this.setState({ 
            nWordsField: e.target.value,
            hasChanged: true
        });
    }

    handleSubmitText(e) {
        this.updateText(this.props);
    }
    
    sRemovalStemmer(word) {
        if (word.endsWith("ies") && !(word.endsWith("aies")) && !(word.endsWith("eies"))) {
            return word.substring(0, word.length - 3).concat("y");
        } else if (word.endsWith("es") && !(word.endsWith("aes")) && !(word.endsWith("ees")) && !(word.endsWith("oes"))) {
            return word.substring(0, word.length - 1);
        } else if (word.endsWith("s") && !(word.endsWith("us")) && !(word.endsWith("ss"))) {
            return word.substring(0, word.length - 1);
        } else {
            return word;
        }
    }

    getStemmerFunc(stemmer) {
        if (stemmer === "porter") {
            return porterStemmer;
        } else if (stemmer === "sRemoval") {
            return this.sRemovalStemmer;
        } else {
            return (function(word) { return word; });
        }
    }

    updateText(props) {
        var stemmerFunc = this.getStemmerFunc(props.stemmer);
        var inputStr = this.state.textInput;
        if (!props.useCaps) {
            inputStr = inputStr.toLowerCase();
        }
        var vocabCounts = {};
        var tokenList = this.tokenizer.words()(inputStr);
        var stoplistSet = new Set(props.stoplist.map( function(value) {
            if (!props.useCaps) {
                return stemmerFunc(value.toLowerCase());
            } else {
                return stemmerFunc(value);
            }
        }));
        tokenList.forEach(function (rawToken) {
            var token = stemmerFunc(rawToken.value);
            if (!(stoplistSet.has(token))) {
                if (vocabCounts.hasOwnProperty(token)) {
                    vocabCounts[token]++;
                } else {
                    vocabCounts[token] = 1;
            }}
        });
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
        props.handleData(wordData);
        const nWords = Number(this.state.nWordsField);
        this.setState({ hasChanged: false, wordData: wordData, nWords: nWords });
    }

    validateCount() {
        const nWordsField = this.state.nWordsField;
        try {
            Number(nWordsField);
            return 'success';
        } catch (e) {
            return 'invalid';
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.stoplist !== newProps.stoplist || this.props.stemmer !== newProps.stemmer) {
            this.updateText(newProps);
        }
    }
    
    render() {
        var currentWordData = this.state.wordData.slice(0, this.state.nWords);

        return (
            <div className="row">
                    <div className="col-xs-12 col-sm-5">
                        <FormGroup
                            label="buttonColumn"
                            controlId="formBasicText"
                        >
                            <ControlLabel><h4>{this.props.sectionName}</h4></ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                rows={12}
                                value={this.state.textInput}
                                placeholder="Enter text to generate graphs of word counts."
                                onChange={this.handleTextChange}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-xs-12 col-sm-1 mx-auto">
                        <center>
                            <br/><br/><br/><br/><br/>
                                <FormGroup
                                    controlId="formCountInput"
                                    validationState={this.validateCount()}>
                                <b>Show
                                <FormControl
                                    style={{width: "60px"}}
                                    type="text"
                                    value={this.state.nWordsField}
                                    onChange={this.handleCountChange.bind(this)}
                                />
                                words</b> 
                                </FormGroup>
                            <br/>
                            <Button
                                type="button"
                                bsStyle="primary"
                                disabled={!this.state.hasChanged}
                                onClick={this.handleSubmitText}
                            >
                                Generate ➤
                            </Button>
                        </center>
                                                                      
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <WordCounterChart color={this.props.color} wordData={currentWordData} />
                    </div>
            </div>
        );
    }
}

export default WordCounter;

// <OrdinalFrame 
//     data={currentWordData}
//     axis={axes}

//     type={"bar"}
//     projection={"horizontal"}
//     oAccessor={"word"}
//     oLabel={true}
//     rAccessor={"count"}
//     hoverAnnotation={true}
//     annotations={currentWordData.forEach(function (datum) {
//         return datum.word;
//     })}
//     style={d => {return {fill: fills[d.idx % fills.length], stroke: 'black'}}}
//     oPadding={20}
//     size={[ 700, graphHeight]}
//     margin={{ left: 100, top: 15, bottom: 40, right: 15 }}
// />
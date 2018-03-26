import React, { Component } from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import porterStemmer from 'stemmer';
import Tokenizer from 'tokenize-text';
import './WordCounter.css';

import WordCounterChart from './WordCounterChart.js';

class WordCounter extends Component {
    constructor(props) {
        super(props);
        this.tokenizer = new Tokenizer();

        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleCountChange = this.handleCountChange.bind(this);
        this.renderDropdownMenu = this.renderDropdownMenu.bind(this);

		this.state = {
			textCode: '',
            hasChanged: false,
            nWordsField: "10",
            wordData: [],
            nWords: 10
		};
	}

    handleCountChange(e) {
        this.setState({ 
            nWordsField: e.target.value,
            hasChanged: true
        });
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

    handleCodeChange(e) {
        var textCode = e.target.value;
        this.updateText(this.props, textCode);
    }

    updateText(props, code) {
        console.log(props, code);
        var stemmerFunc = this.getStemmerFunc(props.stemmer);
        var inputStr;
        if (props.codeDict.has(code)) {
            inputStr = props.codeDict.get(code);
        } else {
            inputStr = "";
        }
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
        props.handleData(wordData, code);
        const nWords = Number(this.state.nWordsField);
        this.setState({ hasChanged: false, wordData: wordData, nWords: nWords, textCode: code });
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
            this.updateText(newProps, this.state.textCode);
        } else if (this.props.codeDict !== newProps.codeDict) {
            this.updateText(newProps, '');
            this.setState({ textCode: '' });
        }
    }

    renderDropdownMenu(codeDict) {
        var listOfCodes = []
        codeDict.forEach(function (value, key, map) {
            listOfCodes.push(key);
        })
        listOfCodes.sort();
        var selectOptions = listOfCodes.map(function(code) {
            return (<option value={code} key={code}>{code}</option>);
        });
        return (
            <FormControl componentClass="select" placeholder='' onChange={this.handleCodeChange}>
                { selectOptions }
            </FormControl>
        );
    }
    
    render() {
        var currentWordData = this.state.wordData.slice(0, this.state.nWords);

        return (
            <div className="col-xs-12 col-sm-6">
                <Form inline>
                    <FormGroup
                        controlId="formCountInput"
                        validationState={this.validateCount()}
                    >
                        <ControlLabel><h4>{this.props.sectionName}</h4></ControlLabel>
                        <br />
                        { this.renderDropdownMenu(this.props.codeDict) }
                        <br />
                        Word count:
                        <FormControl
                            style={{width: "60px"}}
                            type="text"
                            value={this.state.nWordsField}
                            onChange={this.handleCountChange}
                        />
                        <Button
                            type="button"
                            bsStyle="primary"
                            disabled={!this.state.hasChanged}
                            onClick={this.handleCodeChange}
                        >
                            Generate ➤
                        </Button> 
                    </FormGroup>
                </Form>
                <br />
                <WordCounterChart color={this.props.color} wordData={currentWordData} />
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
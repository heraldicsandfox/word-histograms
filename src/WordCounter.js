import React, { Component } from 'react';
import { FormControl, FormGroup, Panel} from 'react-bootstrap';
import porterStemmer from 'stemmer';
import Tokenizer from 'tokenize-text';

import WordCounterChart from './WordCounterChart.js';

class WordCounter extends Component {
    constructor(props) {
        super(props);
        this.updateText = this.updateText.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
        this.tokenizer = new Tokenizer();

		this.state = {
			textInput: '',
            wordData: [
                {count: 1, idx: 0, word: 'enter'},
                {count: 1, idx: 1, word: 'text'},
                {count: 1, idx: 2, word: 'to'},
                {count: 1, idx: 3, word: 'generate'},
                {count: 1, idx: 4, word: 'word'},
                {count: 1, idx: 5, word: 'count'},
                {count: 1, idx: 6, word: 'graph'}
            ],
		};
	}

    handleTextChange(e) {
        var newText = e.target.value.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')
        this.setState({
            textInput: newText
        });
        this.updateText(this.props, newText);
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

    updateText(props, textInput) {
        var stemmerFunc = this.getStemmerFunc(props.stemmer);
        var inputStr = textInput;
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
        this.setState({ wordData: wordData });
    }

    componentWillReceiveProps(newProps) {
        if (this.props.stoplist !== newProps.stoplist || this.props.stemmer !== newProps.stemmer) {
            this.updateText(newProps, this.state.textInput);
        }
    }
    
    render() {
        var currentWordData = this.state.wordData;
        return (
            <div className="row">
            <Panel>
                <Panel.Heading><Panel.Title><h3>{this.props.sectionName}</h3></Panel.Title></Panel.Heading>
                <Panel.Body>
                    <div className="col-xs-12 col-sm-6">
                        <FormGroup
                            label="buttonColumn"
                            controlId="formBasicText"
                        >
                            <FormControl
                                componentClass="textarea"
                                rows={16}
                                value={this.state.textInput}
                                placeholder="Enter text to generate graphs of word counts."
                                onChange={this.handleTextChange}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <WordCounterChart color={this.props.color} wordData={currentWordData} />
                    </div>
            </Panel.Body></Panel>
            </div>
        );
    }
}

export default WordCounter;
import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup, Panel } from 'react-bootstrap';
// import { OrdinalFrame } from 'semiotic';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import Tokenizer from 'tokenize-text';
import { en } from 'stopword';
import './WordCounter.css';

class WordCounter extends Component {
    constructor(props) {
        super(props);
		this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmitText = this.handleSubmitText.bind(this);
        this.tokenizer = new Tokenizer();

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
        var inputStr = this.state.textInput;
        if (!this.props.useCaps) {
            inputStr = inputStr.toLowerCase();
        }
        var vocabCounts = {};
        const stoplist = new Set(en);
        var tokenList = this.tokenizer.words()(inputStr);
        tokenList.forEach(function (token) {
            if (!stoplist.has(token.value)) {
                if (vocabCounts.hasOwnProperty(token.value)) {
                    vocabCounts[token.value]++;
                } else {
                    vocabCounts[token.value] = 1;
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
        this.props.handleData(wordData);
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

    render() {
        var currentWordData = this.state.wordData.slice(0, this.state.nWords);
        var graphHeight = Math.max(20 * this.state.nWords, 360);

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
                                value={this.state.text_input}
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
                                    style={{width: "45px"}}
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
                        <Panel>
                            <BarChart
                                width={600}
                                height={graphHeight}
                                data={currentWordData}
                                margin={{top: 5, right: 30, left: 50, bottom: 5}}
                                layout={"vertical"}
                            >
                                <XAxis
                                    type="number"
                                    orientation="top"
                                    allowDecimals={false}
                                />
                                <YAxis
                                    dataKey="word"
                                    interval={0}
                                    type="category"
                                />
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Bar dataKey="count" fill={this.props.color} />
                            </BarChart>
                        </Panel>
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
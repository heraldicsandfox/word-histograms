import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { OrdinalFrame } from 'semiotic';
import Tokenizer from 'tokenize-text';
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
            wordData: [{word: '', count: 0, idx: 0}]
		};
	}

    handleTextChange(e) {
        this.setState(
            {
                textInput: e.target.value,
                hasChanged: true
            }
        );
    }

    handleSubmitText(e) {
        // this.props.handleTextCallback(this.state.textInput);
        var inputStr = this.state.textInput;
        if (!this.props.useCaps) {
            inputStr = inputStr.toLowerCase();
        }
        var vocabCounts = {};
        var tokenList = this.tokenizer.words()(inputStr);
        tokenList.forEach(function (token) {
            if (vocabCounts.hasOwnProperty(token.value)) {
                vocabCounts[token.value]++;
            } else {
                vocabCounts[token.value] = 1;
            }
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
        this.setState({ hasChanged: false, wordData: wordData });
    }

    render() {
        const axes = [
            { key: 'yAxis', orient: 'bottom', className: 'yscale', name: 'CountAxis', tickFormat: (d) => d },
            { key: 'xAxis', orient: 'left', className: 'xscale', name: 'WordAxis', tickFormat: d => d  }
        ];
        const fills = ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f']

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
                        <FormGroup
                            controlId="formBasicButton"
                            id="formButton"
                        >
                        <center>
                            <Button
                                type="button"
                                bsStyle="primary"
                                disabled={!this.state.hasChanged}
                                onClick={this.handleSubmitText}
                            >
                                Generate ➤
                            </Button>
                            
                        </center>
                        </FormGroup>                                                        
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <OrdinalFrame 
                            data={this.state.wordData.slice(0, 10)}
                            axis={axes}

                            type={"bar"}
                            projection={"horizontal"}
                            oAccessor={"word"}
                            oLabel={true}
                            rAccessor={"count"}
                            hoverAnnotation={true}
                            
                            style={d => {return {fill: fills[d.idx % fills.length], stroke: 'black'}}}
                            oPadding={20}
                            size={[ 700,400 ]}
                            margin={{ left: 100, top: 15, bottom: 40, right: 15 }}
                        />
                    </div>
            </div>
        );
    }
}

export default WordCounter;
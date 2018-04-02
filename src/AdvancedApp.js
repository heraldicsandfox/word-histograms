import React, { Component } from "react";
import "./App.css";
import { FormControl, Jumbotron, Panel } from "react-bootstrap";
import Tokenizer from "tokenize-text";

import AdaptiveStopwords from './AdaptiveStopwords.js';
import TextProcessor from "./TextProcessor.js";
import { computeWordData } from './Utils';
import WordCounterChart from "./WordCounterChart";
import WordComparer from "./WordComparer";

class AdvancedApp extends Component {
    constructor(props) {
        super(props);
        this.tokenizer = new Tokenizer();

        this.addStopword = this.addStopword.bind(this);
        this.removeStopword = this.removeStopword.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleFirstData = this.handleFirstData.bind(this);
        this.handleSecondData = this.handleSecondData.bind(this);
        
        this.state = {
            code1: '',
            code2: '',
            data1: [],
            data2: [],
            codeDict: new Map(),
            stoplist: new Set(),
            totalData: []
        };
    }

    addStopword(word) {
        var stoplist = this.state.stoplist;
        stoplist.add(word);
        var totalData = computeWordData(this.state.codeDict.get(""), stoplist, this.tokenizer);
        var data1 = computeWordData(
            this.state.codeDict.get(this.state.code1),
            stoplist,
            this.tokenizer
        );
        var data2 = computeWordData(
            this.state.codeDict.get(this.state.code2),
            stoplist,
            this.tokenizer
        );
        this.setState({ stoplist: stoplist, totalData: totalData, data1: data1, data2: data2 });

    }

    removeStopword(word) {
        var stoplist = this.state.stoplist;
        stoplist.delete(word);
        var totalData = computeWordData(this.state.codeDict.get(""), stoplist, this.tokenizer);
        this.setState({ stoplist: stoplist, totalData: totalData });
        var data1 = computeWordData(
            this.state.codeDict.get(this.state.code1),
            stoplist,
            this.tokenizer
        );
        var data2 = computeWordData(
            this.state.codeDict.get(this.state.code2),
            stoplist,
            this.tokenizer
        );
        this.setState({ stoplist: stoplist, totalData: totalData, data1: data1, data2: data2 });
    }

    handleText(codeDict) {
        var allText = codeDict.get("");
        if (typeof(allText) !== undefined) {
            var totalData = computeWordData(allText, this.state.stoplist, this.tokenizer);
            this.setState({
                codeDict: codeDict,
                totalData: totalData
            });
        }
    }

    handleFirstData(e) {
        var code = e.target.value;
        var dataSet = computeWordData(
            this.state.codeDict.get(code),
            this.state.stoplist,
            this.tokenizer
        );
        this.setState({
            data1: dataSet,
            code1: code
        });
    }

    handleSecondData(e) {
        var code = e.target.value;
        var dataSet = computeWordData(
            this.state.codeDict.get(code),
            this.state.stoplist,
            this.tokenizer
        );
        this.setState({
            data2: dataSet,
            code2: code
        });
    }

    renderDropdownMenu(codeDict, handleCodeChange, name) {
        var listOfCodes = []
        codeDict.forEach(function (value, key, map) {
            listOfCodes.push(key);
        })
        listOfCodes.sort();
        var selectOptions = listOfCodes.map(function(code) {
            return (<option value={code} key={name + '_' + code}>{code}</option>);
        });
        return (
            <FormControl componentClass="select" placeholder="Select label..." onChange={handleCodeChange}>
                <option value="" key={""}>Select label...</option>
                { selectOptions }
            </FormControl>
        );
    }

    render() {
        var color1 = "#fdb462";
        var color2 = "#b3de69";
        return (
        <div className="App">
            <Jumbotron>
            <h1>Word Histograms for Grounded Codes</h1>
            <p className="lead">
                Input text into the boxes below to view and compare word frequencies
                between two collections of passages.
            </p>
            </Jumbotron>
            <Panel>
                <Panel.Body>
                    <div className="col-xs-12 col-sm-6">
                        <TextProcessor handleText={this.handleText} />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <AdaptiveStopwords
                            addStopword={this.addStopword}
                            removeStopword={this.removeStopword}
                            wordData={this.state.totalData}
                            stoplist={this.state.stoplist}
                        />
                    </div>
                </Panel.Body>
            </Panel>
            <Panel>
                <Panel.Body>
                    <div className="col-xs-12 col-sm-6">
                        <h2>Word Counts for Label 1</h2>
                        { this.renderDropdownMenu(this.state.codeDict, this.handleFirstData, 'menu1') }
                        <WordCounterChart
                            color={color1}
                            wordData={this.state.data1}
                        />
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <h2>Word Counts for Label 2</h2>
                        { this.renderDropdownMenu(this.state.codeDict, this.handleSecondData, 'menu2') }
                        <WordCounterChart
                            color={color2}
                            wordData={this.state.data2}
                        />
                    </div>
                </Panel.Body>               
            </Panel>
            <Panel>
                <Panel.Body>
                    <WordComparer
                        data1={this.state.data1}
                        data2={this.state.data2}
                        code1={this.state.code1}
                        code2={this.state.code2}
                        color1={color1}
                        color2={color2}
                    />
                </Panel.Body>
            </Panel>
        </div>
        );
    }
}

export default AdvancedApp;

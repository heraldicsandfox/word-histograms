import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import './WordComparer.css';

import WordComparerChart from './WordComparerChart.js';
import WordComparerTable from './WordComparerTable.js';

class WordComparer extends Component {
    constructor(props) {
        super(props);
        this.state = this.processData.bind(this)(props);
	}

    processData(props) {
        var data1OnlyWords = [];
        var data2OnlyWords = [];
        var dataIntersection = {};

        const setData1 = new Set(props.data1.map(datum => datum.word)); 
        const setData2 = new Set(props.data2.map(datum => datum.word));
        var datum, data_idx;

        for (data_idx in props.data1) {
            datum = props.data1[data_idx];
            if (setData2.has(datum['word'])) {
                dataIntersection[datum['word']] = {
                    'word': datum['word'],
                    'data1Count': datum['count'] 
                };
            } else {
                data1OnlyWords.push({
                    'word': datum['word'],
                    'count': datum['count']
                });
            }
        }

        for (data_idx in props.data2) {
            datum = props.data2[data_idx];
            if (setData1.has(datum['word'])) {
                dataIntersection[datum['word']]['data2Count'] = datum['count'];
            } else {
                data2OnlyWords.push({
                    'word': datum['word'],
                    'count': datum['count']
                });
            }
        }

        return {
            data1OnlyWords: data1OnlyWords,
            data2OnlyWords: data2OnlyWords,
            dataIntersection: dataIntersection
        };

    }

    componentWillReceiveProps(newProps) {
        var state = this.processData.bind(this)(newProps);
        this.setState(state);
    }

    render() {
        return (
            <div className="row">
            <Panel>
                <Panel.Heading><Panel.Title><h3>Comparison</h3></Panel.Title></Panel.Heading>
                <Panel.Body>
                    <div className="col-xs-12 col-sm-4">
                        <h4>Words unique to A</h4>
                        <Panel className="comparer-table">
                            <WordComparerTable wordList={this.state.data1OnlyWords} color={this.props.color1} />
                        </Panel>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <h4>Words in A and B</h4>
                        <WordComparerChart
                            wordData={this.state.dataIntersection}
                            color1={this.props.color1}
                            color2={this.props.color2}
                        />                                     
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <h4>Words unique to B</h4>
                        <Panel className="comparer-table">
                            <WordComparerTable wordList={this.state.data2OnlyWords} color={this.props.color2} />
                        </Panel>                    
                    </div>
                </Panel.Body>
            </Panel>
            </div>
        );
    }
}

export default WordComparer;
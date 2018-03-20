import React, { Component } from 'react';
import './WordCounter.css';

import WordComparerChart from './WordComparerChart.js';

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
                    'word': datum['word'] 
                };
                dataIntersection[datum['word']][props.code1] = datum['count'];
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
                dataIntersection[datum['word']][props.code2] = datum['count'];
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
                    <div className="col-xs-12">
                        <h4>Words in Codes A and B</h4>
                        <WordComparerChart
                            wordData={this.state.dataIntersection}
                            color1={this.props.color1}
                            color2={this.props.color2}
                            code1={this.props.code1}
                            code2={this.props.code2}
                        />                                     
                    </div>
            </div>
        );
    }
}

export default WordComparer;
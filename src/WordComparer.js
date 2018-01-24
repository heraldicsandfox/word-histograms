import React, { Component } from 'react';
import { Panel, Table } from 'react-bootstrap';
import { Bar, BarChart, Brush, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import './WordCounter.css';

class WordComparer extends Component {
    constructor(props) {
        super(props);
        var state = this.processData.bind(this)(props);
        state['sort'] = "ratio";
        state['intersectingWordList'] = this.getSortedIntersectingWordData(state.dataIntersection, state.sort);
        this.state = state;
	}

    processData(props) {
        var data1OnlyWords = [];
        var data2OnlyWords = [];
        var dataIntersection = {};

        const setData1 = new Set(props.data1.map(datum => datum.word)); 
        const setData2 = new Set(props.data2.map(datum => datum.word));
        var datum, data_idx, i;

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

        // Clean up data1
        data1OnlyWords.sort(function(d1, d2) {
            return d2.count - d1.count;
        });
        for (i = 0; i < data1OnlyWords.length; ++i) {
            data1OnlyWords[i]['idx'] = i;
        }

        // Clean up data2
        data2OnlyWords.sort(function(d1, d2) {
            return d2.count - d1.count;
        });
        for (i = 0; i < data2OnlyWords.length; ++i) {
            data2OnlyWords[i]['idx'] = i;
        }

        return {
            data1OnlyWords: data1OnlyWords,
            data2OnlyWords: data2OnlyWords,
            dataIntersection: dataIntersection
        };

    }

    componentWillReceiveProps(newProps) {
        var state = this.processData.bind(this)(newProps);
        state.intersectingWordList = this.getSortedIntersectingWordData(
                state.dataIntersection,
                state.sortType);
        this.setState(state);
    }

    getSortedIntersectingWordData(dataIntersection, sortType) {
        var intersectingWordData = []
        for (var ty in dataIntersection) {
            intersectingWordData.push(dataIntersection[ty]);
        }
        console.log(intersectingWordData);
        if (sortType === "alphabetical") {
            intersectingWordData.sort(function(d1, d2) {
                if (d1.word < d2.word) {
                    return -1;
                } else if (d1.word > d2.word) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else {
            intersectingWordData.sort(function(d1, d2) {
                return (d2.data1Count / d2.data2Count) - (d1.data1Count / d1.data2Count);
            });
        }
        return intersectingWordData;
    }

    renderWordTable(wordList, color) {
        return (
            <Table striped bordered condensed hover responsive>
                <thead>
                    <tr bgcolor={color}>
                        <th>#</th>
                        <th>Word</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {wordList.map(function (datum) {
                        return (
                            <tr key={datum.word + "-item"}>
                                <td>{datum.idx + 1}</td>
                                <td>{datum.word}</td>
                                <td>{datum.count}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }

    renderIntersectingPlot() {
        if (this.state.intersectingWordList.length > 0) {
            return (<BarChart
                width={400}
                height={500}
                data={this.state.intersectingWordList}
                margin={{top: 5, right: 30, left: 10, bottom: 10}}
            >
                <XAxis
                    dataKey="word"
                    interval={0}
                    angle={-45}
                    type="category"
                    height={60}
                    textAnchor="end"
                />
                <YAxis
                    type="number"
                    allowDecimals={false}
                />
                <Brush dataKey='word' height={30} stroke="#cccccc" endIndex={6}/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Bar dataKey="data1Count" fill={this.props.color1} />
                <Bar dataKey="data2Count" fill={this.props.color2} />
            </BarChart>);
        } else {
            return (<div />);
        }
    }

    render() {
        return (
            <div className="row">
                    <div className="col-xs-12 col-sm-4">
                        <h4>Words unique to Code A</h4>
                        <Panel>
                            {this.renderWordTable(this.state.data1OnlyWords, this.props.color1)}
                        </Panel>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <h4>Words in Codes A and B</h4>
                        {this.renderIntersectingPlot.bind(this)()}                                     
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <h4>Words unique to Code B</h4>
                        <Panel>
                            {this.renderWordTable(this.state.data2OnlyWords, this.props.color2)}
                        </Panel>                    
                    </div>
            </div>
        );
    }
}

export default WordComparer;
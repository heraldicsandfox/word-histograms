import React, { Component } from 'react';
import { FormGroup, Radio } from 'react-bootstrap';
import { Bar, BarChart, Brush, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import './WordCounterChart.css';

class WordComparerChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sort: "ratio",
        }
    }

    getSortedWordData(dataIntersection, sortType) {
        var wordData = []
        for (var ty in dataIntersection) {
            wordData.push(dataIntersection[ty]);
        }
        if (sortType === "alphabetical") {
            wordData.sort(function(d1, d2) {
                if (d1.word < d2.word) {
                    return -1;
                } else if (d1.word > d2.word) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else { // if "ratio"
            wordData.sort(function(d1, d2) {
                return (d2.data1Count * d1.data2Count) - (d1.data1Count * d2.data2Count);
            });
        }
        return wordData;
    }

    handleSortChange(e) {
        var selected = e.target.value;
        this.setState({
            sort: selected
        }); 
    }

    maybeBrush(nWords, end) {
        if (nWords > 10) {
            return (
                <Brush dataKey='word' height={30} stroke="#cccccc" endIndex={end} />
            );
        } else {
            return (<div />);
        }
    }

    render() {
        var nWords = Object.keys(this.props.wordData).length;
        if (nWords > 0) {
            var end = Math.min(10, nWords);
            var sortedWordList = this.getSortedWordData(this.props.wordData, this.state.sort);
            return (<div>
                <center>
                <FormGroup>
                    {"Sort by "}
                    <Radio
                        value={"ratio"}
                        checked={this.state.sort === "ratio"}
                        name="sortRadio"
                        onChange={this.handleSortChange.bind(this)}
                        inline>
                        {" Frequency Ratio"}
                    </Radio>{'  '}
                    <Radio
                        value={"alphabetical"}
                        checked={this.state.sort === "alphabetical"}
                        name="sortRadio"
                        onChange={this.handleSortChange.bind(this)}
                        inline>
                        {" Alphabetical"}
                    </Radio>
                </FormGroup>

                <BarChart
                    width={700}
                    height={500}
                    data={sortedWordList}
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
                    { this.maybeBrush(nWords, end) }
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Bar dataKey={this.props.code1} fill={this.props.color1} />
                    <Bar dataKey={this.props.code2} fill={this.props.color2} />
                </BarChart></center></div>);
        } else {
            return (<div className="filler">Plot will render here.</div>);
        }
    }

}
export default WordComparerChart;
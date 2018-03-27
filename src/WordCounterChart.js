import React, { Component } from 'react';
import { Bar, BarChart, Brush, CartesianGrid,  ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './WordCounterChart.css';

class WordCounterChart extends Component {

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
            return (
                <ResponsiveContainer height={350} width='100%'>
                    <BarChart
                        data={this.props.wordData}
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
                        <Bar dataKey="count" fill={this.props.color} />
                    </BarChart>
                </ResponsiveContainer>
            );
        } else {
            return (<div className="filler">Plot will render here.</div>);
        }
    }
                            

}
export default WordCounterChart;
import React, { Component } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import './WordCounterChart.css';

class WordCounterChart extends Component {

    render() {
        var graphHeight = Math.max(20 * this.props.wordData.length, 350);
        if (this.props.wordData.length > 0) {
            return (
                <BarChart
                    width={600}
                    height={graphHeight}
                    data={this.props.wordData}
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
            );
        } else {
            return (<div className="filler">Plot will render here.</div>);
        }
    }
                            

}
export default WordCounterChart;
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import './WordCounterChart.css';

class WordCounterChart extends Component {

    render() {
        var graphHeight = Math.max(31 * this.props.wordData.length + 40, 350);
        if (this.props.wordData.length > 0) {
            return (
                <Panel className="counter-chart">
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
                </Panel>
            );
        } else {
            return (<div className="filler">Plot will render here.</div>);
        }
    }
                            

}
export default WordCounterChart;
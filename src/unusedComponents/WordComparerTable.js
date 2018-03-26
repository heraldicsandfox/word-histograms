import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import './WordCounterChart.css';

class WordComparerTable extends Component {

    wordSort (d1, d2) {
        return d2.count - d1.count;
    };

    render() {
        var sortedWordList = this.props.wordList;
        sortedWordList.sort(this.wordSort);
        for (var i = 0; i < sortedWordList.length; ++i) {
            sortedWordList[i]['idx'] = i;
        }
        return (
            <Table striped bordered condensed hover responsive>
                <thead>
                    <tr bgcolor={this.props.color}>
                        <th>#</th>
                        <th>Word</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedWordList.map(function (datum) {
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

}
export default WordComparerTable;
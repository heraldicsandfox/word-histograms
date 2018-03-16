import React, { Component } from 'react';
import { Button, Checkbox, FormControl, Panel } from 'react-bootstrap';
import { en } from 'stopword';
import './Preprocessing.css';

class Stopwords extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
        this.state = {
            showPanel: false,
            currentTextField: '',
            currentStopwords: new Set(props.stoplist),
            useStopwords: false
        };
    }

    handleClick() {
        this.setState({ showPanel: !this.state.showPanel });
    }
        
    handleTextChange(e) {
        var newStopwords = e.target.value.split('\n');
        this.setState({
            currentStopwords: newStopwords,
            currentTextField: e.target.value
        });
        this.props.modifyStoplist(newStopwords);
    }

    handleCheckboxClick(e) {
        var newUseStopwords = !this.state.useStopwords;
        var state = { useStopwords: newUseStopwords };
        if (newUseStopwords) {
            if (this.state.currentTextField === '') {
                state.currentTextField = en.join('\n');
            } else {
                state.currentTextField = this.state.currentTextField;
            }
            state.currentStopwords = state.currentTextField.split('\n');
        } else {
            state.currentStopwords = [];
        }
        this.props.modifyStoplist(state.currentStopwords);
        this.setState(state);
    }

    render() {
        var body;
        if (!this.state.useStopwords) {
            body = (<br />);
        } else {
            body = (
                <div>
                    Please enter text for the modal with one stopword per line, all lowercase.
                    <FormControl
                        componentClass="textarea"
                        rows={12}
                        value={this.state.currentTextField}
                        onChange={this.handleTextChange}
                    />
                </div>
            );
        }
        return (
            <div>
                <Button onClick={this.handleClick} bsStyle="primary" disabled={!this.props.active}>Choose words to hide</Button><br/>
                {this.state.showPanel ? '↥' : '↧'}
                <br/>
                <Panel id="stoplist" expanded={this.state.showPanel} onToggle={this.handleClick}>
                    <Panel.Collapse><Panel.Body>
                        <Checkbox checked={this.useStopwords} onChange={this.handleCheckboxClick}>Hide common words</Checkbox>
                        {body}
                    </Panel.Body></Panel.Collapse>
                </Panel>
                <br/>
            </div>
        )
    }

}

export default Stopwords;
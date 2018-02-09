import React, { Component } from 'react';
import { Button, FormControl, Panel } from 'react-bootstrap';
import './Preprocessing.css';

class Stopwords extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.state = {
            showPanel: false,
            currentTextField: props.stoplist.join('\n'),
            currentStopwords: new Set(props.stoplist)
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

    render() {
        return (
            <div>
                <Button onClick={this.handleClick} bsStyle="primary">Choose words to hide</Button><br/>
                <Panel id="stoplist" expanded={this.state.showPanel} onToggle={this.handleClick}>
                    <Panel.Collapse><Panel.Body>
                        Please enter text for the modal with one stopword per line, all lowercase.
                        <FormControl
                            componentClass="textarea"
                            rows={12}
                            value={this.state.currentTextField}
                            onChange={this.handleTextChange}
                        />
                    </Panel.Body></Panel.Collapse>
                </Panel>
                <br/>
            </div>
        )
    }

}

export default Stopwords;
import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';


class TextBox extends Component {

    handleTextChange(e) {
        var rawText = e.target.value;
        this.props.processText(rawText);
    }

    render() {
        this.handleTextChange = this.handleTextChange.bind(this);

        return (
            <FormControl
                componentClass="textarea"
                rows={12}
                value={this.props.rawText}
                onChange={this.handleTextChange}
            />
        );
    }

}

export default TextBox;
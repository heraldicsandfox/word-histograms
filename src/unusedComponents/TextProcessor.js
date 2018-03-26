import React, { Component } from 'react';
import { ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import './WordCounter.css';

class TextProcessor extends Component {

    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
        this.processText = this.processText.bind(this);
        this.state = {
            textInput: '',
            hasChanged: false,
            codeDict: new Map()
        };
    }

    processText(textInput) {
        var segments = textInput.split('\n\n\n')
        var newCodeDict = new Map();
        var allText = ""
        for (var seg in segments) {
            var fields = segments[seg].split('\n');
            if (fields.length < 3) {
                continue;
            }
            var codes = fields[1].toLowerCase().split('; ');
            var newText = fields.slice(2).join('\n');
            for (var cidx in codes) {
                var code = codes[cidx];
                code = code.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
                if (code.length === 0) {
                    continue;
                }

                if (newCodeDict.has(code)) {
                    var oldText = newCodeDict.get(code);
                    newCodeDict.set(code, oldText + '\n' + newText);
                } else {
                    newCodeDict.set(code, newText);
                }
            }
            allText = allText + '\n' + newText;
        }
        newCodeDict.set("", allText);
        console.log(newCodeDict);
        this.props.handleText(newCodeDict);
        this.setState({ codeDict: newCodeDict, textInput: textInput });
    }

    handleTextChange(e) {
        var textInput = e.target.value.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')
        this.processText(textInput);
    }

    render() {
        return (
            <div>
                <FormGroup
                    label="tableInput"
                    controlId="formTableInput"
                >
                    <ControlLabel><h4>Text Input</h4></ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        rows={12}
                        value={this.state.textInput}
                        placeholder="Enter text to generate graphs of word counts."
                        onChange={this.handleTextChange}
                    />
                </FormGroup>
            </div>
        )
    }
}

export default TextProcessor;
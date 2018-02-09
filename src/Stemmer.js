import React, { Component } from 'react';
import { Button, FormGroup, Panel, Radio } from 'react-bootstrap';

class Stemmer extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            showPanel: false,
            stemmer: props.stemmer
        };
    }

    handleClick() {
        this.setState({ showPanel: !this.state.showPanel });
    }
        
    handleChange(e) {
        this.setState({ stemmer: e.target.value });
        this.props.modifyStemmer(e.target.value);
    }

    stemmerRadio(value, text) {
        return (
            <Radio
                value={value}
                checked={this.state.stemmer === value}
                name="stemmerRadio"
                onChange={this.handleChange}>
                {text}
            </Radio>
        );
    }    

    render() {
        var makeRadio = this.stemmerRadio.bind(this);
        return (
            <div>
                <Button onClick={this.handleClick} bsStyle="primary">Remove word endings</Button><br/>
                <Panel id="stoplist" expanded={this.state.showPanel} onToggle={this.handleClick} hidden={!this.state.showPanel}>
                    <Panel.Collapse><Panel.Body>
                        Please select which stemmer you would like to use.
                        <FormGroup>
                            {makeRadio("none", "No stemmer")}
                            {makeRadio("porter", "Porter stemmer (Porter 1980)")}
                            {makeRadio("sRemoval", "S-removal stemmer (Harman 1991)")}
                        </FormGroup>
                    </Panel.Body></Panel.Collapse>
                </Panel>
            </div>
        )
    }

}

export default Stemmer;
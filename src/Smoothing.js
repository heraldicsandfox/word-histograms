import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import './Preprocessing.css';
import 'rc-slider/assets/index.css';

class Smoothing extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            showPanel: false,
            sliderValue: 0
        };
    }

    handleClick() {
        this.setState({ showPanel: !this.state.showPanel });
    }

    onChange(value) {
        this.setState({ sliderValue: value });
        this.modifySmoothing(value);
    }

    tooltipFormatter(value) {
        return `${value / 20}`;
    }

    render() {
        const SliderWithTooltip = createSliderWithTooltip(Slider);
        return (
            <div>
                <Button onClick={this.handleClick} bsStyle="primary" disabled>Smooth word counts</Button><br/>
                <Panel id="stoplist" expanded={this.state.showPanel} onToggle={this.handleClick}>
                    <Panel.Collapse><Panel.Body>
                        Please choose the amount to add to each word count in the word count comparison.
                        <SliderWithTooltip dots step={10} value={this.state.sliderValue} onChange={this.onChange} tipFormatter={this.tooltipFormatter}/>
                    </Panel.Body></Panel.Collapse>
                </Panel>
                <br/>
            </div>
        )
    }
}

export default Smoothing;
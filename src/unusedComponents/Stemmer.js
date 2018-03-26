import React, { Component } from 'react';
import { Button, FormGroup, Modal, Radio } from 'react-bootstrap';

class Stemmer extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            showModal: false,
            stemmer: props.stemmer
        };
    }

    handleShow() {
        this.setState({ showModal: true });
    }

    handleClose() {
        this.setState({ showModal: false });
        this.props.modifyStemmer(this.state.stemmer);
    }
        
    handleChange(e) {
        this.setState({ stemmer: e.target.value });
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
                <Button onClick={this.handleShow}>Stemmer</Button>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Stemmer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Please select which stemmer you would like to use.
                        <FormGroup>
                            {makeRadio("none", "No stemmer")}
                            {makeRadio("porter", "Porter stemmer (Porter 1980)")}
                            {makeRadio("sRemoval", "S-removal stemmer (Harman 1991)")}
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default Stemmer;
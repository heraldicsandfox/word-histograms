import React, { Component } from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import './Preprocessing.css';

class Preprocessing extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.state = {
            showModal: false,
            currentTextField: props.stoplist.join('\n'),
            currentStopwords: new Set(props.stoplist)
        };
    }

    handleShow() {
        this.setState({ showModal: true });
    }

    handleClose() { 
        var newStopwords = this.state.currentTextField.split('\n');
        this.setState({ 
            showModal: false,
            currentStopwords: newStopwords 
        });
        this.props.modifyStoplist(newStopwords);
    }
        
    handleTextChange(e) {
        this.setState({ currentTextField: e.target.value });
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleShow}>Stoplist</Button>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Stoplist</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Please enter text for the modal with one stopword per line, all lowercase.
                        <FormControl
                            componentClass="textarea"
                            rows={12}
                            value={this.state.currentTextField}
                            onChange={this.handleTextChange}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default Preprocessing;
import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';

class CreateUser extends Component{

    constructor(props){
        super(props)
        this.state = {
            show : false
        }
    }

    render(){
        
        const handleClose = () => this.setState({show:false});
        const handleShow = () => this.setState({show:true});

        return(
            <div>
                <Button type="primary" onClick={handleShow}>Create user</Button>
                <Modal show={this.state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default CreateUser;
import React, {Component} from "react";
import ApplicationFrame from '../../components/application-frame/index';
import {Modal, Button} from 'react-bootstrap';
import Cookies from 'universal-cookie';




class CreateIneligiblePeriod extends Component{

    constructor(props){
        super(props)
        this.state = {
            show : false,
            inStartDate : "",
            inEndDate : ""
        }
    }

    handleStartDateChange(event){
        this.setState({inStartDate:event.target.value})
    }

    handleEndDateChange(event){
        this.setState({inEndDate:event.target.value})
    }

    handleSubmit(event){
        console.log(this.state.inStartDate);
        console.log(this.state.inEndDate);
        this.setState({show:false})
    }


    render(){

        const handleClose = () => this.setState({show:false});
        const handleShow = () => this.setState({show:true});

        const cookie = new Cookies();
        const role = cookie.get('info').role;


        if (role === 'admin') {
            return(
            <div>
                <Button type="primary" onClick={handleShow}>Create ineligible period</Button>
                <Modal show={this.state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create ineligible period</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <label htmlFor="inStartDate">Start date</label><br/><input name="inStartDate" type="date" value={this.state.inStartDate} onChange={e => this.handleStartDateChange(e)}></input> <br/> <br/>
                    <label htmlFor="inEndDate">End date</label><br/><input name="inEndDate" type="date" value={this.state.inEndDate} onChange={e => this.handleEndDateChange(e)}></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={e => this.handleSubmit(e)}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    } else {
        return(<div></div>)
    }
        
        
    }
}

export default CreateIneligiblePeriod;
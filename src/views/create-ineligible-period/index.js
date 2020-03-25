import React from "react";
import { Modal, Button } from 'react-bootstrap';
import { MDBBtn } from "mdbreact";
import { createIneligiblePeriod } from '../../utils/APIUtils';


function CreateIneligiblePeriod() {

    const [show, setShow] = React.useState(false);
    const [inStartDate, setInStartDate] = React.useState("");
    const [inEndDate, setInEndDate] = React.useState("");

    function handleStartDateChange(event) {
        setInStartDate(event.target.value)
    }

    function handleEndDateChange(event) {
        setInEndDate(event.target.value)
    }

    function handleSubmit(event) {
        createIneligiblePeriod(inStartDate, inEndDate)
            .then(response => {
                console.log(response)
                alert("Ineligible period successfully created")
                setShow(false)
            })
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <MDBBtn className="btn" onClick={handleShow}>Create ineligible period</MDBBtn>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create ineligible period</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="inStartDate">Start date</label>
                    <br />
                    <input
                        name="inStartDate"
                        type="date"
                        value={inStartDate}
                        onChange={e => handleStartDateChange(e)}>
                    </input>
                    <br /> <br />
                    <label htmlFor="inEndDate">End date</label>
                    <br />
                    <input name="inEndDate"
                        type="date"
                        value={inEndDate}
                        onChange={e => handleEndDateChange(e)}>
                    </input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                    <Button variant="primary" onClick={e => handleSubmit(e)}>
                        Create
                        </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateIneligiblePeriod;